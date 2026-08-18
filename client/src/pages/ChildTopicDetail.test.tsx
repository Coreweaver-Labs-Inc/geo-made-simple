import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ useParams: () => ({ pillar: "content-governance", child: "claim-ledger" }) }));
vi.mock("@/components/SiteChrome", () => ({ MarketingShell: ({ children }: { children: React.ReactNode }) => <>{children}</>, SectionLabel: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
vi.mock("@/components/SeoHead", () => ({ SeoHead: () => null }));

import ChildTopicDetail from "./ChildTopicDetail";

afterEach(cleanup);

describe("ChildTopicDetail claim ledger", () => {
  it("renders a blank non-submitting worksheet with the required evidence and ownership fields", () => {
    render(<ChildTopicDetail />);
    expect(screen.getByRole("heading", { name: /a b2b claim ledger/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /a blank claim-ledger worksheet/i })).toBeTruthy();
    expect(screen.getAllByRole("textbox")).toHaveLength(6);
    expect(screen.getByLabelText(/exact public statement/i)).toBeTruthy();
    expect(screen.getByLabelText(/named claim owner/i)).toBeTruthy();
    expect(screen.getByText(/not submitted, stored, or treated as verified evidence/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /authorized case-study evidence standards/i }).getAttribute("href")).toBe("/case-studies");
    expect(screen.getByRole("link", { name: /research and evidence faq answers/i }).getAttribute("href")).toBe("/faq#faq-evidence");
  });
});
