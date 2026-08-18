import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ useParams: () => ({ slug: "claim-boundary-before-distribution" }) }));
vi.mock("@/components/SiteChrome", () => ({ MarketingShell: ({ children }: { children: React.ReactNode }) => <>{children}</>, SectionLabel: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
vi.mock("@/components/SeoHead", () => ({ SeoHead: () => null }));
vi.mock("@/lib/trpc", () => ({
  trpc: {
    insights: {
      bySlug: {
        useQuery: () => ({
          isLoading: false,
          data: {
            title: "A B2B claim needs a boundary before it needs distribution",
            slug: "claim-boundary-before-distribution",
            excerpt: "A reviewed field brief about letting source, scope, and limitation travel with a public B2B claim.",
            content: "A bounded operating interpretation.\n\nIt does not promise a commercial result.",
            category: "Signal Notes",
            author: "Mason Nguyen",
            contentType: "field_brief",
            sourceReferences: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content\nhttps://developers.google.com/search/blog/2021/06/google-news-sources",
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

describe("InsightDetail second Signal Note", () => {
  it("shows the reviewed field record and connects the claim-boundary note to its governance context", () => {
    render(<InsightDetail />);
    expect(screen.getByRole("heading", { name: /a b2b claim needs a boundary/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /keep the evidence boundary visible/i })).toBeTruthy();
    expect(screen.getByText("https://developers.google.com/search/docs/fundamentals/creating-helpful-content")).toBeTruthy();
    expect(screen.getByRole("link", { name: /a b2b claim ledger/i }).getAttribute("href")).toBe("/topics/content-governance/claim-ledger");
    expect(screen.getByRole("link", { name: /authorized case-study evidence standards/i }).getAttribute("href")).toBe("/case-studies");
  });
});
