import { ArrowUpRight } from "lucide-react";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { getAuthorHref } from "@/lib/authors";
import { fallbackInsights, formatInsightDate } from "@/lib/insightContent";
import { trpc } from "@/lib/trpc";

type InsightListItem = { slug: string; title: string; excerpt: string; category: string; author: string; publishedAt: Date | string | null };

export default function Insights() {
  const result = trpc.insights.listPublic.useQuery(undefined, { retry: false });
  const published: InsightListItem[] = result.data ?? [];
  const databaseSlugs = new Set(published.map(article => article.slug));
  const articles: InsightListItem[] = [...published, ...fallbackInsights.filter(article => !databaseSlugs.has(article.slug))];
  return (
    <MarketingShell>
      <SeoHead title="Insights on GEO and AI Representation | Coreweaver Labs" description="Practical perspectives on GEO, AI answer visibility, brand representation, and the systems that make trusted information easier to understand." path="/insights" />
      <main>
        <section className="page-hero section-pad"><SectionLabel>Insights</SectionLabel><p className="page-kicker">Notes on practical AI representation</p><h1>Ideas for making a signal easier to understand.</h1><p className="page-lede">A growing library of working notes on GEO, evidence, measurement, and the habits that make trustworthy information easier to maintain.</p></section>
        <section className="insight-list section-pad section-rule" aria-label="Latest insights">{articles.map((article, index) => { const authorHref = getAuthorHref(article.author); return <article className="insight-card" key={article.slug}><div className="insight-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{article.category}</span><span>{formatInsightDate(article.publishedAt)}</span></div><p className="insight-byline">By {authorHref ? <a href={authorHref}>{article.author}</a> : article.author}</p><h2><a href={`/insights/${article.slug}`}>{article.title}</a></h2><p>{article.excerpt}</p><a className="text-link" href={`/insights/${article.slug}`}>Read insight <ArrowUpRight size={15} /></a></article>; })}</section>
        <section className="insights-substack section-pad section-rule"><div><SectionLabel>Longer-form research</SectionLabel><h2>Follow the signal beyond the index.</h2><p>See how Coreweaver Labs reviews sources, authorship, claims, and corrections before publishing research—or read extended notes and working ideas on Substack.</p></div><div className="insights-actions"><a className="button button-secondary" href="/research">Research methods <ArrowUpRight size={16} aria-hidden="true" /></a><a className="button button-primary" href="https://coreweaverlabs.substack.com/" target="_blank" rel="noopener noreferrer">Read on Substack <ArrowUpRight size={16} aria-hidden="true" /></a></div></section>
      </main>
    </MarketingShell>
  );
}
