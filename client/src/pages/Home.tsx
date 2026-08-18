/* Signal Ledger direction: editorial modernism, warm paper, deep ink, brass rules, and restrained signal teal. This page explains one idea per section and keeps the reading path obvious. */
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React from "react";
import { ContactForm } from "@/components/ContactForm";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";

const sections = [
  { href: "/framework", label: "Framework" },
  { href: "/products", label: "Products" },
  { href: "/insights", label: "Insights" },
];

const products = [
  {
    number: "01",
    name: "Clear brand information",
    body: "The pages, facts, service descriptions, and expert perspective that help people, search engines, and AI answer systems understand what your company does. We call this GEO Signal Architecture.",
  },
  {
    number: "02",
    name: "AI answer and source review",
    body: "A practical review of where your company appears in AI answers, which sources influence those answers, and where the information is unclear. We call this Citation Intelligence.",
  },
  {
    number: "03",
    name: "Shared knowledge and review routines",
    body: "The current source material, ownership, and governance—the review rules and approval habits that keep public claims accurate as your company grows. We call this a Knowledge System.",
  },
];

const resourceClusters = [
  { purpose: "Start here", label: "Topic orientation", title: "B2B Growth Topics", body: "Start with the commercial question in front of you, then choose the connected topic system that helps you inspect it.", href: "/topics" },
  { purpose: "Working method", label: "Operating method", title: "The Coreweaver Method", body: "See how a B2B question becomes a reviewed decision, source-aware explanation, and connected public path.", href: "/method" },
  { purpose: "Decision guide", label: "Website clarity", title: "B2B website information architecture", body: "Organize service, method, evidence, and next-step information around the questions a buyer needs to answer.", href: "/topics/b2b-seo/website-information-architecture" },
  { purpose: "Decision guide", label: "Buyer education", title: "B2B buyer enablement content", body: "Help a buying group understand the problem, inspect the approach, and take a clearer next step.", href: "/topics/b2b-content-marketing/buyer-enablement" },
  { purpose: "Decision guide", label: "Paid-message learning", title: "B2B paid ads and landing-page alignment", body: "Review whether the paid message, destination, and next-step context ask a buyer to understand the same thing.", href: "/topics/b2b-paid-ads/message-landing-page-alignment" },
  { purpose: "Decision guide", label: "AI representation", title: "AI representation for B2B brands", body: "Review how public sources and buyer language shape answer contexts without promising citation or visibility.", href: "/topics/ai-representation" },
  { purpose: "Decision guide", label: "Governance", title: "Content governance for B2B growth teams", body: "Keep important public claims, source ownership, and review routines visible as content grows.", href: "/topics/content-governance" },
  { purpose: "Research standard", label: "Research methods", title: "Research methods and editorial standards", body: "See how source references, methods, authorship, and claim review guide public research work.", href: "/research" },
];

const startHerePaths = [
  { number: "01", title: "Make our website easier to understand", body: "Start with the pages, buyer questions, evidence, and next steps that make your commercial story easier to inspect.", href: "/topics/b2b-seo/website-information-architecture", link: "Explore website clarity" },
  { number: "02", title: "Build a connected content system", body: "Start with the buyer education, source standards, ownership, and review routines that help useful content compound.", href: "/topics/b2b-content-marketing/buyer-enablement", link: "Explore buyer enablement" },
  { number: "03", title: "Make paid messages and landing pages agree", body: "Start with the relationship between the promise in paid media, the destination page, and the decision a buyer is being asked to make.", href: "/topics/b2b-paid-ads/message-landing-page-alignment", link: "Explore paid-message alignment" },
];

