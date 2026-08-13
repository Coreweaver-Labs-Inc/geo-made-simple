import type { QueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { TRPCError, type inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../server/routers";
import { trpc } from "@/lib/trpc";
import { fallbackInsights } from "@/lib/insightContent";
import { getAuthorBySlug } from "@/lib/authors";

export type HeadMeta = { title: string; description: string; ogType?: "website" | "article"; ogImage?: string; ogImageAlt?: string; canonicalPath?: string; publishedTime?: string; noindex?: boolean; notFound?: boolean };
type RouterOutput = inferRouterOutputs<AppRouter>;
export type SsrPrefetch = { insightBySlug: (slug: string) => Promise<RouterOutput["insights"]["bySlug"]>; insightsListPublic: () => Promise<RouterOutput["insights"]["listPublic"]> };

const SITE = "Coreweaver Labs";
const DESCRIPTION = "Coreweaver Labs builds GEO infrastructure that helps credible companies become clearer, more consistent, and more citable in AI search.";
const image = "/manus-storage/coreweaver-hero_eb9a774a.jpg";
const imageAlt = "Abstract woven lattice representing connected brand signals";
const seed = (queryClient: QueryClient, key: unknown, data: unknown) => queryClient.setQueryData(key as any, data as any);

export async function prefetchForPath(url: string, queryClient: QueryClient, prefetch: SsrPrefetch): Promise<HeadMeta> {
  let path = url.split("?")[0];
  try { path = decodeURI(path); } catch { /* retain raw path */ }
  const clean = path.replace(/\/+$/, "") || "/";
  if (clean === "/") return { title: "Coreweaver Labs — Make your brand easier for AI to understand.", description: DESCRIPTION, ogImage: image, ogImageAlt: imageAlt, canonicalPath: "/" };
  if (clean === "/framework") return { title: "The ARM Framework | Coreweaver Labs", description: "Learn how the ARM Framework connects authority, representation, and measurement to create a clearer brand signal for AI search.", ogImage: "/manus-storage/coreweaver-framework_2cadabec.jpg", ogImageAlt: "Diagram of the ARM Framework's connected evidence and signal layers", canonicalPath: clean };
  if (clean === "/products") return { title: "GEO Signal Products | Coreweaver Labs", description: "Explore Coreweaver Labs' practical GEO signal architecture, citation intelligence, and knowledge systems services.", ogImage: "/manus-storage/coreweaver-products_9a7c53f2.jpg", ogImageAlt: "Abstract view of Coreweaver Labs signal products and systems", canonicalPath: clean };
  if (clean === "/insights") return { title: "Insights on GEO and AI Representation | Coreweaver Labs", description: "Practical perspectives on GEO, AI answer visibility, brand representation, and the systems that make trusted information easier to understand.", canonicalPath: clean };
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
