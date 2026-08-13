import { ArrowLeft } from "lucide-react";
import { useParams } from "wouter";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { fallbackInsights, formatInsightDate } from "@/lib/insightContent";
import { trpc } from "@/lib/trpc";

export default function InsightDetail() {
  const { slug } = useParams<{ slug: string }>();
  const fallback = fallbackInsights.find(article => article.slug === slug);
  const query = trpc.insights.bySlug.useQuery({ slug: slug || "" }, { enabled: Boolean(slug && !fallback), retry: false });
  const article = query.data ? { ...query.data, content: query.data.content.split("\n\n") } : fallback;

  if (!article && query.isLoading) return <MarketingShell><main className="section-pad"><p className="page-kicker">Loading insight…</p></main></MarketingShell>;
  if (!article) return <MarketingShell><main className="section-pad"><SectionLabel>Insights</SectionLabel><h1>That note is not available.</h1><a className="text-link" href="/insights"><ArrowLeft size={15} /> Back to Insights</a></main></MarketingShell>;

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    url: `https://coreweaverlabs.com/insights/${article.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://coreweaverlabs.com/insights/${article.slug}` },
    datePublished: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    dateModified: article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
    articleSection: article.category,
    inLanguage: "en-US",
    image: "https://coreweaverlabs.com/manus-storage/coreweaver-hero_eb9a774a.jpg",
    author: { "@type": "Organization", "@id": "https://coreweaverlabs.com/#organization", name: "Coreweaver Labs" },
    publisher: { "@type": "Organization", "@id": "https://coreweaverlabs.com/#organization", name: "Coreweaver Labs", logo: { "@type": "ImageObject", url: "https://coreweaverlabs.com/manus-storage/coreweaver-mark_e04a456c.png" } },
  }).replace(/</g, "\\u003c");

  return (
    <MarketingShell>
      <SeoHead title={`${article.title} | Coreweaver Labs`} description={article.excerpt} path={`/insights/${article.slug}`} ogType="article" />
      <main>
        <article className="article-page section-pad"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} /><a className="back-link" href="/insights"><ArrowLeft size={15} /> All insights</a><SectionLabel>{article.category}</SectionLabel><p className="page-kicker">{formatInsightDate(article.publishedAt)}</p><h1>{article.title}</h1><p className="article-excerpt">{article.excerpt}</p><div className="article-body">{article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article>
      </main>
    </MarketingShell>
  );
}
