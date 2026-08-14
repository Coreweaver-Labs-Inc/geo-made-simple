import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Home from "./Home";

vi.mock("@/components/ContactForm", () => ({ ContactForm: () => null }));

afterEach(cleanup);

describe("Home", () => {
  it("defines specialist terms in plain buyer language instead of relying on unexplained jargon", () => {
    render(<Home />);
    const paragraphContaining = (phrase: string) => screen.getByText((_content, node) => node?.tagName === "P" && node.textContent?.includes(phrase) === true);
    expect(paragraphContaining("We use signal as shorthand")).toBeTruthy();
    expect(paragraphContaining("operating system means the repeatable roles")).toBeTruthy();
    expect(screen.getByText(/which sources influence those answers/i)).toBeTruthy();
    expect(screen.getByText(/governance—the review rules and approval habits/i)).toBeTruthy();
  });

  it("uses individually described visual assets instead of decorative generic imagery", () => {
    const { container } = render(<Home />);
    expect(screen.getByAltText("Graphite and pale mineral ribbons converging through a single teal alignment point in an abstract architectural weave.").getAttribute("src")).toContain("coreweaver-hero-identity_7f2f7654.jpg");
    expect(screen.getByAltText("A translucent measurement plane with brass reference pins and a teal datum line arranged over a quiet paper grid.").getAttribute("src")).toContain("coreweaver-framework-method-v2_88c0f3a5.jpg");
    expect(screen.getByAltText("A graphite lens, folded teal plane, and brass calibration ring arranged as three connected precision tools on a pale work surface.").getAttribute("src")).toContain("coreweaver-products-clarity-v2_36185701.jpg");
    expect(screen.getByAltText("A graphite ruler and open paper route with a single teal thread leading toward a softly lit edge of a drafting surface.").getAttribute("src")).toContain("coreweaver-engagement-desire-v2_3ad920b9.jpg");
    expect(container.querySelectorAll("img[title]")).toHaveLength(4);
  });
});
