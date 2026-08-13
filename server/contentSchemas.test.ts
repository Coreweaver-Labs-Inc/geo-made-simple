import { describe, expect, it } from "vitest";
import { contactSubmissionSchema, insightDraftSchema } from "./contentSchemas";

describe("public content validation", () => {
  it("accepts a complete contact submission and normalizes optional blanks", () => {
    const result = contactSubmissionSchema.safeParse({
      fullName: "Jordan Lee",
      email: "jordan@example.com",
      organization: "",
      website: "",
      message: "We would like to understand our visibility across AI answer engines.",
    });

    expect(result.success).toBe(true);
    if (result.success) expect(result.data.organization).toBeUndefined();
  });

  it("rejects invalid inquiry email addresses and short messages", () => {
    const result = contactSubmissionSchema.safeParse({
      fullName: "J",
      email: "not-an-email",
      message: "Too short",
    });

    expect(result.success).toBe(false);
  });

  it("requires a complete URL when an optional website is supplied", () => {
    const result = contactSubmissionSchema.safeParse({
      fullName: "Jordan Lee",
      email: "jordan@example.com",
      website: "example.com",
      message: "We would like to understand our visibility across AI answer engines.",
    });

    expect(result.success).toBe(false);
  });

  it("requires readable, indexable article fields", () => {
    const result = insightDraftSchema.safeParse({
      title: "How a practical signal audit creates better AI answers",
      slug: "practical-signal-audit",
      excerpt: "A clear overview of the evidence, language, and sources that shape a company’s AI answer visibility.",
      content: "A useful audit looks at the claims a company makes, the evidence supporting those claims, and the public sources that answer engines can interpret. It should produce a practical backlog rather than an abstract score.",
      category: "Signal systems",
      status: "published",
    });

    expect(result.success).toBe(true);
  });
});
