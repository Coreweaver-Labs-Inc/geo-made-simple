import { describe, expect, it } from "vitest";
import { createArticleShareUrls, createPageShareUrls } from "./articleSharing";

describe("createArticleShareUrls", () => {
  it("builds canonical, URL-encoded LinkedIn and X sharing destinations", () => {
    const urls = createArticleShareUrls("signal-audit", "A practical signal audit & AI answers");

    expect(urls.articleUrl).toBe("https://coreweaverlabs.com/insights/signal-audit");
    expect(urls.linkedin).toContain(encodeURIComponent(urls.articleUrl));
    expect(urls.x).toContain(encodeURIComponent("A practical signal audit & AI answers"));
    expect(urls.x).toContain(encodeURIComponent(urls.articleUrl));
  });
});

describe("createPageShareUrls", () => {
  it("builds canonical LinkedIn, X, and Reddit URLs for public topic guides", () => {
    const urls = createPageShareUrls("/topics/b2b-seo/website-information-architecture", "B2B website information architecture");

    expect(urls.pageUrl).toBe("https://coreweaverlabs.com/topics/b2b-seo/website-information-architecture");
    expect(urls.linkedin).toContain(encodeURIComponent(urls.pageUrl));
    expect(urls.x).toContain(encodeURIComponent(urls.pageUrl));
    expect(urls.reddit).toContain(encodeURIComponent(urls.pageUrl));
    expect(urls.reddit).toContain(encodeURIComponent("B2B website information architecture"));
  });
});
