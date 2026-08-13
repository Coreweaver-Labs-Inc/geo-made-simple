import { describe, expect, it } from "vitest";
import { getAuthorByName, getAuthorBySlug, getAuthorHref } from "./authors";

describe("author profiles", () => {
  it("resolves the canonical author profile from a display name or slug", () => {
    expect(getAuthorBySlug("mason-nguyen")?.name).toBe("Mason Nguyen");
    expect(getAuthorByName("Mason Nguyen")?.slug).toBe("mason-nguyen");
    expect(getAuthorHref("Mason Nguyen")).toBe("/authors/mason-nguyen");
    expect(getAuthorBySlug("mason-nguyen")?.authorityLinks).toHaveLength(4);
  });

  it("does not manufacture profile routes for unknown contributors", () => {
    expect(getAuthorByName("Coreweaver Labs")).toBeUndefined();
    expect(getAuthorHref("Coreweaver Labs")).toBeUndefined();
  });
});
