import { ArrowUpRight } from "lucide-react";
import React from "react";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { TopicSearch } from "@/components/TopicSearch";
import { topics } from "@/lib/topicContent";

export default function Topics() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "CollectionPage",
      "@id": "https://coreweaverlabs.com/topics#webpage",
      url: "https://coreweaverlabs.com/topics",
      name: "B2B Growth Topics | Coreweaver Labs",
      description: "Evidence-led mid-market B2B topics covering SEO, Content Marketing, Paid Ads, AI representation, and content governance.",
      isPartOf: { "@id": "https://coreweaverlabs.com/#website" },
      inLanguage: "en-US",
    }, {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://coreweaverlabs.com/" }, { "@type": "ListItem", position: 2, name: "B2B Growth Topics", item: "https://coreweaverlabs.com/topics" }],
    }],
  }).replace(/</g, "\\u003c");

  return <MarketingShell><SeoHead title="B2B Growth Topics | Coreweaver Labs" description="Evidence-led mid-market B2B topics covering SEO, Content Marketing, Paid Ads, AI representation, and content governance." path="/topics" /><main className="topics-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    <section className="topics-hero section-pad" aria-labelledby="topics-title"><SectionLabel>B2B Growth Topics</SectionLabel><p className="page-kicker">A connected learning path</p><h1 id="topics-title">Useful topics for teams building a clearer commercial story.</h1><p className="page-lede">Explore the systems behind evidence-led SEO, Content Marketing, Paid Ads, AI representation, and content governance. Each topic begins with a practical buyer problem and connects to real public resources—not outcome claims.</p></section>
    <div className="section-pad"><TopicSearch /></div>
    <section className="topics-grid section-pad section-rule" aria-labelledby="topics-grid-title"><div className="topics-grid-intro"><SectionLabel>Choose the working problem</SectionLabel><h2 id="topics-grid-title">Five connected systems. One clearer source of truth.</h2><p>Begin with the question closest to the work in front of you, then use the related resources to understand the method, evidence boundary, and private next step.</p></div><div className="topic-card-grid">{topics.map((topic, index) => <article className="topic-card" key={topic.slug}><p className="topic-card-number">{String(index + 1).padStart(2, "0")}</p><p className="topic-card-type">{topic.resourceType}</p><p className="topic-card-label">{topic.label}</p><h3><a href={`/topics/${topic.slug}`}>{topic.title}</a></h3><p>{topic.description}</p><a className="text-link" href={`/topics/${topic.slug}`}>Explore {topic.label} <ArrowUpRight size={15} /></a></article>)}</div></section>
    <section className="topics-bridge section-pad section-rule"><div><SectionLabel>From learning to action</SectionLabel><h2>Need a service conversation rather than another generic guide?</h2><p>Coreweaver Labs connects SEO, Content Marketing, and Paid Ads through research, clear buyer education, named ownership, and reviewable work. Public resources can orient the decision; requests remain private and manually reviewed.</p></div><a className="button button-primary" href="/services">Explore B2B growth services <ArrowUpRight size={16} aria-hidden="true" /></a></section>
  </main></MarketingShell>;
}
