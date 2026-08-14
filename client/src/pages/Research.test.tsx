import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import Research from "./Research";

afterEach(cleanup);

describe("Research", () => {
  it("explains the sourceable publishing standard and avoids presenting the agenda as completed findings", () => {
    render(<Research />);
    expect(screen.getByRole("heading", { name: /research with a method/i })).toBeTruthy();
    expect(screen.getByText(/not conclusions we have already claimed/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /people-first content guidance/i })).toHaveProperty("href", "https://developers.google.com/search/docs/fundamentals/creating-helpful-content");
    expect(screen.getByText(/never converted into public proof automatically/i)).toBeTruthy();
  });
});
