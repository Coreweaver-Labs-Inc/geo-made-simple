import { invokeLLM, listLLMModels } from "./_core/llm";

export type SupportRoute = "sales" | "support";
export type SupportService = "seo" | "content_marketing" | "paid_ads" | "not_sure";

export type SupportAssistantReply = {
  reply: string;
  recommendedPath: SupportRoute;
  recommendedService: SupportService;
  urgency: "standard" | "high";
  summary: string;
};

type SupportRouting = Omit<SupportAssistantReply, "reply">;

const serviceNames: Record<SupportService, string> = {
  seo: "SEO",
  content_marketing: "Content Marketing",
  paid_ads: "Paid Ads",
  not_sure: "the appropriate service",
};

function approvedReply(route: SupportRouting): string {
  if (route.recommendedPath === "sales") {
    return `Thanks for the context. This appears to be a ${serviceNames[route.recommendedService]} sales inquiry. Please continue to the private sales form below; a Coreweaver Labs team member will review it before any sales record is created.`;
  }
  return "Thanks for the context. This appears to need customer-support review. Please continue to the private support form below; a Coreweaver Labs team member will review it before any support record or assignment is created.";
}

const fallbackRouting: SupportRouting = {
  recommendedPath: "support",
  recommendedService: "not_sure",
  urgency: "standard",
  summary: "Initial inquiry requires human review.",
};

const toReply = (route: SupportRouting): SupportAssistantReply => ({ ...route, summary: "Initial routing recommendation; human review required.", reply: approvedReply(route) });

function readText(value: string | unknown[]): string {
  return typeof value === "string" ? value : "";
}

function isRouting(value: unknown): value is SupportRouting {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.summary === "string" && ["sales", "support"].includes(String(candidate.recommendedPath)) && ["seo", "content_marketing", "paid_ads", "not_sure"].includes(String(candidate.recommendedService)) && ["standard", "high"].includes(String(candidate.urgency));
}

export async function guideSupportInquiry(input: { message: string; requestType: "service_inquiry" | "support_request"; serviceInterest?: SupportService }): Promise<SupportAssistantReply> {
  try {
    const models = await listLLMModels();
    const model = models.data.find(item => item.id === "gpt-5-mini")?.id || models.data[0]?.id;
    if (!model) return toReply(fallbackRouting);
    const response = await invokeLLM({
      model,
      messages: [
        {
          role: "system",
          content: "Classify this Coreweaver Labs inquiry for human routing. Return JSON only. Route sales for SEO, Content Marketing, Paid Ads, a new engagement, scope, or pricing. Route support for an existing engagement or delivery need. Do not provide advice, policies, promises, or a customer-facing response. Do not infer urgency as high unless the user explicitly describes an urgent operational blocker. Never request or repeat passwords, credentials, payment details, or confidential client materials."
        },
        {
          role: "user",
          content: `Request type: ${input.requestType}\nSelected service: ${input.serviceInterest || "not_sure"}\nUser message: ${input.message}`
        }
      ],
      responseFormat: {
        type: "json_schema",
        json_schema: {
          name: "support_routing",
          strict: true,
          schema: {
            type: "object",
            properties: {
              recommendedPath: { type: "string", enum: ["sales", "support"] },
              recommendedService: { type: "string", enum: ["seo", "content_marketing", "paid_ads", "not_sure"] },
              urgency: { type: "string", enum: ["standard", "high"] },
              summary: { type: "string" }
            },
            required: ["recommendedPath", "recommendedService", "urgency", "summary"],
            additionalProperties: false
          }
        }
      }
    });
    const parsed: unknown = JSON.parse(readText(response.choices[0]?.message.content));
    if (!isRouting(parsed)) return toReply(fallbackRouting);
    return toReply({ ...parsed, summary: parsed.summary.slice(0, 400) });
  } catch (error) {
    console.error("[SupportAssistant] Unable to provide AI routing guidance", error);
    return toReply(fallbackRouting);
  }
}
