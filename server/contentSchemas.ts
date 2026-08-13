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

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
export type InsightDraftInput = z.infer<typeof insightDraftSchema>;
