import express from "express";
import { createServer } from "node:http";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const gateway = vi.hoisted(() => ({
  extractBearerToken: vi.fn(),
  ingestGatewayEvent: vi.fn(),
  isGatewayMailbox: vi.fn(),
  isReviewableVapiEvent: vi.fn(),
  loadGatewayConfiguration: vi.fn(),
  normalizeHostingerEvent: vi.fn(),
  normalizeVapiEvent: vi.fn(),
  tokensMatch: vi.fn(),
}));

vi.mock("./gateway", () => gateway);

import { registerGatewayRoutes } from "./gatewayRoutes";

const configuration = {
  hostingerWebhookTokens: { ops: "ops-token", dev: "dev-token", hr: "hr-token" },
  vapiWebhookToken: "vapi-token",
  manusApiKey: "manus-token",
  manusProjectIds: { ops: "ops-project", dev: "dev-project", hr: "hr-project" },
};

async function withGatewayServer(run: (baseUrl: string) => Promise<void>) {
  const app = express();
  app.use(express.json());
  registerGatewayRoutes(app);
  const server = createServer(app);
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", () => resolve()));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Test server did not start");
  try {
    await run(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => (error ? reject(error) : resolve())));
  }
}

describe("gateway webhook routes", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    gateway.loadGatewayConfiguration.mockResolvedValue(configuration);
    gateway.extractBearerToken.mockReturnValue("received-token");
    gateway.tokensMatch.mockReturnValue(true);
    gateway.isGatewayMailbox.mockImplementation((mailbox: string) => ["ops", "dev", "hr"].includes(mailbox));
  });

  afterEach(() => vi.unstubAllGlobals());

  it("rejects an unauthorized Hostinger webhook before event normalization or task routing", async () => {
    gateway.tokensMatch.mockReturnValue(false);
    await withGatewayServer(async baseUrl => {
      const response = await fetch(`${baseUrl}/webhooks/hostinger/ops`, { method: "POST", body: "{}", headers: { "Content-Type": "application/json" } });
      await expect(response.json()).resolves.toEqual({ accepted: false, state: "unauthorized" });
      expect(response.status).toBe(401);
    });
    expect(gateway.normalizeHostingerEvent).not.toHaveBeenCalled();
    expect(gateway.ingestGatewayEvent).not.toHaveBeenCalled();
  });

  it("acknowledges an authenticated non-terminal Vapi event without creating a review task", async () => {
    gateway.normalizeVapiEvent.mockReturnValue({ eventType: "transcript" });
    gateway.isReviewableVapiEvent.mockReturnValue(false);
    await withGatewayServer(async baseUrl => {
      const response = await fetch(`${baseUrl}/webhooks/vapi`, { method: "POST", body: "{}", headers: { "Content-Type": "application/json" } });
      await expect(response.json()).resolves.toEqual({ accepted: true, state: "ignored_nonterminal_event" });
      expect(response.status).toBe(200);
    });
    expect(gateway.ingestGatewayEvent).not.toHaveBeenCalled();
  });

  it("passes only an authenticated terminal Vapi event to the draft-only ingestion path", async () => {
    const event = { eventType: "end-of-call-report", eventKey: "call-1:end-of-call-report" };
    gateway.normalizeVapiEvent.mockReturnValue(event);
    gateway.isReviewableVapiEvent.mockReturnValue(true);
    gateway.ingestGatewayEvent.mockResolvedValue({
      eventKey: event.eventKey,
      validationStatus: "accepted",
      actionStatus: "draft_task_created",
      route: "ops",
    });
    await withGatewayServer(async baseUrl => {
      const response = await fetch(`${baseUrl}/webhooks/vapi`, { method: "POST", body: "{}", headers: { "Content-Type": "application/json" } });
      await expect(response.json()).resolves.toEqual({ accepted: true, eventKey: event.eventKey, state: "draft_task_created" });
      expect(response.status).toBe(202);
    });
    expect(gateway.ingestGatewayEvent).toHaveBeenCalledWith(event, configuration);
  });
});
