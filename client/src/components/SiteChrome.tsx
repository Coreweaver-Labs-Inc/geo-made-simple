/* Shared public-site chrome keeps the expanded SEO pages connected to the Signal Ledger visual system. */
import { ArrowUpRight, Menu, X } from "lucide-react";
import React, { useState } from "react";

const navItems = [
  { href: "/framework", label: "Framework" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/insights", label: "Insights" },
  { href: "/research", label: "Research" },
  { href: "/case-studies", label: "Case studies" },
];

const externalChannels = [
  { href: "https://www.linkedin.com/company/coreweaver-labs-inc/", label: "LinkedIn" },
  { href: "https://coreweaverlabs.substack.com/", label: "Substack" },
  { href: "https://x.com/coreweaverlabs", label: "X" },
  { href: "https://github.com/Coreweaver-Labs-Inc", label: "Technical work" },
];

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>;
}

export function SectionLabel({ children }: { children: string }) {
  return <p className="section-label"><span className="signal-dot" aria-hidden="true" />{children}</p>;
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Coreweaver Labs home"><BrandMark /><span className="brand-name">Coreweaver <em>Labs</em></span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={18} /> : <Menu size={18} />}<span>{menuOpen ? "Close" : "Menu"}</span>
      </button>
      <nav id="site-nav" className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map(item => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        <a className="nav-cta" href="/contact" onClick={() => setMenuOpen(false)}>Start a conversation <ArrowUpRight size={15} /></a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer section-pad">
      <div className="footer-brand"><BrandMark /><span>Coreweaver Labs</span></div>
      <div className="footer-navigation">
        <div className="footer-links">{navItems.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}<a href="/contact">Contact</a></div>
        <div className="footer-external" aria-label="Official external channels"><span>Elsewhere</span>{externalChannels.map(channel => <a key={channel.href} href={channel.href} target="_blank" rel="noopener noreferrer">{channel.label} <ArrowUpRight size={12} aria-hidden="true" /></a>)}</div>
      </div>
      <div className="footer-meta"><p>GEO / AI governance / signal systems</p><p>© {new Date().getFullYear()} Coreweaver Labs</p></div>
    </footer>
  );
}

export function MarketingShell({ children }: { children: React.ReactNode }) {
  const organization = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "Organization",
      "@id": "https://coreweaverlabs.com/#organization",
      name: "Coreweaver Labs",
      url: "https://coreweaverlabs.com/",
      logo: "https://coreweaverlabs.com/manus-storage/coreweaver-mark_e04a456c.png",
      description: "Coreweaver Labs builds GEO infrastructure that helps credible companies become clearer, more consistent, and more citable in AI search.",
      sameAs: externalChannels.map(channel => channel.href),
    }, {
      "@type": "WebSite",
      "@id": "https://coreweaverlabs.com/#website",
      url: "https://coreweaverlabs.com/",
      name: "Coreweaver Labs",
      publisher: { "@id": "https://coreweaverlabs.com/#organization" },
      inLanguage: "en-US",
    }],
  }).replace(/</g, "\\u003c");
  return <div className="site-shell"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organization }} /><SiteHeader />{children}<SiteFooter /></div>;
}
