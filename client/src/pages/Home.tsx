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

export default function Home() {
  return (
    <MarketingShell>
      <SeoHead title="Coreweaver Labs — Make your brand easier for AI to understand." description="Coreweaver Labs helps mid-market B2B teams make their expertise, services, and buyer language clearer through evidence-led SEO, Content Marketing, and Paid Ads." path="/" />
      <main id="top">
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
          <div className="hero-art" role="img" aria-label="Abstract woven lattice representing connected brand signals">
            <img src="/manus-storage/coreweaver-hero_eb9a774a.jpg" alt="Abstract woven lattice of connected brand signals" />
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

        <section id="framework" className="framework-section section-pad section-rule" aria-labelledby="framework-title">
          <div className="framework-art">
            <img src="/manus-storage/coreweaver-framework_2cadabec.jpg" alt="Abstract measurement lines and connected nodes on paper" loading="lazy" />
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
            <div className="products-art"><img src="/manus-storage/coreweaver-products_9a7c53f2.jpg" alt="Three abstract signal instruments arranged on a workbench" loading="lazy" /></div>
          </div>
          <a className="text-link" href="/products">Explore the products <ArrowUpRight size={16} /></a>
        </section>

        <section id="engagement" className="engagement-section section-pad section-rule" aria-labelledby="engagement-title">
          <div className="engagement-art"><img src="/manus-storage/coreweaver-engagement_712865bb.jpg" alt="Drafting table with a map, ruler, and connected signal thread" loading="lazy" /></div>
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
