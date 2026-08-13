import { ArrowLeft, ArrowUpRight, Linkedin } from "lucide-react";
import { useParams } from "wouter";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { fallbackInsights, formatInsightDate } from "@/lib/insightContent";
import { trpc } from "@/lib/trpc";
import { createArticleShareUrls } from "@/lib/articleSharing";
import { getAuthorByName, getAuthorHref } from "@/lib/authors";

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
    author: getAuthorByName(article.author) ? { "@type": "Person", "@id": `https://coreweaverlabs.com/authors/${getAuthorByName(article.author)?.slug}#person`, name: article.author } : { "@type": "Organization", "@id": "https://coreweaverlabs.com/#organization", name: article.author },
    publisher: { "@type": "Organization", "@id": "https://coreweaverlabs.com/#organization", name: "Coreweaver Labs", logo: { "@type": "ImageObject", url: "https://coreweaverlabs.com/manus-storage/coreweaver-mark_e04a456c.png" } },
  }).replace(/</g, "\\u003c");
  const shareUrls = createArticleShareUrls(article.slug, article.title);
  const authorHref = getAuthorHref(article.author);

  return (
    <MarketingShell>
      <SeoHead title={`${article.title} | Coreweaver Labs`} description={article.excerpt} path={`/insights/${article.slug}`} ogType="article" />
      <main>
        <article className="article-page section-pad"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} /><a className="back-link" href="/insights"><ArrowLeft size={15} /> All insights</a><SectionLabel>{article.category}</SectionLabel><p className="page-kicker">{formatInsightDate(article.publishedAt)}</p><p className="article-byline">Written by {authorHref ? <a href={authorHref}>{article.author}</a> : article.author}</p><h1>{article.title}</h1><p className="article-excerpt">{article.excerpt}</p><nav className="article-share" aria-label="Share this insight"><span>Share</span><a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Share “${article.title}” on LinkedIn`}><Linkedin size={15} aria-hidden="true" /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a><a href={shareUrls.x} target="_blank" rel="noopener noreferrer" aria-label={`Share “${article.title}” on X`}><b aria-hidden="true">X</b> X <ArrowUpRight size={12} aria-hidden="true" /></a></nav><div className="article-body">{article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article>
      </main>
    </MarketingShell>
  );
}