export default function Home() {
  const homeSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "WebPage",
      "@id": "https://coreweaverlabs.com/#webpage",
      url: "https://coreweaverlabs.com/",
      name: "Coreweaver Labs — Make your brand easier for AI to understand.",
      description: "Coreweaver Labs helps mid-market B2B teams make their expertise, services, and buyer language clearer through evidence-led SEO, Content Marketing, and Paid Ads.",
      isPartOf: { "@id": "https://coreweaverlabs.com/#website" },
      about: [{ "@type": "Thing", name: "Mid-market B2B growth" }, { "@type": "Thing", name: "B2B SEO" }, { "@type": "Thing", name: "B2B Content Marketing" }, { "@type": "Thing", name: "B2B Paid Ads" }, { "@type": "Thing", name: "AI representation" }, { "@type": "Thing", name: "Content governance" }],
      mainEntity: { "@type": "ItemList", name: "Coreweaver Labs resource clusters", itemListElement: resourceClusters.map((resource, index) => ({ "@type": "ListItem", position: index + 1, name: resource.title, url: `https://coreweaverlabs.com${resource.href}` })) },
      inLanguage: "en-US",
    }],
  }).replace(/</g, "\\u003c");
  return (
    <MarketingShell>
      <SeoHead title="Coreweaver Labs — Make your brand easier for AI to understand." description="Coreweaver Labs helps mid-market B2B teams make their expertise, services, and buyer language clearer through evidence-led SEO, Content Marketing, and Paid Ads." keywords={["mid-market B2B growth", "B2B SEO", "B2B Content Marketing", "B2B Paid Ads", "AI representation", "content governance"]} path="/" />
      <main id="top"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: homeSchema }} />
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-copy">
            <SectionLabel>Clear information for B2B teams</SectionLabel>
            <h1 id="hero-title">Make your brand easier for AI to understand.</h1>
            <p className="hero-lede">Coreweaver Labs helps mid-market B2B teams make their expertise, services, and buyer language clearer through evidence-led SEO, Content Marketing, and Paid Ads.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="/framework">See how it works <ArrowDownRight size={16} /></a>
              <a className="text-link" href="/contact">Begin with a clarity review <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-note"><span className="note-line" /> No black-box promises. Clear information, reviewed sources, and practical next steps.</div>
          </div>
          <div className="hero-art" role="img" aria-label="Identity signal alignment">
            <img src="/manus-storage/coreweaver-hero-identity_7f2f7654.jpg" alt="Graphite and pale mineral ribbons converging through a single teal alignment point in an abstract architectural weave." title="Identity signal alignment" />
            <div className="art-caption"><span>01</span><span>Signal, made visible</span></div>
          </div>
        </section>

        <section id="why" className="why-section section-pad section-rule" aria-labelledby="why-title">
          <div className="section-intro">
            <SectionLabel>Why this matters</SectionLabel>
            <h2 id="why-title">AI answers are becoming part of your brand.</h2>
          </div>
          <div className="why-body">
            <p className="large-copy">When people ask ChatGPT, Perplexity, or Google a question about your category, the answer is shaped by the information those systems can find and interpret.</p>
            <p>We use <strong>signal</strong> as shorthand for that information: the words, service pages, source material, links, and evidence around your business. Your website is no longer the only place your reputation is built.</p>
            <div className="pull-quote">The goal is not to game an answer engine. It is to give it a truer, clearer answer to work with.</div>
          </div>
        </section>

        <section className="start-here-section section-pad section-rule" aria-labelledby="start-here-title">
          <div className="start-here-intro"><SectionLabel>Start here</SectionLabel><h2 id="start-here-title">Choose the decision that needs to become clearer.</h2><p>You do not need to pick a service before you understand the problem. Start with the part of your commercial story that feels least connected, then move into the guide built for that decision.</p></div>
          <div className="start-here-paths">{startHerePaths.map(path => <article key={path.href}><span>{path.number}</span><h3>{path.title}</h3><p>{path.body}</p><a className="text-link" href={path.href}>{path.link} <ArrowUpRight size={15} aria-hidden="true" /></a></article>)}</div>
        </section>

        <section id="framework" className="framework-section section-pad section-rule" aria-labelledby="framework-title">
          <div className="framework-art">
            <img src="/manus-storage/coreweaver-framework-method-v2_88c0f3a5.jpg" alt="A translucent measurement plane with brass reference pins and a teal datum line arranged over a quiet paper grid." title="Evidence and measurement plane" loading="lazy" />
            <div className="image-tag">ARM / 01</div>
          </div>
          <div className="framework-copy">
            <SectionLabel>The ARM Framework</SectionLabel>
            <h2 id="framework-title">A simple way to keep your facts, message, and evidence aligned.</h2>
            <p>ARM stands for <strong>Authority, Representation, and Measurement</strong>. Here, an <strong>operating system</strong> means the repeatable roles, source material, and review routines that keep public information useful—not software you have to buy.</p>
            <ol className="framework-list">
              <li><span>01</span><div><strong>Authority</strong><p>Keep the source material and evidence that support what you say.</p></div></li>
              <li><span>02</span><div><strong>Representation</strong><p>Use the same clear description of your company across key buyer touchpoints.</p></div></li>
              <li><span>03</span><div><strong>Measurement</strong><p>Review what search and AI systems return, then record what needs to improve.</p></div></li>
            </ol><a className="text-link" href="/framework">Explore the framework <ArrowUpRight size={16} /></a>
          </div>
        </section>

        <section id="products" className="products-section section-pad section-rule" aria-labelledby="products-title">
          <div className="section-intro split-intro">
            <div><SectionLabel>What we build</SectionLabel><h2 id="products-title">Practical tools for a clearer brand.</h2></div>
            <p>Start with the problem in front of you. Build only what makes your company easier to understand and maintain.</p>
          </div>
          <div className="products-layout">
            <div className="products-list">
              {products.map((product) => (
                <article className="product-row" key={product.number}>
                  <span className="product-number">{product.number}</span>
                  <div><h3>{product.name}</h3><p>{product.body}</p></div>
                  <ArrowUpRight className="product-arrow" size={18} aria-hidden="true" />
                </article>
              ))}
            </div>
            <div className="products-art"><img src="/manus-storage/coreweaver-products-clarity-v2_36185701.jpg" alt="A graphite lens, folded teal plane, and brass calibration ring arranged as three connected precision tools on a pale work surface." title="Three tools for brand clarity" loading="lazy" /></div>
          </div>
          <a className="text-link" href="/products">Explore the products <ArrowUpRight size={16} /></a>
        </section>

        <section id="resources" className="resources-section section-pad section-rule" aria-labelledby="resources-title">
          <div className="resources-intro"><SectionLabel>Resources</SectionLabel><h2 id="resources-title">A connected resource library for working decisions.</h2><p>Start with the buyer question in front of you, then follow a clear path into the relevant guide, research standard, or source-of-truth topic. These links are designed to help a reader continue their investigation—not to promise an outcome.</p><a className="text-link" href="/topics">Browse all B2B Growth Topics <ArrowUpRight size={16} /></a></div>
          <div className="resource-cluster-grid">{resourceClusters.map((resource, index) => <article className="resource-cluster-card" key={resource.href}><span>{String(index + 1).padStart(2, "0")} · {resource.purpose}</span><p className="resource-cluster-type">{resource.label}</p><h3><a href={resource.href}>{resource.title}</a></h3><p>{resource.body}</p><a className="text-link" href={resource.href}>Open resource <ArrowUpRight size={14} aria-hidden="true" /></a></article>)}</div>
        </section>

        <section id="engagement" className="engagement-section section-pad section-rule" aria-labelledby="engagement-title">
          <div className="engagement-art"><img src="/manus-storage/coreweaver-engagement-desire-v2_3ad920b9.jpg" alt="A graphite ruler and open paper route with a single teal thread leading toward a softly lit edge of a drafting surface." title="A visible next step" loading="lazy" /></div>
          <div className="engagement-copy">
            <SectionLabel>Work with us</SectionLabel>
            <h2 id="engagement-title">Start with the information you already have.</h2>
            <p>Every engagement begins with a plain-language review of how your company currently appears in search and AI answers. We identify unclear information, name the smallest useful next step, and record why it matters.</p>
            <ContactForm />
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
