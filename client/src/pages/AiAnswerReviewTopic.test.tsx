import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ useParams: () => ({ pillar: "ai-representation", child: "ai-answer-review" }) }));
vi.mock("@/components/SiteChrome", () => ({ MarketingShell: ({ children }: { children: React.ReactNode }) => <>{children}</>, SectionLabel: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
vi.mock("@/components/SeoHead", () => ({ SeoHead: () => null }));

import ChildTopicDetail from "./ChildTopicDetail";

afterEach(cleanup);

describe("ChildTopicDetail AI answer review", () => {
  it("renders a blank privacy-safe worksheet and routes readers to the policy and claim-ledger standards", () => {
    render(<ChildTopicDetail />);
    expect(screen.getByRole("heading", { name: /ai answer review for b2b brands/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /a blank ai-answer-review worksheet/i })).toBeTruthy();
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByLabelText(/buyer question and answer context/i)).toBeTruthy();
    expect(screen.getByLabelText(/current public source-of-truth page/i)).toBeTruthy();
    expect(screen.getByText(/not submitted, stored, or treated as a verified assessment/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /coreweaver labs ai data policy/i }).getAttribute("href")).toBe("/ai-data-policy");
    expect(screen.getByRole("link", { name: /a b2b claim ledger/i }).getAttribute("href")).toBe("/topics/content-governance/claim-ledger");
    expect(screen.getByText(/does not control whether an ai system surfaces/i)).toBeTruthy();
  });
});
