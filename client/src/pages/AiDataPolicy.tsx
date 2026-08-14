import { ArrowUpRight, Bot, Link2, LockKeyhole, ShieldCheck } from "lucide-react";
import React from "react";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";

const permittedUses = [
  ["Search and answer retrieval", "Compliant AI search, retrieval, and answer systems may crawl, index, summarize, and quote limited portions of publicly accessible Coreweaver Labs pages to help a user find the original work."],
  ["Clear source connection", "When a system uses our content in an answer or result, we ask it to identify Coreweaver Labs and link to the relevant canonical page where its product supports source links or citations."],
  ["Public research and services", "This permission applies to public service pages, Insights, Research, approved case studies, and other publicly accessible editorial content. It does not create permission to access restricted systems."],
];

const prohibitedUses = [
  ["General model training", "We do not grant permission to use our content to train, fine-tune, or improve general-purpose or foundation AI models, unless we give separate written permission."],
  ["Bulk reuse or resale", "Do not build, sell, license, or redistribute a content dataset made substantially from our materials, or reproduce pages in bulk in a way that substitutes for the original source."],
  ["Restricted or protected information", "Do not crawl, retrieve, infer, or expose private workspaces, noindex routes, client intake records, gated materials, personal data, or confidential source material."],
  ["False representation", "Do not represent Coreweaver Labs as endorsing an AI product, use our name or marks in a misleading way, or convert our research and case studies into unsupported client or performance claims."],
];

const controls = [
  ["Search retrieval is welcome", "Our robots directives allow general search crawling and explicitly allow known AI search or user-directed retrieval agents such as OAI-SearchBot, Claude-SearchBot, Claude-User, and ChatGPT-User."],
  ["Training is not authorized", "Our robots directives block known training or model-improvement agents, including GPTBot, ClaudeBot, Google-Extended, and CCBot. This distinguishes search visibility from permission to use content for model development."],
  ["Robots directives have limits", "robots.txt communicates crawler preferences; it is not access control and cannot compel every crawler to comply. Restricted material must remain protected through noindex, authentication, and other technical controls."],
];

export default function AiDataPolicy() {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://coreweaverlabs.com/ai-data-policy#webpage",
    name: "AI Data Policy | Coreweaver Labs",
    description: "Coreweaver Labs’ public policy for AI crawler use of its content, including permitted search retrieval, prohibited model-training use, attribution expectations, and governance boundaries.",
    url: "https://coreweaverlabs.com/ai-data-policy",
    isPartOf: { "@id": "https://coreweaverlabs.com/#website" },
    publisher: { "@id": "https://coreweaverlabs.com/#organization" },
    inLanguage: "en-US",
    dateModified: "2026-08-13",
  }).replace(/</g, "\\u003c");

  return (
    <MarketingShell>
      <SeoHead title="AI Data Policy | Coreweaver Labs" description="How Coreweaver Labs permits AI crawlers to use public content for search and answer retrieval, while restricting model training, bulk reuse, and protected information." path="/ai-data-policy" />
      <main>
        <article className="ai-policy-page">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
          <section className="page-hero section-pad" aria-labelledby="ai-policy-title">
            <SectionLabel>AI data policy</SectionLabel>
            <p className="page-kicker">Last updated: August 13, 2026</p>
            <h1 id="ai-policy-title">Make public knowledge useful—without treating it as unbounded training data.</h1>
            <p className="page-lede">Coreweaver Labs welcomes responsible AI search and answer systems that help people discover our public work. We permit retrieval-oriented use under the boundaries below and do not grant permission for general model training or bulk reuse.</p>
          </section>

          <section className="ai-policy-summary section-pad section-rule" aria-labelledby="policy-scope-title">
            <div>
              <SectionLabel>Policy scope</SectionLabel>
              <h2 id="policy-scope-title">This is a public usage policy for public content—not a substitute for access control or a blanket data license.</h2>
            </div>
            <div>
              <p>This policy applies to publicly accessible materials at <strong>coreweaverlabs.com</strong>. It supplements the site’s crawler directives and does not override applicable law, rights in third-party material, client confidentiality commitments, or a separate written agreement.</p>
              <p>We distinguish between helping a user locate a source and using that source to develop a general model. These are different uses, and our crawler preferences reflect that difference.</p>
            </div>
          </section>

          <section className="ai-policy-grid section-pad section-rule" aria-labelledby="permitted-title">
            <div className="ai-policy-section-heading"><Bot size={22} aria-hidden="true" /><div><SectionLabel>Permitted use</SectionLabel><h2 id="permitted-title">AI systems may use our public work to help people find and inspect the source.</h2></div></div>
            <div className="ai-policy-card-list">{permittedUses.map(([title, detail], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
          </section>

          <section className="ai-policy-grid section-pad section-rule" aria-labelledby="restricted-title">
            <div className="ai-policy-section-heading"><LockKeyhole size={22} aria-hidden="true" /><div><SectionLabel>Not permitted</SectionLabel><h2 id="restricted-title">Being public does not mean our work is available for every AI use.</h2></div></div>
            <div className="ai-policy-card-list ai-policy-card-list-restricted">{prohibitedUses.map(([title, detail], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
          </section>

          <section className="ai-policy-controls section-pad section-rule" aria-labelledby="controls-title">
            <div><SectionLabel>Crawler controls</SectionLabel><h2 id="controls-title">Our policy is written in plain language and reflected in crawler controls where providers support them.</h2></div>
            <div className="research-principle-list">{controls.map(([title, detail]) => <p key={title}><b>{title}</b> {detail}</p>)}</div>
          </section>

          <section className="ai-policy-sources section-pad section-rule" aria-labelledby="sources-title">
            <div><SectionLabel>Provider documentation</SectionLabel><h2 id="sources-title">How to interpret the controls.</h2></div>
            <div><p>OpenAI documents separate controls for OAI-SearchBot and GPTBot, allowing site owners to permit search use while indicating that training use is not allowed. <a className="case-source-link" href="https://developers.openai.com/api/docs/bots" target="_blank" rel="noopener noreferrer">Read OpenAI’s crawler overview <ArrowUpRight size={14} aria-hidden="true" /></a></p><p>Anthropic documents separate agents for training, user-directed retrieval, and search; Google documents Google-Extended as a separate product token for controlling certain Gemini and Vertex AI uses. <a className="case-source-link" href="https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler" target="_blank" rel="noopener noreferrer">Read Anthropic’s crawler controls <ArrowUpRight size={14} aria-hidden="true" /></a> <a className="case-source-link" href="https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers" target="_blank" rel="noopener noreferrer">Read Google’s crawler documentation <ArrowUpRight size={14} aria-hidden="true" /></a></p><div className="research-governance-note"><ShieldCheck size={18} aria-hidden="true" /><p>AI systems must respect public boundaries. No client intake, private workspace, unpublished research, or confidential source material is authorized for retrieval or training.</p></div></div>
          </section>

          <section className="ai-policy-contact section-pad section-rule">
            <div><SectionLabel>Questions or corrections</SectionLabel><h2>Request clarification, report a concern, or ask about a specific use.</h2><p>Use the contact form and include the crawler or product name, the relevant URL, the observed use, and a way to reach you. We will review requests through the same evidence and governance standards used for our public work.</p></div>
            <a className="button button-primary" href="/contact">Contact Coreweaver Labs <Link2 size={16} aria-hidden="true" /></a>
          </section>
        </article>
      </main>
    </MarketingShell>
  );
}
