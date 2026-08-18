import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React from "react";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";

const assets = {
  firstConstraint: "/manus-storage/first-constraint_fabec16d.png",
  answerChangeLog: "/manus-storage/answer-change-log_162639a1.png",
  evidenceSystem: "/manus-storage/evidence-system_92224224.png",
  representationGap: "/manus-storage/representation-gap_e1ff8e40.png",
  entityArchitecture: "/manus-storage/entity-architecture_d7010f26.png",
  earthwardFoundry: "/manus-storage/earthward-foundry_18691524.png",
};

const chapters = [
  { number: "01", title: "Start with the constraint.", copy: "Name the claim, source, privacy, ownership, and publication limit before a page, prompt, or automation gets moving.", image: assets.firstConstraint, alt: "A dark architectural threshold formed by industrial rails and a distant vertical opening of light." },
  { number: "02", title: "Keep an answer change log.", copy: "A good handoff records what changed, why it changed, which source applies, what was tested, and what remains deliberately unresolved.", image: assets.answerChangeLog, alt: "A dimly lit wall of method cards and review boards arranged in a continuous editorial sequence." },
  { number: "03", title: "Build the evidence system.", copy: "People, services, publications, identifiers, sources, and approved facts become stronger when their relationships are explicit and reviewable.", image: assets.evidenceSystem, alt: "An architectural evidence network connecting organization, people, publications, sources, identifiers, verified facts, and relationships." },
  { number: "04", title: "Close the representation gap.", copy: "The work is not to force an answer engine to say something. It is to make the public record clearer, more connected, and more useful to a real reader.", image: assets.representationGap, alt: "A concrete structure set apart from layered public records, representing the gap between reality and machine-readable representation." },
];

const decisions = [
  { label: "Candidate question", question: "Is there a buyer decision or approved aggregate signal worth understanding?", outcome: "If not, retain it as an observation—not a page." },
  { label: "Source and scope", question: "Is there a named source, an allowed first-party aggregate, and a clear privacy boundary?", outcome: "If not, do not draft or publish." },
  { label: "Silo fit", question: "Does it belong to an existing hub, child guide, research lane, or service conversation?", outcome: "If not, create a private cluster proposal first." },
  { label: "Claim gate", question: "Does the output introduce a finding, comparison, proof point, or performance statement?", outcome: "If yes, require source, method, reviewer, and authorization where applicable." },
  { label: "Publication path", question: "Can the reader follow a useful path from this page to its parent, method, source context, and next step?", outcome: "If not, repair the internal-link plan before release." },
];

const tableOfContents = [
  { href: "#method-story", label: "The premise" },
  { href: "#operating-practices", label: "Four practices" },
  { href: "#decision-path", label: "Decision gates" },
  { href: "#entity-architecture", label: "Entity architecture" },
  { href: "#content-silos", label: "Content silos" },
  { href: "#earthward-foundry", label: "Earthward Foundry" },
];

const methodologySchema = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://coreweaverlabs.com/method#webpage",
      url: "https://coreweaverlabs.com/method",
      name: "The Coreweaver Method",
      description: "A public explanation of Coreweaver Labs' evidence-led workflow for connected B2B content, source review, internal linking, and review-gated publishing.",
      isPartOf: { "@id": "https://coreweaverlabs.com/#website" },
      about: { "@id": "https://coreweaverlabs.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://coreweaverlabs.com/" },
        { "@type": "ListItem", position: 2, name: "The Coreweaver Method", item: "https://coreweaverlabs.com/method" },
      ],
    },
  ],
}).replace(/</g, "\\u003c");

