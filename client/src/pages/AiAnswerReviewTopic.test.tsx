import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("wouter", () => ({ useParams: () => ({ pillar: "ai-representation", child: "ai-answer-review" }) }));
vi.mock("@/components/SiteChrome", () => ({ MarketingShell: ({ children }: { children: React.ReactNode }) => <>{children}</>, SectionLabel: ({ children }: { children: React.ReactNode }) => <span>{children}</span> }));
vi.mock("@/components/SeoHead", () => ({ SeoHead: () => null }));

import ChildTopicDetail from "./ChildTopicDetail";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

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

  it("downloads a browser-local text copy without submitting worksheet entries", () => {
    const createObjectUrl = vi.fn(() => "blob:ai-answer-review");
    const revokeObjectUrl = vi.fn();
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: createObjectUrl });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: revokeObjectUrl });
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => undefined);

    render(<ChildTopicDetail />);
    fireEvent.change(screen.getByLabelText(/buyer question and answer context/i), { target: { value: "What should a buyer inspect first?" } });
    fireEvent.click(screen.getByRole("button", { name: /download a private text copy/i }));

    expect(createObjectUrl).toHaveBeenCalledOnce();
    expect(click).toHaveBeenCalledOnce();
    expect(revokeObjectUrl).toHaveBeenCalledWith("blob:ai-answer-review");
    expect(screen.getByRole("status").textContent).toMatch(/downloaded to this device/i);
  });
});
