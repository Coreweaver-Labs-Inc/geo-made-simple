import { cleanup, fireEvent, render, screen } from "@testing-library/react";
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
});
