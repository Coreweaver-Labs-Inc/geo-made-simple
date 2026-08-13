import { ArrowRight } from "lucide-react";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";

const layers = [
  ["01", "Authority", "Clarify what the organization knows, why it is credible, and where the proof lives."],
  ["02", "Representation", "Make the story consistent across the pages, sources, and language that shape an AI answer."],
  ["03", "Measurement", "Track the questions and source patterns that matter, then improve the system with intent."],
];

export default function Framework() {
  return (
    <MarketingShell>
      <SeoHead title="The ARM Framework | Coreweaver Labs" description="Learn how the ARM Framework connects authority, representation, and measurement to create a clearer brand signal for AI search." path="/framework" />
      <main>
        <section className="page-hero section-pad"><SectionLabel>The ARM Framework</SectionLabel><p className="page-kicker">Authority / Representation / Measurement</p><h1>A practical operating system for a brand's signal.</h1><p className="page-lede">The ARM Framework gives teams a common way to decide what matters, explain it clearly, and know whether the signal is improving.</p></section>
        <section className="principles-section section-pad section-rule" aria-labelledby="framework-layers"><div className="section-intro"><SectionLabel>Three connected layers</SectionLabel><h2 id="framework-layers">A useful system is clear enough to run.</h2></div><div className="principle-list">{layers.map(([number, title, body]) => <article className="principle-row" key={title}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div></section>
        <section className="editorial-split section-pad section-rule"><div className="framework-art"><img src="/manus-storage/coreweaver-framework_2cadabec.jpg" alt="Abstract measurement lines and connected nodes on paper" /></div><div><SectionLabel>How it is used</SectionLabel><h2>From scattered effort to deliberate progress.</h2><p>Use the framework to guide an audit, decide which content deserves attention, align the people responsible for core claims, and build a measurement practice that connects back to real decisions.</p><p>It is intentionally not a checklist of tricks. The work changes by company, but the system for evaluating it should remain stable.</p><a className="text-link" href="/contact">Discuss a signal audit <ArrowRight size={16} /></a></div></section>
      </main>
    </MarketingShell>
  );
}
