import { ArrowLeft, ArrowUpRight } from "lucide-react";
import React from "react";
import { useParams } from "wouter";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { getTopic, topics } from "@/lib/topicContent";
import NotFound from "./NotFound";

export default function TopicDetail() {
  const { slug } = useParams<{ slug: string }>();
  const topic = getTopic(slug);
  if (!topic) return <NotFound />;
  const relatedTopics = topic.relatedTopicSlugs.map(getTopic).filter((value): value is NonNullable<typeof value> => Boolean(value));
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "WebPage",
      "@id": `https://coreweaverlabs.com/topics/${topic.slug}#webpage`,
      url: `https://coreweaverlabs.com/topics/${topic.slug}`,
      name: `${topic.title} | Coreweaver Labs`,
      description: topic.description,
      isPartOf: { "@id": "https://coreweaverlabs.com/#website" },
      inLanguage: "en-US",
    }, {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://coreweaverlabs.com/" }, { "@type": "ListItem", position: 2, name: "B2B Growth Topics", item: "https://coreweaverlabs.com/topics" }, { "@type": "ListItem", position: 3, name: topic.label, item: `https://coreweaverlabs.com/topics/${topic.slug}` }],
    }],
  }).replace(/</g, "\\u003c");

  return <MarketingShell><SeoHead title={`${topic.title} | Coreweaver Labs`} description={topic.description} path={`/topics/${topic.slug}`} /><main className="topic-detail-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    <section className="topic-detail-hero section-pad"><a className="back-link" href="/topics"><ArrowLeft size={15} /> All B2B Growth Topics</a><SectionLabel>{topic.label}</SectionLabel><p className="page-kicker">{topic.kicker}</p><h1>{topic.title}</h1><p className="page-lede">{topic.description}</p></section>
    <section className="topic-problem section-pad section-rule"><div><SectionLabel>The buyer problem</SectionLabel><h2>Start with the practical source of friction.</h2></div><p className="large-copy">{topic.buyerProblem}</p></section>
    <section className="topic-method section-pad section-rule"><div className="topic-method-copy"><SectionLabel>The Coreweaver approach</SectionLabel><h2>Make the work easier to review and maintain.</h2><p>{topic.approach}</p><a className="text-link" href={topic.serviceLink.href}>{topic.serviceLink.label} <ArrowUpRight size={15} /></a></div><div className="topic-includes"><span>What a useful system includes</span><ol>{topic.includes.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></li>)}</ol></div></section>
    <section className="topic-resources section-pad section-rule"><div><SectionLabel>Related public resources</SectionLabel><h2>Read the method, not a marketing promise.</h2><p>These references explain the adjacent system, public standard, or practical question behind this topic.</p></div><ul>{topic.relatedResources.map((resource) => <li key={resource.href}><a href={resource.href}>{resource.label} <ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul></section>
    <section className="topic-boundary section-pad section-rule"><SectionLabel>What this does not promise</SectionLabel><h2>Clear boundaries make the work more useful.</h2><p>{topic.boundary}</p></section>
    <section className="topic-related section-pad section-rule"><div><SectionLabel>Continue the learning path</SectionLabel><h2>Related B2B growth topics</h2></div><div className="topic-related-links">{relatedTopics.map((related) => <a key={related.slug} href={`/topics/${related.slug}`}><span>{related.label}</span><b>{related.title}</b><ArrowUpRight size={16} aria-hidden="true" /></a>)}</div></section>
    <section className="topic-cta section-pad section-rule"><div><SectionLabel>Private next step</SectionLabel><h2>Bring the working question, not a finished brief.</h2><p>Use a private request to share the service decision or operating problem you are trying to resolve. A person reviews the context before any internal record or engagement is created.</p></div><a className="button button-primary" href="/contact">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></a></section>
  </main></MarketingShell>;
}