export default function Methodology() {
  return <MarketingShell>
    <SeoHead
      title="The Coreweaver Method | Evidence-Led Content Systems"
      description="How Coreweaver Labs turns B2B buyer questions into connected, source-aware, review-gated content systems without autonomous public publishing."
      path="/method"
      keywords={["evidence-led content systems", "B2B content architecture", "internal linking methodology", "source governance", "AI visibility methodology", "content silo strategy"]}
      ogImage={assets.evidenceSystem}
      ogImageAlt="An architectural evidence network connecting organization, sources, records, and publications."
    />
    <main className="method-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: methodologySchema }} />
      <section className="method-hero section-pad">
        <div className="method-hero-copy">
          <SectionLabel>The Coreweaver Method</SectionLabel>
          <h1>Make the next answer more accountable than the last.</h1>
          <p>Coreweaver Labs turns a B2B question into a connected decision, a source-aware explanation, and a reviewed public record. The system is designed to make useful work easier to continue—not easier to fake.</p>
          <div className="method-hero-actions"><a className="button button-primary" href="#decision-path">Follow the decision path <ArrowDownRight size={16} /></a><a className="text-link" href="/topics">Explore B2B Growth Topics <ArrowUpRight size={15} /></a></div>
        </div>
        <figure className="method-hero-image"><img src={assets.firstConstraint} alt="A dark architectural threshold formed by industrial rails and a distant vertical opening of light." /><figcaption>Every useful system begins with its first constraint.</figcaption></figure>
      </section>

      <div className="method-body-layout">
        <aside className="method-toc-wrap">
          <nav className="method-toc" aria-label="On this page">
            <span>On this page</span>
            <ol>{tableOfContents.map((item, index) => <li key={item.href}><a href={item.href}><b>{String(index + 1).padStart(2, "0")}</b>{item.label}</a></li>)}</ol>
          </nav>
        </aside>
        <div className="method-body-content">
          <section className="method-thesis section-pad" id="method-story">
            <SectionLabel>Not a content factory</SectionLabel>
            <div className="method-thesis-grid"><h2>A page is a promise about what a reader can understand next.</h2><div><p>That promise gets stronger when the page has a clear parent, a specific buyer question, nearby source context, a descriptive internal path, and a visible boundary around what the evidence does—and does not—support.</p><p>Google’s published guidance similarly emphasizes crawlable, descriptive links with surrounding context, and recommends that pages worth finding are linked from other relevant pages. Its guidance for AI search continues to focus on clear technical structure and useful, non-commodity, people-first content rather than special optimization tricks. <a href="https://developers.google.com/search/docs/crawling-indexing/links-crawlable" target="_blank" rel="noopener noreferrer">Read Google’s link guidance</a> <a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" target="_blank" rel="noopener noreferrer">and AI-search guidance</a>.</p></div></div>
          </section>

          <section className="method-chapters section-pad" aria-label="Method chapters" id="operating-practices">
            {chapters.map((chapter, index) => <article className={`method-chapter ${index % 2 ? "is-reversed" : ""}`} key={chapter.number}><figure><img src={chapter.image} alt={chapter.alt} /></figure><div><span>{chapter.number}</span><h2>{chapter.title}</h2><p>{chapter.copy}</p></div></article>)}
          </section>

          <section className="method-decision section-pad" id="decision-path">
            <SectionLabel>The decision path</SectionLabel>
            <div className="method-decision-intro"><h2>A page, a topic, a technique, or a new market idea must pass the same test.</h2><p>Blue-ocean exploration is welcome here only as a disciplined hypothesis: an unserved decision, a sourceable problem, and a proposed path to learn. It is not a permission slip to claim a category, a result, or a future offering before the record exists.</p></div>
            <ol className="decision-path">{decisions.map((step, index) => <li key={step.label}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.label}</h3><p>{step.question}</p><strong>{step.outcome}</strong></div></li>)}</ol>
          </section>

          <section className="method-entity section-pad" id="entity-architecture">
            <div className="method-entity-visual"><img src={assets.entityArchitecture} alt="An overhead evidence workspace with an organization record connected to authoritative sources, structured data, citations, relationships, and review materials." /></div>
            <div className="method-entity-copy"><SectionLabel>Entity architecture</SectionLabel><h2>Representation is a system of relationships.</h2><p>One authoritative company page cannot carry the whole burden. A coherent public record connects the organization, people, services, publications, proof where authorized, source references, and review practices without pretending that any one markup field guarantees a result.</p><p>Structured data should describe visible page content accurately and completely; it is an explicit clue about page meaning, not an invisible substitute for useful information. <a href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" target="_blank" rel="noopener noreferrer">Read Google’s structured-data guidance</a>.</p></div>
          </section>

          <section className="method-silos section-pad" id="content-silos">
            <SectionLabel>Content silos that compound</SectionLabel>
            <div className="method-silos-grid"><div><h2>Build horizontally for understanding. Build vertically for depth.</h2><p>Hubs give a buyer a map. Child guides resolve a specific decision. Insights and research records bring current evidence into the system. Service pages provide a clear private next step. Each link should explain why the next page is relevant.</p></div><ul><li><a href="/topics/b2b-seo">Website clarity and B2B SEO</a><span>Information architecture, buyer language, and discoverable explanations.</span></li><li><a href="/topics/b2b-content-marketing">Buyer enablement content</a><span>Useful education that helps groups inspect and discuss a decision.</span></li><li><a href="/topics/b2b-paid-ads">Paid-message learning</a><span>Connected paid messages, landing-page context, and reviewable learning.</span></li><li><a href="/topics/ai-representation">AI representation</a><span>Public records that are clearer for people and systems to interpret.</span></li><li><a href="/topics/content-governance">Content governance</a><span>Sources, ownership, claim review, corrections, and publication boundaries.</span></li></ul></div>
          </section>

          <section className="method-foundry section-pad" id="earthward-foundry">
            <figure><img src={assets.earthwardFoundry} alt="A dark archival workshop with shelves, plans, instruments, and a central architectural model lit by a tall opening." /></figure>
            <div><SectionLabel>Earthward Foundry pathway</SectionLabel><h2>Make the operating system portable before you make it bigger.</h2><p>Earthward Foundry is a future pathway for this way of working: reusable source contracts, stable entity language, modular content silos, named review gates, and durable handoffs. It is not presented here as a launched product, partnership, or market claim.</p><p>The practical work is already visible: one question, one decision, one source plan, one accountable draft, and one connected path at a time.</p><a className="button button-primary" href="/research">Read the research standards <ArrowUpRight size={16} /></a></div>
          </section>
        </div>
      </div>

      <section className="method-close section-pad"><SectionLabel>Begin with a real question</SectionLabel><h2>Clarity is built when someone can inspect the path behind the answer.</h2><p>Explore the topic library, read the standards behind the work, or start a private conversation about the decision your team is trying to make clearer.</p><div><a className="button button-primary" href="/topics">Browse the topic library <ArrowUpRight size={16} /></a><a className="text-link" href="/contact">Start a private conversation <ArrowUpRight size={15} /></a></div></section>
    </main>
  </MarketingShell>;
}
