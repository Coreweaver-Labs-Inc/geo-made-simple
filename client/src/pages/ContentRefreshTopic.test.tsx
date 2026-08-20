import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ useParams: () => ({ pillar: "b2b-content-marketing", child: "content-refresh" }) }));
vi.mock("@/components/SiteChrome", () => ({ MarketingShell: ({ children }: { children: React.ReactNode }) => <>{children}</>, SectionLabel: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
vi.mock("@/components/SeoHead", () => ({ SeoHead: () => null }));

import ChildTopicDetail from "./ChildTopicDetail";

afterEach(cleanup);

describe("ChildTopicDetail content refresh", () => {
  it("renders a blank decision worksheet and connects page maintenance to buyer enablement, information architecture, and claim governance", () => {
    render(<ChildTopicDetail />);
    expect(screen.getByRole("heading", { name: /b2b content refresh: update, merge, qualify, retire, or create/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /a blank content-refresh worksheet/i })).toBeTruthy();
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByLabelText(/existing page and buyer decision/i)).toBeTruthy();
    expect(screen.getByLabelText(/decision and next action/i)).toBeTruthy();
    expect(screen.getByText(/not submitted, stored, or treated as a verified content audit/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /b2b buyer enablement content/i }).getAttribute("href")).toBe("/topics/b2b-content-marketing/buyer-enablement");
    expect(screen.getByRole("link", { name: /b2b website information architecture/i }).getAttribute("href")).toBe("/topics/b2b-seo/website-information-architecture");
    expect(screen.getByRole("link", { name: /a b2b claim ledger/i }).getAttribute("href")).toBe("/topics/content-governance/claim-ledger");
    expect(screen.getByText(/does not guarantee freshness, ranking movement, ai visibility/i)).toBeTruthy();
  });
});
