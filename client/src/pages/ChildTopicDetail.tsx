import { ArrowLeft, ArrowUpRight, Linkedin } from "lucide-react";
import React from "react";
import { useParams } from "wouter";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { getChildTopic, getTopic } from "@/lib/topicContent";
import { createPageShareUrls } from "@/lib/articleSharing";
import NotFound from "./NotFound";

export default function ChildTopicDetail() {
  const { pillar, child } = useParams<{ pillar: string; child: string }>();
  const parent = getTopic(pillar);
  const topic = getChildTopic(pillar, child);
  if (!parent || !topic) return <NotFound />;

  const path = `/topics/${topic.parentSlug}/${topic.slug}`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "WebPage",
      "@id": `https://coreweaverlabs.com${path}#webpage`,
      url: `https://coreweaverlabs.com${path}`,
      name: `${topic.title} | Coreweaver Labs`,
      description: topic.description,
      keywords: topic.searchTerms.join(", "),
      about: [{ "@type": "Thing", name: topic.label }, { "@type": "Thing", name: parent.label }],
      mainEntity: { "@type": "ItemList", name: `Related resources for ${topic.label}`, itemListElement: topic.relatedResources.map((resource, index) => ({ "@type": "ListItem", position: index + 1, name: resource.label, url: `https://coreweaverlabs.com${resource.href}` })) },
      isPartOf: { "@id": "https://coreweaverlabs.com/#website" },
      inLanguage: "en-US",
    }, {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://coreweaverlabs.com/" }, { "@type": "ListItem", position: 2, name: "B2B Growth Topics", item: "https://coreweaverlabs.com/topics" }, { "@type": "ListItem", position: 3, name: parent.label, item: `https://coreweaverlabs.com/topics/${parent.slug}` }, { "@type": "ListItem", position: 4, name: topic.label, item: `https://coreweaverlabs.com${path}` }],
    }],
  }).replace(/</g, "\\u003c");
  const shareUrls = createPageShareUrls(path, topic.title);

  return <MarketingShell><SeoHead title={`${topic.title} | Coreweaver Labs`} description={topic.description} keywords={topic.searchTerms} path={path} /><main className="topic-detail-page child-topic-detail-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    <section className="topic-detail-hero section-pad"><a className="back-link" href={`/topics/${parent.slug}`}><ArrowLeft size={15} /> {parent.label}</a><SectionLabel>{parent.label}</SectionLabel><p className="page-kicker">{topic.kicker}</p><h1>{topic.title}</h1><p className="page-lede">{topic.description}</p></section>
    <section className="topic-problem section-pad section-rule"><div><SectionLabel>The buyer problem</SectionLabel><h2>Start with the source of friction.</h2></div><p className="large-copy">{topic.buyerProblem}</p></section>
    <section className="topic-decision section-pad section-rule"><SectionLabel>The working decision</SectionLabel><h2>Clarify what this page needs to help a reader decide.</h2><p>{topic.decision}</p></section>
    <section className="topic-method section-pad section-rule"><div className="topic-method-copy"><SectionLabel>The Coreweaver approach</SectionLabel><h2>Build a more connected explanation.</h2><p>{topic.approach}</p><a className="text-link" href={topic.serviceLink.href}>{topic.serviceLink.label} <ArrowUpRight size={15} /></a></div><div className="topic-includes"><span>What the review can include</span><ol>{topic.includes.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, "0")}</b><p>{item}</p></li>)}</ol></div></section>
    <section className="topic-resources section-pad section-rule"><div><SectionLabel>Continue with useful context</SectionLabel><h2>Read the related method and evidence standard.</h2><p>These public resources explain the adjacent operating system, a practical review question, or the standard for supportable work.</p></div><div><ul>{topic.relatedResources.map((resource) => <li key={resource.href}><a href={resource.href}>{resource.label} <ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul><nav className="article-share child-topic-share" aria-label={`Share ${topic.title}`}><span>Share this guide</span><a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Share “${topic.title}” on LinkedIn`}><Linkedin size={15} aria-hidden="true" /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a><a href={shareUrls.x} target="_blank" rel="noopener noreferrer" aria-label={`Share “${topic.title}” on X`}><b aria-hidden="true">X</b> X <ArrowUpRight size={12} aria-hidden="true" /></a><a href={shareUrls.reddit} target="_blank" rel="noopener noreferrer" aria-label={`Submit “${topic.title}” to Reddit`}><b aria-hidden="true">r/</b> Reddit <ArrowUpRight size={12} aria-hidden="true" /></a></nav></div></section>
    <section className="topic-boundary section-pad section-rule"><SectionLabel>What this does not promise</SectionLabel><h2>Clear boundaries keep the guidance useful.</h2><p>{topic.boundary}</p></section>
    <section className="topic-cta section-pad section-rule"><div><SectionLabel>Private next step</SectionLabel><h2>Bring the working question, not a completed answer.</h2><p>Use a private request to share the information or buyer-decision problem you are trying to resolve. A person reviews the context before an internal record or engagement is created.</p></div><a className="button button-primary" href="/contact">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></a></section>
  </main></MarketingShell>;
}
