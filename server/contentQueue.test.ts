import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  reserveNextApprovedContentSignal: vi.fn(),
  createGeneratedFieldBrief: vi.fn(),
  completeContentBriefRecord: vi.fn(),
  invokeLLM: vi.fn(),
}));

vi.mock("./db", () => ({
  reserveNextApprovedContentSignal: mocks.reserveNextApprovedContentSignal,
  createGeneratedFieldBrief: mocks.createGeneratedFieldBrief,
  completeContentBriefRecord: mocks.completeContentBriefRecord,
}));

vi.mock("./_core/llm", () => ({ invokeLLM: mocks.invokeLLM }));

import { fingerprintContentSignal, runNextContentBriefDraft } from "./contentQueue";

const queue = { id: 7, model: "gpt-5-mini" } as any;
const signal = {
  id: 23,
  sourceType: "manual_trend_snapshot",
  sourceReference: "Google Trends comparison, captured by editor",
  silo: "paid_message_learning",
  buyerQuestion: "How can a B2B team align a paid message and landing page?",
  summary: "An approved aggregate pattern suggests buyers may be comparing paid-message clarity and destination context.",
  sourceWindow: "2026-08-01 to 2026-08-14",
} as any;

describe("content brief queue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates a stable fingerprint for the same minimized editorial signal", () => {
    const first = fingerprintContentSignal(signal);
    const second = fingerprintContentSignal({ ...signal });
    const changed = fingerprintContentSignal({ ...signal, buyerQuestion: "A different buyer question" });

    expect(first).toBe(second);
    expect(first).not.toBe(changed);
    expect(first).toMatch(/^[a-f0-9]{64}$/);
  });

  it("skips without a model call when no approved signal can be reserved", async () => {
    mocks.reserveNextApprovedContentSignal.mockResolvedValue(undefined);

    await expect(runNextContentBriefDraft(queue)).resolves.toEqual({ status: "skipped", reason: "no_approved_signal" });
    expect(mocks.invokeLLM).not.toHaveBeenCalled();
    expect(mocks.createGeneratedFieldBrief).not.toHaveBeenCalled();
  });

  it("creates only a private field-brief draft and marks its audit record complete", async () => {
    mocks.reserveNextApprovedContentSignal.mockResolvedValue({ signal, recordId: 99 });
    mocks.invokeLLM.mockResolvedValue({ choices: [{ message: { content: JSON.stringify({ title: "Align paid message and landing-page context", excerpt: "A private draft that helps an editor review the continuity between a B2B paid message and its destination.", content: "Start with the buyer question. Inspect the paid message, destination explanation, and evidence boundary before expanding activity. This is a private draft for review and does not promise campaign outcomes.", category: "Paid-message learning", methodNote: "The approved aggregate signal framed an editorial question for subsequent source review." }) } }] });
    mocks.createGeneratedFieldBrief.mockResolvedValue(431);

    await expect(runNextContentBriefDraft(queue)).resolves.toEqual({ status: "draft_created", signalId: 23, recordId: 99, draftInsightId: 431 });
    expect(mocks.createGeneratedFieldBrief).toHaveBeenCalledWith(expect.objectContaining({
      title: "Align paid message and landing-page context",
      slug: expect.stringContaining("signal-23"),
      sourceReferences: signal.sourceReference,
      methodNote: expect.stringContaining("not proof of a claim"),
    }));
    expect(mocks.completeContentBriefRecord).toHaveBeenCalledWith(99, { status: "draft_created", draftInsightId: 431, errorCode: null });
  });

  it("records a failed private run without publishing or creating an insight when generation fails", async () => {
    mocks.reserveNextApprovedContentSignal.mockResolvedValue({ signal, recordId: 100 });
    mocks.invokeLLM.mockRejectedValue(new Error("model unavailable"));

    await expect(runNextContentBriefDraft(queue)).resolves.toEqual({ status: "failed", signalId: 23, recordId: 100 });
    expect(mocks.createGeneratedFieldBrief).not.toHaveBeenCalled();
    expect(mocks.completeContentBriefRecord).toHaveBeenCalledWith(100, { status: "failed", draftInsightId: null, errorCode: "Error: model unavailable" });
  });
});
