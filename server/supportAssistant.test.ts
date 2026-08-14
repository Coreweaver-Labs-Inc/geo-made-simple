import { beforeEach, describe, expect, it, vi } from "vitest";

const { invokeLLM, listLLMModels } = vi.hoisted(() => ({
  invokeLLM: vi.fn(),
  listLLMModels: vi.fn(),
}));

vi.mock("./_core/llm", () => ({ invokeLLM, listLLMModels }));

import { guideSupportInquiry } from "./supportAssistant";

describe("guideSupportInquiry", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    listLLMModels.mockResolvedValue({ data: [{ id: "gpt-5-mini" }] });
  });

  it("returns a bounded structured sales recommendation without creating a record", async () => {
    invokeLLM.mockResolvedValue({ choices: [{ message: { content: JSON.stringify({ recommendedPath: "sales", recommendedService: "seo", urgency: "standard", summary: "New SEO service inquiry." }) } }] });
    await expect(guideSupportInquiry({ requestType: "service_inquiry", serviceInterest: "seo", message: "We need a mid-market B2B SEO partner." })).resolves.toMatchObject({ recommendedPath: "sales", recommendedService: "seo", urgency: "standard", summary: "Initial routing recommendation; human review required.", reply: expect.stringMatching(/private sales form/i) });
    expect(invokeLLM).toHaveBeenCalledWith(expect.objectContaining({ model: "gpt-5-mini", responseFormat: expect.objectContaining({ type: "json_schema" }) }));
  });

  it("uses a safe human-review fallback when the model cannot respond", async () => {
    invokeLLM.mockRejectedValue(new Error("service unavailable"));
    const reply = await guideSupportInquiry({ requestType: "support_request", message: "I need help with my existing engagement." });
    expect(reply.recommendedPath).toBe("support");
    expect(reply.recommendedService).toBe("not_sure");
    expect(reply.reply).toMatch(/human review|team/i);
  });
});
