import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useParams } from "wouter";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { getAuthorBySlug } from "@/lib/authors";
import { fallbackInsights, formatInsightDate } from "@/lib/insightContent";
import { trpc } from "@/lib/trpc";

type InsightListItem = { slug: string; title: string; excerpt: string; category: string; author: string; publishedAt: Date | string | null };

export default function AuthorProfile() {
  const { slug } = useParams<{ slug: string }>();
  const author = getAuthorBySlug(slug);
  const result = trpc.insights.listPublic.useQuery(undefined, { retry: false, enabled: Boolean(author) });

  if (!author) return <MarketingShell><main className="section-pad"><SectionLabel>Authors</SectionLabel><h1>That author profile is not available.</h1><a className="text-link" href="/insights"><ArrowLeft size={15} /> Back to Insights</a></main></MarketingShell>;

  const published: InsightListItem[] = result.data ?? [];
  const databaseSlugs = new Set(published.map(article => article.slug));
  const articles: InsightListItem[] = [...published, ...fallbackInsights.filter(article => !databaseSlugs.has(article.slug))].filter(article => article.author === author.name);
  const profileSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://coreweaverlabs.com/authors/${author.slug}#person`,
    name: author.name,
    url: `https://coreweaverlabs.com/authors/${author.slug}`,
    jobTitle: author.role,
    description: author.shortBio,
    worksFor: { "@type": "Organization", "@id": "https://coreweaverlabs.com/#organization", name: "Coreweaver Labs" },
    knowsAbout: author.expertise,
  }).replace(/</g, "\\u003c");

  return (
    <MarketingShell>
      <SeoHead title={`${author.name} | Coreweaver Labs`} description={author.shortBio} path={`/authors/${author.slug}`} />
      <main>
        <section className="author-profile section-pad"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: profileSchema }} /><a className="back-link" href="/insights"><ArrowLeft size={15} /> All insights</a><div className="author-profile-grid"><div className="author-monogram" aria-hidden="true">{author.initials}</div><div><SectionLabel>Author</SectionLabel><p className="page-kicker">{author.role}</p><h1>{author.name}</h1><p className="author-bio">{author.bio}</p><div className="author-expertise" aria-label={`${author.name}'s expertise`}>{author.expertise.map(item => <span key={item}>{item}</span>)}</div><div className="author-authority"><span>Coreweaver Labs channels</span><div>{author.authorityLinks.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={12} aria-hidden="true" /></a>)}</div></div></div></div></section>
        <section className="author-articles section-pad section-rule" aria-labelledby="author-articles-heading"><SectionLabel>Published insights</SectionLabel><h2 id="author-articles-heading">Notes by {author.name.split(" ")[0]}.</h2>{articles.length > 0 ? <div className="author-article-list">{articles.map(article => <article key={article.slug}><div><p className="insight-meta"><span>{article.category}</span><span>{formatInsightDate(article.publishedAt)}</span></p><h3><a href={`/insights/${article.slug}`}>{article.title}</a></h3><p>{article.excerpt}</p></div><a className="text-link" href={`/insights/${article.slug}`}>Read insight <ArrowUpRight size={15} /></a></article>)}</div> : <p className="author-empty">Published notes will appear here as they are released.</p>}</section>
      </main>
    </MarketingShell>
  );
}
