import { beforeEach, describe, expect, it, vi } from "vitest";

const { createGatewayAuditRecord, findGatewayAuditRecord, updateGatewayAuditRecord } = vi.hoisted(() => ({
  createGatewayAuditRecord: vi.fn(),
  findGatewayAuditRecord: vi.fn(),
  updateGatewayAuditRecord: vi.fn(),
}));

vi.mock("./db", () => ({ createGatewayAuditRecord, findGatewayAuditRecord, updateGatewayAuditRecord }));

import {
  chooseGatewayRoute,
  extractBearerToken,
  ingestGatewayEvent,
  isApprovedInternalSender,
  isReviewableVapiEvent,
  normalizeHostingerEvent,
  normalizeVapiEvent,
  tokensMatch,
} from "./gateway";

const configuration = {
  hostingerWebhookTokens: { ops: "ops-secret", dev: "dev-secret", hr: "hr-secret" },
  vapiWebhookToken: "vapi-secret",
  manusApiKey: "manus-secret",
  manusProjectIds: { ops: "ops-project", dev: "dev-project", hr: "hr-project" },
};

describe("gateway authorization and routing", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    findGatewayAuditRecord.mockResolvedValue(undefined);
    createGatewayAuditRecord.mockResolvedValue(undefined);
    updateGatewayAuditRecord.mockResolvedValue(undefined);
  });

  it("uses exact internal-address authorization and timing-safe bearer matching", () => {
    expect(isApprovedInternalSender("ops@coreweaverlabs.com")).toBe(true);
    expect(isApprovedInternalSender("OPS@COREWEAVERLABS.COM")).toBe(true);
    expect(isApprovedInternalSender("outside@coreweaverlabs.com")).toBe(false);
    expect(isApprovedInternalSender("ops@other-example.com")).toBe(false);
    expect(extractBearerToken("Bearer signed-webhook-token")).toBe("signed-webhook-token");
    expect(extractBearerToken("Basic signed-webhook-token")).toBeNull();
    expect(tokensMatch("signed-webhook-token", "signed-webhook-token")).toBe(true);
    expect(tokensMatch("wrong-token", "signed-webhook-token")).toBe(false);
  });

  it("normalizes a Hostinger payload without retaining its raw body in the audit model", () => {
    const event = normalizeHostingerEvent(
      {
        event: "message.received",
        messageId: "hostinger-message-1",
        sender: { email: "dev@coreweaverlabs.com" },
        subject: "Integration status",
        preview: "Detailed inbound content that must not be copied to the audit record.",
      },
      "dev"
    );

    expect(event.eventKey).toBe("dev:hostinger-message-1");
    expect(event.senderReference).toBe("dev@coreweaverlabs.com");
    expect(event.preview).toMatch(/Detailed inbound/);
    expect(event.contentDigest).toMatch(/^[a-f0-9]{64}$/);
    expect(chooseGatewayRoute(event)).toBe("dev");
  });

  it("requires human review before the People & Feedback route can receive a Vapi caller", () => {
    const withoutConsent = normalizeVapiEvent({
      message: { type: "end-of-call-report", call: { id: "call-1" }, route: "hr", summary: "Research feedback" },
    });
    const withConsent = normalizeVapiEvent({
      message: {
        type: "end-of-call-report",
        call: { id: "call-2" },
        route: "hr",
        summary: "Voluntary research feedback",
        researchFeedbackConsent: true,
      },
    });
    const interimEvent = normalizeVapiEvent({
      message: { type: "transcript", call: { id: "call-3" }, route: "ops", summary: "Partial conversation" },
    });

    expect(chooseGatewayRoute(withoutConsent)).toBe("manual_review");
    expect(chooseGatewayRoute(withConsent)).toBe("hr");
    expect(chooseGatewayRoute(interimEvent)).toBe("human_escalation");
    expect(isReviewableVapiEvent(withoutConsent.eventType)).toBe(true);
    expect(isReviewableVapiEvent(interimEvent.eventType)).toBe(false);
  });

  it("sends an accepted internal message to a private draft-only Manus task and stores no raw body in the audit record", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, task_id: "manus-task-1", task_url: "https://manus.im/app/manus-task-1" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const event = normalizeHostingerEvent(
      {
        event: "message.received",
        id: "internal-message-1",
        sender: { email: "ops@coreweaverlabs.com" },
        subject: "Internal operating note",
        preview: "Private operating context.",
      },
      "ops"
    );

    await expect(ingestGatewayEvent(event, configuration)).resolves.toEqual({
      eventKey: "ops:internal-message-1",
      validationStatus: "accepted",
      actionStatus: "draft_task_created",
      route: "ops",
    });
    expect(createGatewayAuditRecord).toHaveBeenCalledWith(expect.objectContaining({
      senderReference: "ops@coreweaverlabs.com",
      contentDigest: expect.any(String),
      actionStatus: "none",
    }));
    expect(createGatewayAuditRecord.mock.calls[0][0]).not.toHaveProperty("preview");
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.manus.ai/v2/task.create",
      expect.objectContaining({ headers: expect.objectContaining({ "x-manus-api-key": "manus-secret" }) })
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.share_visibility).toBe("private");
    expect(body.structured_output_schema.properties.external_send_allowed).toEqual({ type: "boolean" });
    expect(body.message.content).toMatch(/external_send_allowed to false/i);
    expect(updateGatewayAuditRecord).toHaveBeenCalledWith("hostinger", "ops:internal-message-1", expect.objectContaining({
      actionStatus: "draft_task_created",
      manusTaskId: "manus-task-1",
    }));
  });

  it("rejects external mail to a human-review record without calling Manus", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const event = normalizeHostingerEvent(
      { id: "external-message-1", sender: { email: "prospect@example.com" }, preview: "Please handle this automatically." },
      "ops"
    );

    await expect(ingestGatewayEvent(event, configuration)).resolves.toEqual({
      eventKey: "ops:external-message-1",
      validationStatus: "rejected",
      actionStatus: "human_review_required",
      route: "manual_review",
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(createGatewayAuditRecord).toHaveBeenCalledWith(expect.objectContaining({
      route: "manual_review",
      validationStatus: "rejected",
      errorCode: "sender_not_allowlisted",
    }));
  });

  it("returns an idempotent result when the same provider event has already been recorded", async () => {
    findGatewayAuditRecord.mockResolvedValue({ route: "dev" });
    const event = normalizeHostingerEvent(
      { id: "message-seen-before", sender: { email: "dev@coreweaverlabs.com" }, preview: "No second task." },
      "dev"
    );

    await expect(ingestGatewayEvent(event, configuration)).resolves.toEqual({
      eventKey: "dev:message-seen-before",
      validationStatus: "duplicate",
      actionStatus: "none",
      route: "dev",
    });
    expect(createGatewayAuditRecord).not.toHaveBeenCalled();
  });
});
