import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ useParams: () => ({ slug: "useful-resource-route-not-page-pile" }) }));
vi.mock("@/components/SiteChrome", () => ({ MarketingShell: ({ children }: { children: React.ReactNode }) => <>{children}</>, SectionLabel: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
vi.mock("@/components/SeoHead", () => ({ SeoHead: () => null }));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    insights: {
      bySlug: {
        useQuery: () => ({
          isLoading: false,
          data: {
            title: "A useful resource is a route, not a pile of pages",
            slug: "useful-resource-route-not-page-pile",
            excerpt: "A reviewed field brief.",
            content: "A bounded operating interpretation.\n\nIt does not promise a commercial result.",
            category: "Signal Notes",
            author: "Mason Nguyen",
            contentType: "field_brief",
            sourceReferences: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide\nhttps://developers.google.com/search/docs/crawling-indexing/links-crawlable",
            methodNote: "Reviewed current primary documentation.",
            claimReviewer: "Coreweaver research editor",
            publishedAt: new Date("2026-08-18T00:00:00.000Z"),
          },
        }),
      },
    },
  },
}));

import InsightDetail from "./InsightDetail";

afterEach(cleanup);

describe("InsightDetail", () => {
  it("shows the reviewed Signal Note record and routes readers into related public resources", () => {
    render(<InsightDetail />);
    expect(screen.getByRole("heading", { name: /a useful resource is a route/i })).toBeTruthy();
    expect(screen.getByText(/confirmed by coreweaver research editor/i)).toBeTruthy();
    expect(screen.getByText("https://developers.google.com/search/docs/fundamentals/ai-optimization-guide")).toBeTruthy();
    expect(screen.getByRole("heading", { name: /keep the route connected/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /B2B website information architecture/i }).getAttribute("href")).toBe("/topics/b2b-seo/website-information-architecture");
    expect(screen.getByRole("link", { name: /research methods and editorial standards/i }).getAttribute("href")).toBe("/research");
  });
});
