import { ArrowRight } from "lucide-react";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";

const offerings = [
  { number: "01", name: "GEO Signal Architecture", detail: "A focused system for translating a company's expertise, evidence, and category point of view into a clearer public signal.", includes: "Claim mapping, source review, information structure, implementation backlog" },
  { number: "02", name: "Citation Intelligence", detail: "A disciplined view of the answer contexts, sources, and patterns that shape how an organization is represented in AI search.", includes: "Question sets, answer review, source patterns, prioritized opportunities" },
  { number: "03", name: "Knowledge Systems", detail: "The content governance and operating habits that keep core facts accurate, discoverable, and useful over time.", includes: "Content models, ownership, editorial standards, maintenance rhythm" },
];

export default function Products() {
  return (
    <MarketingShell>
      <SeoHead title="GEO Signal Products | Coreweaver Labs" description="Explore Coreweaver Labs' practical GEO signal architecture, citation intelligence, and knowledge systems services." path="/products" ogImage="/manus-storage/coreweaver-products-clarity-v2_36185701.jpg" ogImageAlt="Three precision tools representing connected SEO, content, and paid media systems." />
      <main>
        <section className="page-hero section-pad"><SectionLabel>What we build</SectionLabel><p className="page-kicker">Systems for clearer AI representation</p><h1>Tools for the work behind a more legible brand.</h1><p className="page-lede">Each engagement begins with the problem in front of you. We build only what creates a clearer, more maintainable signal.</p></section>
        <section className="offerings-section section-pad section-rule"><div className="products-art offerings-art"><img src="/manus-storage/coreweaver-products-clarity-v2_36185701.jpg" alt="A graphite lens, folded teal plane, and brass calibration ring arranged as three connected precision tools on a pale work surface." title="Three tools for brand clarity" /></div><div className="offerings-list">{offerings.map(item => <article className="offering" key={item.number}><span className="product-number">{item.number}</span><h2>{item.name}</h2><p>{item.detail}</p><div className="includes"><span>Often includes</span><p>{item.includes}</p></div></article>)}</div></section>
        <section className="quiet-cta section-pad section-rule"><SectionLabel>Choose a useful starting point</SectionLabel><h2>Start with the evidence you already have.</h2><p>We can identify the smallest useful first step in a signal audit.</p><a className="button button-primary" href="/contact">Start a conversation <ArrowRight size={16} /></a></section>
      </main>
    </MarketingShell>
  );
}
