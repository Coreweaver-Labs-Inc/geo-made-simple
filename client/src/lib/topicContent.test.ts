import { describe, expect, it } from "vitest";
import { getChildTopic, getChildTopicsForParent, searchTopicLibrary } from "./topicContent";

describe("expanded topic content", () => {
  it("retrieves the two approved child guides beneath their correct parent topics", () => {
    expect(getChildTopic("b2b-seo", "website-information-architecture")?.title).toBe("B2B website information architecture");
    expect(getChildTopic("b2b-content-marketing", "buyer-enablement")?.title).toBe("B2B buyer enablement content");
    expect(getChildTopicsForParent("b2b-seo")).toHaveLength(1);
    expect(getChildTopicsForParent("b2b-content-marketing")).toHaveLength(1);
  });

  it("matches natural-language buyer problems to the relevant implemented guide without an external AI call", () => {
    expect(searchTopicLibrary("buyers cannot find the right service page")[0]?.href).toBe("/topics/b2b-seo/website-information-architecture");
    expect(searchTopicLibrary("we need content that helps a buying group decide")[0]?.href).toBe("/topics/b2b-content-marketing/buyer-enablement");
    expect(searchTopicLibrary(" ")).toEqual([]);
  });
});
