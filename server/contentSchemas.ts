import { z } from "zod";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform(value => value || undefined);

const optionalUrl = z
  .union([z.literal(""), z.string().trim().url("Please enter a full URL, including https://.").max(320)])
  .optional()
  .transform(value => value || undefined);

export const contactSubmissionSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name.").max(160),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  organization: optionalText(160),
  website: optionalUrl,
  message: z.string().trim().min(20, "Please share a little more detail (at least 20 characters).").max(5000),
  formWebsite: z.string().max(0).optional(),
});

export const insightDraftSchema = z.object({
  title: z.string().trim().min(12, "Use a more descriptive title.").max(180),
  slug: z
    .string()
    .trim()
    .min(3)
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase words separated by hyphens."),
  excerpt: z.string().trim().min(40, "Write a short summary of at least 40 characters.").max(1200),
  content: z.string().trim().min(120, "Add at least 120 characters of article content.").max(50000),
  category: z.string().trim().min(2).max(80),
  status: z.enum(["draft", "published"]),
});

export const insightSlugSchema = z.object({
  slug: z.string().trim().min(3).max(180),
});

export const caseStudySlugSchema = z.object({ slug: z.string().trim().min(3).max(180) });

const requiredDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use a date in YYYY-MM-DD format.");
const optionalId = z.union([z.number().int().positive(), z.undefined()]);

export const caseStudyIntakeSchema = z.object({
  clientLabel: z.string().trim().min(3, "Please provide an approved client label.").max(160),
  sourceName: z.string().trim().min(2, "Please name the supporting source.").max(220),
  sourceReference: z.string().trim().min(8, "Please identify the source URL or document.").max(5000),
  supportableFinding: z.string().trim().min(30, "State the exact supportable finding.").max(5000),
  metricDefinition: optionalText(5000),
  scope: z.string().trim().min(20, "Describe the scope of work.").max(5000),
  reportingStart: requiredDate,
  reportingEnd: requiredDate,
  reviewDate: requiredDate,
  sourceOwnerApproval: z.string().trim().min(10, "Record the source-owner approval reference.").max(5000),
  publicationAuthorization: z.string().trim().min(30, "Record the written authorization details.").max(5000),
  replyEmail: z.union([z.literal(""), z.string().trim().email("Please enter a valid email address.").max(320)]).optional().transform(value => value || undefined),
  authorizationConfirmed: z.literal(true, { error: "Written publication authorization must be confirmed." }),
  privacyReviewConfirmed: z.literal(true, { error: "Please confirm the privacy review." }),
  claimReviewConfirmed: z.literal(true, { error: "Please confirm the claim-safety review." }),
  formWebsite: z.string().max(0).optional(),
}).refine(data => data.reportingEnd >= data.reportingStart, { message: "The reporting end date must be on or after the start date.", path: ["reportingEnd"] });

export const caseStudyHandoffSchema = z.object({
  id: z.number().int().positive(),
  sourceOwnerApprovedBy: optionalText(220),
  swellReviewer: optionalText(220),
  privacyReviewedBy: optionalText(220),
  plannedPublicationDate: z.union([z.literal(""), requiredDate]).optional().transform(value => value || undefined),
  handoffStatus: z.enum(["pending", "returned", "ready"]),
}).superRefine((data, ctx) => {
  if (data.handoffStatus !== "ready") return;
  const requiredFields: Array<[keyof typeof data, string]> = [
    ["sourceOwnerApprovedBy", "Record the source owner who approved the handoff."],
    ["swellReviewer", "Record the Swell reviewer."],
    ["privacyReviewedBy", "Record the privacy reviewer."],
    ["plannedPublicationDate", "Set the planned publication date."],
  ];
  requiredFields.forEach(([field, message]) => {
    if (!data[field]) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [field], message });
  });
});

