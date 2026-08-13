import { ArrowUpRight } from "lucide-react";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { fallbackInsights, formatInsightDate } from "@/lib/insightContent";
import { trpc } from "@/lib/trpc";

type InsightListItem = { slug: string; title: string; excerpt: string; category: string; publishedAt: Date | string | null };

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
        <section className="insight-list section-pad section-rule" aria-label="Latest insights">{articles.map((article, index) => <article className="insight-card" key={article.slug}><div className="insight-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{article.category}</span><span>{formatInsightDate(article.publishedAt)}</span></div><h2><a href={`/insights/${article.slug}`}>{article.title}</a></h2><p>{article.excerpt}</p><a className="text-link" href={`/insights/${article.slug}`}>Read insight <ArrowUpRight size={15} /></a></article>)}</section>
        <section className="insights-substack section-pad section-rule"><div><SectionLabel>Longer-form research</SectionLabel><h2>Follow the signal beyond the index.</h2><p>For extended notes, working ideas, and the thinking that informs our practice, read the COREWEAVER publication on Substack.</p></div><a className="button button-primary" href="https://coreweaverlabs.substack.com/" target="_blank" rel="noopener noreferrer">Read on Substack <ArrowUpRight size={16} aria-hidden="true" /></a></section>
      </main>
    </MarketingShell>
  );
}
