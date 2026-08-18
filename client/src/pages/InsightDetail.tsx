import React from "react";
import { ArrowLeft, ArrowUpRight, Linkedin } from "lucide-react";
import { useParams } from "wouter";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { fallbackInsights, formatInsightDate } from "@/lib/insightContent";
import { trpc } from "@/lib/trpc";
import { createArticleShareUrls } from "@/lib/articleSharing";
import { getAuthorByName, getAuthorHref } from "@/lib/authors";

function sourceLines(sourceReferences: string | null | undefined) {
  return (sourceReferences || "").split(/\n+/).map(reference => reference.trim()).filter(Boolean);
}

function asExternalUrl(reference: string) {
  try {
    const url = new URL(reference);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

type RelatedInsightResource = { title: string; href: string; description: string };
type RelatedInsightResourceSet = { heading: string; description: string; resources: RelatedInsightResource[] };

const relatedInsightResources: Record<string, RelatedInsightResourceSet> = {
  "useful-resource-route-not-page-pile": {
    heading: "Keep the route connected.",
    description: "This Signal Note is one operating perspective. Use these pages to inspect the decision, method, sources, and relevant service context in more detail.",
    resources: [
      { title: "B2B Growth Topics", href: "/topics", description: "Choose the commercial question that needs a clearer route." },
      { title: "B2B website information architecture", href: "/topics/b2b-seo/website-information-architecture", description: "Apply the route principle to service, evidence, and next-step information." },
      { title: "The Coreweaver Method", href: "/method", description: "Inspect the decision gates, source checks, and review routines behind the note." },
      { title: "Research methods and editorial standards", href: "/research", description: "See the source, authorship, claim-review, and correction standard." },
      { title: "SEO, Content Marketing, and Paid Ads services", href: "/services", description: "Understand where clearer public information can connect to a private service conversation." },
    ],
  },
  "claim-boundary-before-distribution": {
    heading: "Keep the evidence boundary visible.",
    description: "This Signal Note is an editorial operating perspective. Use these pages to inspect claim support, research standards, public proof, and the decision gates behind a responsible next step.",
    resources: [
      { title: "Content governance for B2B growth teams", href: "/topics/content-governance", description: "Inspect the parent system for public claims, sources, ownership, and review routines." },
      { title: "A B2B claim ledger", href: "/topics/content-governance/claim-ledger", description: "Use the blank worksheet to connect a public statement to its current support and limitation." },
      { title: "Research methods and editorial standards", href: "/research", description: "See the source, authorship, claim-review, and correction standard." },
      { title: "Authorized case-study evidence standards", href: "/case-studies", description: "Understand what must be verified before client work can become public proof." },
      { title: "The Coreweaver Method", href: "/method", description: "Inspect the decision gates that shape a public guide before it is released." },
    ],
  },
};

function RelatedInsightResources({ slug }: { slug: string }) {
  const set = relatedInsightResources[slug];
  if (!set) return null;

  return <section className="article-related-resources" aria-labelledby="related-resources-title">
    <SectionLabel>Continue the investigation</SectionLabel>
    <h2 id="related-resources-title">{set.heading}</h2>
    <p>{set.description}</p>
    <ul>{set.resources.map(resource => <li key={resource.href}>
      <a href={resource.href}>{resource.title} <ArrowUpRight size={14} aria-hidden="true" /></a>
      <span>{resource.description}</span>
    </li>)}</ul>
  </section>;
}

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
    image: { "@type": "ImageObject", url: "https://coreweaverlabs.com/manus-storage/coreweaver-hero-identity_7f2f7654.jpg", name: "Identity signal alignment", caption: "Clarity begins when the information around a business can align." },
    author: getAuthorByName(article.author) ? { "@type": "Person", "@id": `https://coreweaverlabs.com/authors/${getAuthorByName(article.author)?.slug}#person`, name: article.author } : { "@type": "Organization", "@id": "https://coreweaverlabs.com/#organization", name: article.author },
    publisher: { "@type": "Organization", "@id": "https://coreweaverlabs.com/#organization", name: "Coreweaver Labs", logo: { "@type": "ImageObject", url: "https://coreweaverlabs.com/manus-storage/coreweaver-mark_e04a456c.png" } },
  }).replace(/</g, "\\u003c");
  const shareUrls = createArticleShareUrls(article.slug, article.title);
  const authorHref = getAuthorHref(article.author);
  const researchDetails = query.data && query.data.contentType !== "article" ? query.data : null;
  const references = sourceLines(researchDetails?.sourceReferences);

  return <MarketingShell>
    <SeoHead title={`${article.title} | Coreweaver Labs`} description={article.excerpt} path={`/insights/${article.slug}`} ogType="article" />
    <main>
      <article className="article-page section-pad">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
        <a className="back-link" href="/insights"><ArrowLeft size={15} /> All insights</a>
        <SectionLabel>{article.category}</SectionLabel>
        <p className="page-kicker">{formatInsightDate(article.publishedAt)}</p>
        <p className="article-byline">Written by {authorHref ? <a href={authorHref}>{article.author}</a> : article.author}</p>
        <h1>{article.title}</h1>
        <p className="article-excerpt">{article.excerpt}</p>
        <nav className="article-share" aria-label="Share this insight">
          <span>Share</span>
          <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Share “${article.title}” on LinkedIn`}><Linkedin size={15} aria-hidden="true" /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
          <a href={shareUrls.x} target="_blank" rel="noopener noreferrer" aria-label={`Share “${article.title}” on X`}><b aria-hidden="true">X</b> X <ArrowUpRight size={12} aria-hidden="true" /></a>
        </nav>
        <div className="article-body">{article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
        <RelatedInsightResources slug={article.slug} />
        {researchDetails && <aside className="article-research-record" aria-label="Research publication record">
          <SectionLabel>{researchDetails.contentType === "research_brief" ? "Research record" : "Field record"}</SectionLabel>
          <h2>How this publication was reviewed</h2>
          <p><b>Method:</b> {researchDetails.methodNote}</p>
          <p><b>Claim review:</b> Confirmed by {researchDetails.claimReviewer} before publication.</p>
          <h3>Source references</h3>
          {references.length ? <ol>{references.map((reference, index) => {
            const url = asExternalUrl(reference);
            return <li key={`${reference}-${index}`}>{url ? <a href={url} target="_blank" rel="noopener noreferrer">{reference}</a> : reference}</li>;
          })}</ol> : <p>Source references are recorded with this publication.</p>}
        </aside>}
      </article>
    </main>
  </MarketingShell>;
}
