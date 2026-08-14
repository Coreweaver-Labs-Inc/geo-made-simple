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
});
