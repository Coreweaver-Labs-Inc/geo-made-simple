import { describe, expect, it } from "vitest";
import { caseStudyHandoffSchema, caseStudyIntakeSchema, contactSubmissionSchema, contentTrendSignalSchema, gtmOpportunitySchema, gtmRequestSchema, gtmWorkItemSchema, insightDraftSchema, marketResearchRecordSchema, marketResearchReviewSchema } from "./contentSchemas";

describe("public content validation", () => {
  it("accepts only a minimized, source-named aggregate signal for private queue review", () => {
    const result = contentTrendSignalSchema.safeParse({
      sourceType: "analytics",
      sourceReference: "Aggregate resource-card event summary",
      silo: "paid_message_learning",
      buyerQuestion: "Where does a buyer lose the message context after an ad click?",
      summary: "Aggregate navigation patterns suggest reviewing whether the paid-message resource and destination use connected terminology.",
      sourceWindow: "2026-08-01 to 2026-08-14",
    });

    expect(result.success).toBe(true);
  });

  it("requires a source, limitation, owner, and review trigger for a private market-research record", () => {
    const result = marketResearchRecordSchema.safeParse({
      title: "Reported B2B marketing conditions should be reviewed with source limitations",
      lane: "market_conditions",
      sourceReference: "https://example.com/report",
      sourceScope: "Vendor survey of B2B marketers published in 2026; record the sample, geography, and self-report limitations before reuse.",
      observation: "The report describes survey respondents as increasing investment in selected digital and content functions while project approvals remain uneven.",
      limitation: "The source is vendor-sponsored and self-reported, so it cannot establish demand, performance, or conditions for a particular Coreweaver prospect.",
      interpretation: "Coreweaver should preserve small, reviewable first engagements and test public-information gaps before expanding the scope of a content or paid-media recommendation.",
      decision: "investigate",
      ownerName: "Market conditions researcher",
      reviewTrigger: "Review when a newer primary source, policy change, or source-method update is available.",
    });
    expect(result.success).toBe(true);
  });

  it("requires named review confirmation before a market record can be marked reviewed", () => {
    expect(marketResearchReviewSchema.safeParse({ id: 1, status: "reviewed", reviewerName: "Research editor", reviewConfirmed: true }).success).toBe(true);
    expect(marketResearchReviewSchema.safeParse({ id: 1, status: "reviewed", reviewerName: "", reviewConfirmed: false }).success).toBe(false);
  });

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

  it("requires sources, a method, named review, and confirmation before research can publish", () => {
    const base = {
      title: "What mid-market B2B teams need from a research publishing record",
      slug: "research-publishing-record",
      excerpt: "A concise explanation of the evidence and review information that make a research publication inspectable by a reader.",
      content: "A useful research record makes its question, source selection, limitations, and review accountable to a reader. It does not treat a working hypothesis as a completed market finding, and it distinguishes documented evidence from sales language.",
      category: "Research methods",
      contentType: "research_brief" as const,
      status: "published" as const,
    };
    const incomplete = insightDraftSchema.safeParse(base);
    const complete = insightDraftSchema.safeParse({
      ...base,
      sourceReferences: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
      methodNote: "Reviewed primary documentation and recorded the publication scope, source date, and limits before drafting.",
      claimReviewer: "Research editor",
      claimReviewConfirmed: true,
    });

    expect(incomplete.success).toBe(false);
    expect(complete.success).toBe(true);
  });

  it("allows an incomplete research record to remain a private draft", () => {
    const result = insightDraftSchema.safeParse({
      title: "A draft record for a future mid-market B2B field brief",
      slug: "future-mid-market-field-brief",
      excerpt: "A draft field brief may collect a question and initial working language before sources and reviewers are ready.",
      content: "The draft is deliberately not a publication claim. It gives an editor a workspace for outlining a question, source plan, and the evidence that could later support a reader-facing explanation with accountable review.",
      category: "Research methods",
      contentType: "field_brief",
      status: "draft",
    });

    expect(result.success).toBe(true);
  });

  it("accepts all seven required case-study governance fields only with written authorization", () => {
    const result = caseStudyIntakeSchema.safeParse({
      clientLabel: "Authorized anonymous B2B platform",
      sourceName: "Reviewed quarterly visibility report",
      sourceReference: "Quarterly visibility report, source tab, reviewed internally",
      supportableFinding: "The cited report supports the approved finding exactly as written, including its method and reporting context.",
      metricDefinition: "The report's stated unit, denominator, comparison point, and method.",
      scope: "GEO information architecture review covering public service pages and approved evidence sources.",
      reportingStart: "2026-01-01",
      reportingEnd: "2026-03-31",
      reviewDate: "2026-04-15",
      sourceOwnerApproval: "Source-owner release ID Q1-2026.",
      publicationAuthorization: "Jordan Lee, VP Marketing, approved the anonymous label, source attribution, finding language, and public scope on 2026-04-15.",
      authorizationConfirmed: true,
      privacyReviewConfirmed: true,
      claimReviewConfirmed: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects a case-study record that lacks authorization or has an inverted reporting window", () => {
    const result = caseStudyIntakeSchema.safeParse({
      clientLabel: "Example client",
      sourceName: "Example source",
      sourceReference: "A report reference that has sufficient detail.",
      supportableFinding: "This is an exact and supportable finding written with enough detail for validation.",
      scope: "A complete scope description containing enough detail for review.",
      reportingStart: "2026-04-01",
      reportingEnd: "2026-03-31",
      reviewDate: "2026-04-15",
      sourceOwnerApproval: "Source owner reference.",
      publicationAuthorization: "A sufficiently descriptive record of written authorization for publication.",
      authorizationConfirmed: false,
      privacyReviewConfirmed: false,
      claimReviewConfirmed: false,
    });
    expect(result.success).toBe(false);
  });

  it("requires named reviewer handoffs and a publication date before a private record can be marked ready", () => {
    const ready = caseStudyHandoffSchema.safeParse({ id: 1, sourceOwnerApprovedBy: "Jordan Lee", swellReviewer: "Swell editorial reviewer", privacyReviewedBy: "Privacy reviewer", plannedPublicationDate: "2026-05-01", handoffStatus: "ready" });
    const incomplete = caseStudyHandoffSchema.safeParse({ id: 1, handoffStatus: "ready" });
    expect(ready.success).toBe(true);
    expect(incomplete.success).toBe(false);
  });

  it("accepts a complete private GTM service request and rejects a support request without a subject", () => {
    const service = gtmRequestSchema.safeParse({ requestType: "service_inquiry", fullName: "Jordan Lee", email: "jordan@example.com", organization: "Example systems", serviceInterest: "seo", message: "We need to connect sales, marketing, support, and delivery around an evidence-led GTM operating model.", urgency: "standard" });
    const invalidSupport = gtmRequestSchema.safeParse({ requestType: "support_request", fullName: "Jordan Lee", email: "jordan@example.com", message: "We need help understanding an existing service engagement and its next delivery step.", urgency: "high" });
    expect(service.success).toBe(true);
    expect(invalidSupport.success).toBe(false);
  });

  it("accepts explicit protected commercial and cross-functional work records", () => {
    const opportunity = gtmOpportunitySchema.safeParse({ accountId: 1, serviceLine: "signal_intelligence_audit", title: "Private discovery scope", stage: "qualified", ownerName: "Sales owner", nextStep: "Schedule a private discovery conversation." });
    const work = gtmWorkItemSchema.safeParse({ accountId: 1, title: "Review approved evidence inventory", functionalArea: "research", status: "planned", ownerName: "Research owner", dueDate: "2026-08-20" });
    expect(opportunity.success).toBe(true);
    expect(work.success).toBe(true);
  });
});