export const gtmRequestSchema = z.object({
  requestType: z.enum(["service_inquiry", "support_request"]),
  fullName: z.string().trim().min(2, "Please enter your name.").max(160),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  organization: optionalText(160),
  website: optionalUrl,
  serviceInterest: z.enum(["signal_intelligence_audit", "gtm_enablement_sprint", "representation_operations", "not_sure"]).optional(),
  subject: optionalText(220),
  message: z.string().trim().min(30, "Please share enough context for the team to respond.").max(5000),
  urgency: z.enum(["standard", "high"]).default("standard"),
  formWebsite: z.string().max(0).optional(),
}).superRefine((data, ctx) => {
  if (data.requestType === "support_request" && !data.subject) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["subject"], message: "Please add a short support subject." });
});

export const gtmAccountSchema = z.object({
  name: z.string().trim().min(2).max(180),
  website: optionalUrl,
  segment: optionalText(120),
  status: z.enum(["prospect", "client", "inactive"]),
  ownerName: optionalText(160),
});

export const gtmContactSchema = z.object({
  accountId: optionalId,
  fullName: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  roleTitle: optionalText(160),
  status: z.enum(["active", "archived"]),
});

export const gtmOpportunitySchema = z.object({
  accountId: z.number().int().positive(),
  contactId: optionalId,
  serviceLine: z.enum(["signal_intelligence_audit", "gtm_enablement_sprint", "representation_operations", "custom"]),
  title: z.string().trim().min(4).max(220),
  stage: z.enum(["inquiry", "qualified", "discovery", "proposal", "won", "lost"]),
  ownerName: optionalText(160),
  nextStep: optionalText(5000),
});

export const gtmSupportCaseSchema = z.object({
  accountId: optionalId,
  contactId: optionalId,
  subject: z.string().trim().min(4).max(220),
  detail: z.string().trim().min(20).max(5000),
  priority: z.enum(["standard", "high", "urgent"]),
  status: z.enum(["new", "open", "waiting", "resolved", "closed"]),
  ownerName: optionalText(160),
});

export const gtmWorkItemSchema = z.object({
  accountId: optionalId,
  opportunityId: optionalId,
  supportCaseId: optionalId,
  title: z.string().trim().min(4).max(220),
  detail: optionalText(5000),
  functionalArea: z.enum(["sales", "support", "operations", "marketing", "research", "design"]),
  status: z.enum(["planned", "in_progress", "blocked", "review", "done"]),
  ownerName: optionalText(160),
  dueDate: z.union([z.literal(""), requiredDate]).optional().transform(value => value || undefined),
});

export const gtmOpportunityUpdateSchema = z.object({
  id: z.number().int().positive(),
  stage: z.enum(["inquiry", "qualified", "discovery", "proposal", "won", "lost"]),
  nextStep: optionalText(5000),
});

export const gtmRequestUpdateSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["new", "triaged", "closed"]),
  ownerName: optionalText(160),
});

export const gtmAccountUpdateSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["prospect", "client", "inactive"]),
  ownerName: optionalText(160),
});

export const gtmContactUpdateSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["active", "archived"]),
});

export const gtmSupportCaseUpdateSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["new", "open", "waiting", "resolved", "closed"]),
});

export const gtmWorkItemUpdateSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["planned", "in_progress", "blocked", "review", "done"]),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
export type InsightDraftInput = z.infer<typeof insightDraftSchema>;
export type CaseStudyIntakeInput = z.infer<typeof caseStudyIntakeSchema>;
export type CaseStudyHandoffInput = z.infer<typeof caseStudyHandoffSchema>;
export type GtmRequestInput = z.infer<typeof gtmRequestSchema>;
export type GtmAccountInput = z.infer<typeof gtmAccountSchema>;
export type GtmContactInput = z.infer<typeof gtmContactSchema>;
export type GtmOpportunityInput = z.infer<typeof gtmOpportunitySchema>;
export type GtmSupportCaseInput = z.infer<typeof gtmSupportCaseSchema>;
export type GtmWorkItemInput = z.infer<typeof gtmWorkItemSchema>;
