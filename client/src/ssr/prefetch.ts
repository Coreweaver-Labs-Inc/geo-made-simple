import type { QueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { TRPCError, type inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../server/routers";
import { trpc } from "@/lib/trpc";
import { fallbackInsights } from "@/lib/insightContent";
import { getAuthorBySlug } from "@/lib/authors";
import { getChildTopic, getTopic } from "@/lib/topicContent";

export type HeadMeta = { title: string; description: string; keywords?: string[]; ogType?: "website" | "article"; ogImage?: string; ogImageAlt?: string; canonicalPath?: string; publishedTime?: string; noindex?: boolean; notFound?: boolean };
type RouterOutput = inferRouterOutputs<AppRouter>;
export type SsrPrefetch = { insightBySlug: (slug: string) => Promise<RouterOutput["insights"]["bySlug"]>; insightsListPublic: () => Promise<RouterOutput["insights"]["listPublic"]>; caseStudyBySlug: (slug: string) => Promise<RouterOutput["caseStudies"]["bySlug"]> };

const SITE = "Coreweaver Labs";
const DESCRIPTION = "Coreweaver Labs builds GEO infrastructure that helps credible companies become clearer, more consistent, and more citable in AI search.";
const image = "/manus-storage/coreweaver-hero-identity_7f2f7654.jpg";
const imageAlt = "Abstract architectural weave representing a brand becoming clearer to search and AI systems.";
const seed = (queryClient: QueryClient, key: unknown, data: unknown) => queryClient.setQueryData(key as any, data as any);

export async function prefetchForPath(url: string, queryClient: QueryClient, prefetch: SsrPrefetch): Promise<HeadMeta> {
  let path = url.split("?")[0];
  try { path = decodeURI(path); } catch { /* retain raw path */ }
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/") return { title: "Coreweaver Labs — Make your brand easier for AI to understand.", description: DESCRIPTION, keywords: ["mid-market B2B growth", "B2B SEO", "B2B Content Marketing", "B2B Paid Ads", "AI representation", "content governance"], ogImage: image, ogImageAlt: imageAlt, canonicalPath: "/" };
  if (clean === "/framework") return { title: "The ARM Framework | Coreweaver Labs", description: "Learn how the ARM Framework connects authority, representation, and measurement to create a clearer brand signal for AI search.", ogImage: "/manus-storage/coreweaver-framework-method-v2_88c0f3a5.jpg", ogImageAlt: "A measured evidence plane representing the Authority, Representation, and Measurement framework.", canonicalPath: clean };
  if (clean === "/services") return { title: "SEO, Content Marketing & Paid Ads for Mid-Market B2B | Coreweaver Labs", description: "Evidence-led SEO, Content Marketing, and Paid Ads services for mid-market B2B teams, with transparent starting prices and a private support path.", canonicalPath: clean };
  if (clean === "/products") return { title: "GEO Signal Products | Coreweaver Labs", description: "Explore Coreweaver Labs' practical GEO signal architecture, citation intelligence, and knowledge systems services.", ogImage: "/manus-storage/coreweaver-products-clarity-v2_36185701.jpg", ogImageAlt: "Three precision tools representing connected SEO, content, and paid media systems.", canonicalPath: clean };
  if (clean === "/insights") return { title: "Insights on GEO and AI Representation | Coreweaver Labs", description: "Practical perspectives on GEO, AI answer visibility, brand representation, and the systems that make trusted information easier to understand.", canonicalPath: clean };
  if (clean === "/research") return { title: "Research Methods and Editorial Standards | Coreweaver Labs", description: "How Coreweaver Labs develops sourceable mid-market B2B research, reviews claims, attributes authorship, and publishes useful thought leadership.", canonicalPath: clean };
  if (clean === "/method") return { title: "The Coreweaver Method | Evidence-Led Content Systems", description: "How Coreweaver Labs turns B2B buyer questions into connected, source-aware, review-gated content systems without autonomous public publishing.", keywords: ["evidence-led content systems", "B2B content architecture", "internal linking methodology", "source governance", "AI visibility methodology", "content silo strategy"], ogImage: "/manus-storage/evidence-system_92224224.png", ogImageAlt: "An architectural evidence network connecting organization, sources, records, and publications.", canonicalPath: clean };
  if (clean === "/ai-data-policy") return { title: "AI Data Policy | Coreweaver Labs", description: "How Coreweaver Labs permits AI crawlers to use public content for search and answer retrieval, while restricting model training, bulk reuse, and protected information.", canonicalPath: clean };
  if (clean === "/faq") return { title: "FAQ | Coreweaver Labs", description: "Answers to common questions about Coreweaver Labs, its mid-market B2B SEO, Content Marketing, and Paid Ads services, AI governance, research, proof, and support.", canonicalPath: clean };
  if (clean === "/topics") return { title: "B2B Growth Topics | Coreweaver Labs", description: "Evidence-led mid-market B2B topics covering SEO, Content Marketing, Paid Ads, AI representation, and content governance.", canonicalPath: clean };
  if (clean === "/case-studies") return { title: "Evidence-Led Case Studies | Coreweaver Labs", description: "Coreweaver Labs publishes case studies only when scope, source evidence, reporting windows, review dates, and written authorization are complete.", canonicalPath: clean };
  if (clean === "/case-studies/governance-preview") return { title: "Case Study Governance Preview | Coreweaver Labs", description: "A non-publishable layout preview for evidence-led, authorized case-study records.", canonicalPath: clean, noindex: true };
  if (clean === "/case-study-intake") return { title: "Case Study Evidence Intake | Coreweaver Labs", description: "Private client intake for approved case-study evidence and publication authorization.", canonicalPath: clean, noindex: true };
  if (clean === "/workspace") return { title: SITE, description: DESCRIPTION, noindex: true };
  const caseStudyMatch = clean.match(/^\/case-studies\/([^/]+)$/);
  if (caseStudyMatch) {
    if (caseStudyMatch[1] === "governance-preview") return { title: "Case Study Governance Preview | Coreweaver Labs", description: "A non-publishable layout preview for evidence-led, authorized case-study records.", canonicalPath: clean, noindex: true };
    try {
      const record = await prefetch.caseStudyBySlug(caseStudyMatch[1]);
      seed(queryClient, getQueryKey(trpc.caseStudies.bySlug, { slug: caseStudyMatch[1] }, "query"), record);
      return { title: `${record.title} | Coreweaver Labs`, description: record.supportableFinding, ogType: "article", canonicalPath: clean, publishedTime: record.publishedAt?.toISOString() };
    } catch (error) {
      if (error instanceof TRPCError && error.code === "NOT_FOUND") return { title: SITE, description: DESCRIPTION, notFound: true };
      return { title: `Case Study | ${SITE}`, description: DESCRIPTION, canonicalPath: clean, noindex: true };
    }
  }
  const childTopicMatch = clean.match(/^\/topics\/([^/]+)\/([^/]+)$/);
  if (childTopicMatch) {
    const topic = getChildTopic(childTopicMatch[1], childTopicMatch[2]);
    if (!topic) return { title: SITE, description: DESCRIPTION, notFound: true };
    return { title: `${topic.title} | Coreweaver Labs`, description: topic.description, keywords: topic.searchTerms, canonicalPath: clean };
  }
  const topicMatch = clean.match(/^\/topics\/([^/]+)$/);
  if (topicMatch) {
    const topic = getTopic(topicMatch[1]);
    if (!topic) return { title: SITE, description: DESCRIPTION, notFound: true };
    return { title: `${topic.title} | Coreweaver Labs`, description: topic.description, canonicalPath: clean };
  }
  if (clean === "/contact") return { title: "Contact Coreweaver Labs | Signal Audit", description: "Start a conversation with Coreweaver Labs about a practical signal audit, GEO infrastructure, or AI representation systems.", canonicalPath: clean };
  if (clean === "/studio") return { title: SITE, description: DESCRIPTION, noindex: true };
  const authorMatch = clean.match(/^\/authors\/([^/]+)$/);
  if (authorMatch) {
    const author = getAuthorBySlug(authorMatch[1]);
    if (!author) return { title: SITE, description: DESCRIPTION, notFound: true };
    const articles = await prefetch.insightsListPublic();
    seed(queryClient, getQueryKey(trpc.insights.listPublic, undefined, "query"), articles);
    return { title: `${author.name} | Coreweaver Labs`, description: author.shortBio, canonicalPath: clean };
  }
  const articleMatch = clean.match(/^\/insights\/([^/]+)$/);
  if (articleMatch) {
    const slug = articleMatch[1];
    const fallback = fallbackInsights.find(article => article.slug === slug);
    if (fallback) return { title: `${fallback.title} | Coreweaver Labs`, description: fallback.excerpt, ogType: "article", canonicalPath: clean, publishedTime: new Date(fallback.publishedAt).toISOString() };
    try {
      const article = await prefetch.insightBySlug(slug);
      seed(queryClient, getQueryKey(trpc.insights.bySlug, { slug }, "query"), article);
      return { title: `${article.title} | Coreweaver Labs`, description: article.excerpt, ogType: "article", canonicalPath: clean, publishedTime: article.publishedAt?.toISOString() };
    } catch (error) {
      if (error instanceof TRPCError && error.code === "NOT_FOUND") return { title: SITE, description: DESCRIPTION, notFound: true };
      return { title: `Insight | ${SITE}`, description: DESCRIPTION, canonicalPath: clean, noindex: true };
    }
  }
  return { title: SITE, description: DESCRIPTION, notFound: true };
}
