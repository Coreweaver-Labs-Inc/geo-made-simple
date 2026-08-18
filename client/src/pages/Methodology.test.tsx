import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import Methodology from "./Methodology";

afterEach(cleanup);

describe("The Coreweaver Method", () => {
  it("explains the decision path, keeps Earthward Foundry clearly exploratory, and links to live content silos", () => {
    render(<Methodology />);
    expect(screen.getByRole("heading", { name: /make the next answer more accountable/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /a page, a topic, a technique/i })).toBeTruthy();
    expect(screen.getByText(/not presented here as a launched product/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /website clarity and b2b seo/i }).getAttribute("href")).toBe("/topics/b2b-seo");
    expect(screen.getByRole("link", { name: /read google’s link guidance/i }).getAttribute("href")).toContain("developers.google.com");
  });
});
