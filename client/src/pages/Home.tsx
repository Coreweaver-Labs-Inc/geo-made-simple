/* Signal Ledger direction: editorial modernism, warm paper, deep ink, brass rules, and restrained signal teal. This page explains one idea per section and keeps the reading path obvious. */
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const sections = [
  { href: "#why", label: "Why it matters" },
  { href: "#framework", label: "The framework" },
  { href: "#products", label: "What we build" },
  { href: "#engagement", label: "Work with us" },
];

const products = [
  {
    number: "01",
    name: "GEO Signal Architecture",
    body: "A practical system for making your brand's facts, expertise, and point of view easier for AI answer engines to find and use.",
  },
  {
    number: "02",
    name: "Citation Intelligence",
    body: "A clearer view of where your company appears in AI answers, what sources shape those answers, and where the gaps are.",
  },
  {
    number: "03",
    name: "Knowledge Systems",
    body: "The structured content, governance, and operating habits that keep your signal consistent as your business grows.",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="section-label">
      <span className="signal-dot" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Coreweaver Labs home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="brand-name">Coreweaver <em>Labs</em></span>
        </a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav id="site-nav" className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {sections.map((section) => (
            <a key={section.href} href={section.href} onClick={() => setMenuOpen(false)}>{section.label}</a>
          ))}
          <a className="nav-cta" href="#engagement" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-copy">
            <SectionLabel>GEO infrastructure for the intentional operator</SectionLabel>
            <h1 id="hero-title">Make your brand easier for AI to understand.</h1>
            <p className="hero-lede">Coreweaver Labs builds the frameworks that help credible companies become clearer, more consistent, and more citable in AI search.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#framework">See how it works <ArrowDownRight size={16} /></a>
              <a className="text-link" href="#engagement">Begin with a signal audit <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-note"><span className="note-line" /> No black-box promises. Just better signals.</div>
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
            <p className="large-copy">When people ask ChatGPT, Perplexity, or Google a question about your category, the answer is shaped by the signals those systems can understand.</p>
            <p>That means your website is no longer the only place your reputation is built. The sources, language, structure, and evidence around your business all contribute to how you are represented.</p>
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
            <h2 id="framework-title">A simple operating system for your brand's signal.</h2>
            <p>ARM stands for <strong>Authority, Representation, and Measurement</strong>. Together, these three layers turn scattered content into a system that can be understood, maintained, and improved.</p>
            <ol className="framework-list">
              <li><span>01</span><div><strong>Authority</strong><p>Build the evidence that earns trust.</p></div></li>
              <li><span>02</span><div><strong>Representation</strong><p>Make the right story structurally clear.</p></div></li>
              <li><span>03</span><div><strong>Measurement</strong><p>See what AI systems actually return.</p></div></li>
            </ol>
          </div>
        </section>

        <section id="products" className="products-section section-pad section-rule" aria-labelledby="products-title">
          <div className="section-intro split-intro">
            <div><SectionLabel>What we build</SectionLabel><h2 id="products-title">The tools behind a more legible brand.</h2></div>
            <p>Start with the problem in front of you. Build only what creates a clearer signal.</p>
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
        </section>

        <section id="engagement" className="engagement-section section-pad section-rule" aria-labelledby="engagement-title">
          <div className="engagement-art"><img src="/manus-storage/coreweaver-engagement_712865bb.jpg" alt="Drafting table with a map, ruler, and connected signal thread" loading="lazy" /></div>
          <div className="engagement-copy">
            <SectionLabel>Work with us</SectionLabel>
            <h2 id="engagement-title">Start with the signal you already have.</h2>
            <p>Every engagement begins with a plain-language read of your current AI visibility. We find the gaps, name the opportunities, and recommend the smallest useful next step.</p>
            <a className="button button-primary" href="mailto:hello@coreweaver.io?subject=Signal%20audit%20for%20my%20brand">Request a signal audit <ArrowUpRight size={16} /></a>
            <p className="small-note">No sales sequence. You will hear back from a person.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer section-pad">
        <div className="footer-brand"><span className="brand-mark" aria-hidden="true"><span /><span /><span /></span><span>Coreweaver Labs</span></div>
        <div className="footer-links">{sections.slice(0, 3).map((section) => <a key={section.href} href={section.href}>{section.label}</a>)}</div>
        <div className="footer-meta"><p>GEO / AI governance / signal systems</p><p>© {new Date().getFullYear()} Coreweaver Labs</p></div>
      </footer>
    </div>
  );
}
