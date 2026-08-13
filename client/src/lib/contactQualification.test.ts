import { describe, expect, it } from "vitest";
import { buildQualificationMessage, getQualificationStep, validateQualifiedName, validateQualifiedWorkEmail } from "./contactQualification";

describe("buildQualificationMessage", () => {
  it("creates a useful, server-valid message without requiring an open-text answer", () => {
    const message = buildQualificationMessage("Make our brand easier for AI to understand", "We need a practical plan");

    expect(message).toContain("Conversation goal");
    expect(message).toContain("No additional context was supplied.");
    expect(message.length).toBeGreaterThanOrEqual(20);
  });

  it("preserves optional additional context when it is supplied", () => {
    const message = buildQualificationMessage("Build accountable AI systems", "We are ready to move", "We need a review before a product launch.");

    expect(message).toContain("review before a product launch");
  });

  it("moves through the guided flow only after each qualification choice is made", () => {
    expect(getQualificationStep(null, null)).toBe(1);
    expect(getQualificationStep("Build accountable AI systems", null)).toBe(2);
    expect(getQualificationStep("Build accountable AI systems", "We are ready to move")).toBe(3);
  });

  it("returns clear validation feedback for the only required contact details", () => {
    expect(validateQualifiedName(" ")).toBe("Please enter your name.");
    expect(validateQualifiedName("A")).toBe("Please use at least two characters.");
    expect(validateQualifiedName("Jordan Lee")).toBe(true);
    expect(validateQualifiedWorkEmail("not-an-email")).toBe("Please enter a valid email address.");
    expect(validateQualifiedWorkEmail("jordan@example.com")).toBe(true);
  });
});
