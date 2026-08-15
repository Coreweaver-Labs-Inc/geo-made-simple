import { createHash } from "node:crypto";
import { invokeLLM } from "./_core/llm";
import {
  completeContentBriefRecord,
  createGeneratedFieldBrief,
  reserveNextApprovedContentSignal,
} from "./db";
import type { ContentBriefQueue, ContentTrendSignal } from "../drizzle/schema";

type GeneratedDraft = {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  methodNote: string;
};

const siloLabels: Record<ContentTrendSignal["silo"], string> = {
  website_clarity: "Website clarity and B2B SEO",
  buyer_enablement: "Buyer enablement and content marketing",
  paid_message_learning: "Paid-message learning",
  ai_representation: "AI representation",
  content_governance: "Content governance",
};

const draftSchema = {
  name: "private_content_brief_draft",
  strict: true,
  schema: {
    type: "object",
    properties: {
      title: { type: "string" },
      excerpt: { type: "string" },
      content: { type: "string" },
      category: { type: "string" },
      methodNote: { type: "string" },
    },
    required: ["title", "excerpt", "content", "category", "methodNote"],
    additionalProperties: false,
  },
};

function normalizeDraft(value: unknown): GeneratedDraft {
  if (!value || typeof value !== "object") throw new Error("Draft response was not an object");
  const draft = value as Record<string, unknown>;
  const strings = ["title", "excerpt", "content", "category", "methodNote"] as const;
  for (const field of strings) {
    if (typeof draft[field] !== "string" || draft[field].trim().length === 0) {
      throw new Error(`Draft response did not include ${field}`);
    }
  }
  return {
    title: String(draft.title).trim(),
    excerpt: String(draft.excerpt).trim(),
    content: String(draft.content).trim(),
    category: String(draft.category).trim(),
    methodNote: String(draft.methodNote).trim(),
  };
}

function toDraftSlug(title: string, signalId: number) {
  const stem = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 130)
    .replace(/-+$/g, "") || "signal-brief";
  return `${stem}-signal-${signalId}`;
}

function errorCode(error: unknown) {
  const value = String(error).replace(/\s+/g, " ").trim();
  return value.slice(0, 180) || "draft_generation_failed";
}

export function fingerprintContentSignal(input: {
  sourceType: string;
  sourceReference: string;
  silo: string;
  buyerQuestion: string;
  summary: string;
  sourceWindow: string;
}) {
  return createHash("sha256")
    .update([input.sourceType, input.sourceReference, input.silo, input.buyerQuestion, input.summary, input.sourceWindow].map(value => value.trim().toLowerCase()).join("\n"))
    .digest("hex");
}

export async function runNextContentBriefDraft(queue: ContentBriefQueue) {
  const reserved = await reserveNextApprovedContentSignal(queue.id, queue.model);
  if (!reserved) return { status: "skipped" as const, reason: "no_approved_signal" };

  const { signal, recordId } = reserved;
  try {
    const response = await invokeLLM({
      model: queue.model,
      maxTokens: 2600,
      response_format: { type: "json_schema", json_schema: draftSchema },
      messages: [
        {
          role: "system",
          content: "You create private, review-required editorial drafts for Coreweaver Labs. Do not publish, recommend publication, promise outcomes, fabricate sources, use figures not present in the input, claim trends prove demand, or write as though you performed independent research. Write a source-aware field-brief draft with plain-language buyer education, a stated limitation, and no client examples. The draft must remain useful even if no outcome occurs.",
        },
        {
          role: "user",
          content: [
            `Approved editorial silo: ${siloLabels[signal.silo]}.`,
            `Buyer question: ${signal.buyerQuestion}`,
            `Aggregate signal summary: ${signal.summary}`,
            `Source contract: ${signal.sourceType}; ${signal.sourceReference}; observation window ${signal.sourceWindow}.`,
            "Draft a private field brief only. State in the method note that the signal framed an editorial question and is not evidence for any factual or commercial claim. Content must include: a useful framing paragraph, a small inspection method or checklist, a limitation paragraph, and an internal-link recommendation in prose. Do not invent citations or links.",
          ].join("\n\n"),
        },
      ],
    });
    const raw = response.choices[0]?.message.content;
    const draft = normalizeDraft(typeof raw === "string" ? JSON.parse(raw) : raw);
    const draftInsightId = await createGeneratedFieldBrief({
      title: draft.title.slice(0, 180),
      slug: toDraftSlug(draft.title, signal.id),
      excerpt: draft.excerpt.slice(0, 1200),
      content: draft.content.slice(0, 50000),
      category: draft.category.slice(0, 80),
      sourceReferences: signal.sourceReference,
      methodNote: `${draft.methodNote}\n\nSignal contract: ${signal.sourceType}; ${signal.sourceWindow}. The signal is an editorial prompt, not proof of a claim.`,
    });
    await completeContentBriefRecord(recordId, { status: "draft_created", draftInsightId, errorCode: null });
    return { status: "draft_created" as const, signalId: signal.id, recordId, draftInsightId };
  } catch (error) {
    await completeContentBriefRecord(recordId, { status: "failed", draftInsightId: null, errorCode: errorCode(error) });
    return { status: "failed" as const, signalId: signal.id, recordId };
  }
}
