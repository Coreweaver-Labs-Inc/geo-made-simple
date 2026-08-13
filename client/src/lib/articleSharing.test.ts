import { describe, expect, it } from "vitest";
import { createArticleShareUrls } from "./articleSharing";

describe("createArticleShareUrls", () => {
  it("builds canonical, URL-encoded LinkedIn and X sharing destinations", () => {
    const urls = createArticleShareUrls("signal-audit", "A practical signal audit & AI answers");

    expect(urls.articleUrl).toBe("https://coreweaverlabs.com/insights/signal-audit");
    expect(urls.linkedin).toContain(encodeURIComponent(urls.articleUrl));
    expect(urls.x).toContain(encodeURIComponent("A practical signal audit & AI answers"));
    expect(urls.x).toContain(encodeURIComponent(urls.articleUrl));
  });
});
