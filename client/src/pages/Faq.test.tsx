import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import Faq, { faqCategories } from "./Faq";

afterEach(cleanup);

describe("Faq", () => {
  it("renders source-safe FAQ coverage and lets readers filter to a topic", () => {
    render(<Faq />);
    expect(screen.getByRole("heading", { name: /working questions behind an evidence-led/i })).toBeTruthy();
    expect(screen.getByLabelText("FAQ coverage").textContent).toContain("0 invented outcomes");
    fireEvent.click(screen.getByRole("button", { name: /research and evidence/i }));
    expect(screen.getByRole("heading", { name: /research, case studies, and proof/i })).toBeTruthy();
    expect(screen.queryByRole("heading", { name: /services, scope, and engagement/i })).toBeNull();
  });

  it("searches FAQ answers without exposing fabricated guarantees", () => {
    render(<Faq />);
    fireEvent.change(screen.getByRole("textbox", { name: /search frequently asked questions/i }), { target: { value: "guarantee" } });
    const question = screen.getByRole("button", { name: /does coreweaver labs guarantee rankings/i });
    expect(question).toBeTruthy();
    fireEvent.click(question);
    const answers = faqCategories.flatMap((category) => category.items.map((item) => item.schemaAnswer));
    expect(answers).toContain("Coreweaver Labs does not guarantee rankings, AI citations, leads, revenue, or return on ad spend.");
  });

  it("states approved starting prices while preserving the scope and separate-cost boundary", () => {
    const answers = faqCategories.flatMap((category) => category.items.map((item) => item.schemaAnswer));
    expect(answers).toContain("Coreweaver Labs’ approved commercial starting prices are from $6,500 per month for SEO, from $7,500 per month for Content Marketing, and from $7,500 per month for Paid Ads. A statement of work confirms final scope, timing, and separate costs such as paid-media spend.");
  });

  it("uses the warm Signal Ledger tokens rather than the retired dark/neon FAQ surface", () => {
    const stylesheet = fs.readFileSync(path.resolve(process.cwd(), "client/src/index.css"), "utf8");
    expect(stylesheet).toContain(".faq-page { --faq-bg: var(--paper);");
    expect(stylesheet).toContain("--faq-accent: var(--teal);");
    expect(stylesheet).not.toContain(".faq-page { --faq-bg: #0a0a0a;");
  });
});
