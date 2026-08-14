import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import { TopicSearch } from "./TopicSearch";

afterEach(cleanup);

describe("TopicSearch", () => {
  it("provides a clear search field and routes a natural-language buyer problem to the relevant guide", () => {
    render(<TopicSearch />);
    const input = screen.getByRole("searchbox", { name: /what are you trying to make clearer/i });
    fireEvent.change(input, { target: { value: "buyers cannot find the right page" } });
    const result = screen.getByRole("link", { name: /b2b website information architecture/i });
    expect(result.getAttribute("href")).toBe("/topics/b2b-seo/website-information-architecture");
    expect(screen.getByText(/does not send the query to an external ai service/i)).toBeTruthy();
  });
});
