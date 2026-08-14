import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import AiDataPolicy from "./AiDataPolicy";

afterEach(cleanup);

describe("AiDataPolicy", () => {
  it("separates permitted search retrieval from prohibited model training and protected information", () => {
    render(<AiDataPolicy />);
    expect(screen.getByRole("heading", { name: /make public knowledge useful/i })).toBeTruthy();
    expect(screen.getByText(/search and answer retrieval/i)).toBeTruthy();
    expect(screen.getByRole("heading", { name: "General model training" })).toBeTruthy();
    expect(screen.getByText(/private workspaces, noindex routes, client intake records/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /openai’s crawler overview/i })).toHaveProperty("href", "https://developers.openai.com/api/docs/bots");
  });
});
