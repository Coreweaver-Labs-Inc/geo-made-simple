import { describe, expect, it } from "vitest";
import { getChildTopic, getChildTopicsForParent, searchTopicLibrary } from "./topicContent";

describe("expanded topic content", () => {
  it("retrieves approved child guides beneath their correct parent topics", () => {
    expect(getChildTopic("b2b-seo", "website-information-architecture")?.title).toBe("B2B website information architecture");
    expect(getChildTopic("b2b-content-marketing", "buyer-enablement")?.title).toBe("B2B buyer enablement content");
    expect(getChildTopicsForParent("b2b-seo")).toHaveLength(1);
    expect(getChildTopicsForParent("b2b-content-marketing")).toHaveLength(1);
    expect(getChildTopic("b2b-paid-ads", "message-landing-page-alignment")?.title).toBe("B2B paid ads and landing-page alignment");
    expect(getChildTopicsForParent("b2b-paid-ads")).toHaveLength(1);
    expect(getChildTopic("content-governance", "claim-ledger")?.title).toBe("A B2B claim ledger: connecting public statements to current support");
    expect(getChildTopicsForParent("content-governance")).toHaveLength(1);
    expect(getChildTopic("ai-representation", "ai-answer-review")?.title).toBe("AI answer review for B2B brands");
    expect(getChildTopicsForParent("ai-representation")).toHaveLength(1);
  });

  it("matches natural-language buyer problems to the relevant implemented guide without an external AI call", () => {
    expect(searchTopicLibrary("buyers cannot find the right service page")[0]?.href).toBe("/topics/b2b-seo/website-information-architecture");
    expect(searchTopicLibrary("we need content that helps a buying group decide")[0]?.href).toBe("/topics/b2b-content-marketing/buyer-enablement");
    expect(searchTopicLibrary("our ad message does not match the landing page")[0]?.href).toBe("/topics/b2b-paid-ads/message-landing-page-alignment");
    expect(searchTopicLibrary("we need clearer ownership and support for public claims")[0]?.href).toBe("/topics/content-governance/claim-ledger");
    expect(searchTopicLibrary("we need to inspect an AI answer about our company")[0]?.href).toBe("/topics/ai-representation/ai-answer-review");
    expect(searchTopicLibrary(" ")).toEqual([]);
  });
});
