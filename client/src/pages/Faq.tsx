import { ArrowUpRight, BookOpenCheck, Search, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";

type FaqItem = { question: string; answer: React.ReactNode; schemaAnswer: string };
type FaqCategory = { id: string; label: string; title: string; description: string; items: FaqItem[] };

export const faqCategories: FaqCategory[] = [
  {
    id: "coreweaver",
    label: "Coreweaver Labs",
    title: "Coreweaver Labs and fit",
    description: "Clear answers about the company, intended buyers, and current service focus.",
    items: [
      { question: "What is Coreweaver Labs?", answer: <>Coreweaver Labs is an evidence-led B2B growth and digital-marketing partner for mid-market teams. Its current public service focus is <strong>SEO, Content Marketing, and Paid Ads</strong>, connected through clear positioning, governance, and practical operating systems.</>, schemaAnswer: "Coreweaver Labs is an evidence-led B2B growth and digital-marketing partner for mid-market teams, with a current public service focus on SEO, Content Marketing, and Paid Ads." },
      { question: "Who does Coreweaver Labs serve?", answer: <>Coreweaver Labs is designed for <strong>mid-market B2B teams</strong> that need their expertise, services, and buyer language to be more consistent across search, content, paid media, sales context, and support. It is a focused positioning statement, not a claim to serve every business model or use case.</>, schemaAnswer: "Coreweaver Labs is designed for mid-market B2B teams that need their expertise, services, and buyer language to be more consistent across search, content, paid media, sales context, and support." },
      { question: "What makes Coreweaver Labs different?", answer: <>The operating distinction is governance: public research explains its method, research briefs require source and reviewer records before publication, and case studies require authorization and evidence before they are public. The aim is clearer, inspectable work—not black-box promises or invented proof.</>, schemaAnswer: "Coreweaver Labs differentiates through governed research, source and reviewer records for research briefs, and authorization and evidence requirements for public case studies." },
    ],
  },
  {
    id: "services",
    label: "Services and engagement",
    title: "Services, scope, and engagement",
    description: "The three launch services and how a new conversation begins.",
    items: [
      { question: "Which services does Coreweaver Labs offer?", answer: <>The three launch services are <strong>SEO, Content Marketing, and Paid Ads</strong>. The service hub explains each in public; the internal operating model connects the work through manual cross-functional handoffs rather than automatic promotion of public inquiries into engagements.</>, schemaAnswer: "Coreweaver Labs offers SEO, Content Marketing, and Paid Ads as its three launch services." },
      { question: "How does a new engagement begin?", answer: <>A conversation begins through the guided contact flow or a signal-audit request. The first purpose is qualification and context, not an automatic promise, account creation, or commitment; requests are reviewed and triaged manually.</>, schemaAnswer: "A new engagement begins through the guided contact flow or a signal-audit request, followed by manual review and triage." },
      { question: "Are the published service prices final?", answer: <>No. The current public amounts are clearly labelled as <strong>research-based starting estimates pending owner approval</strong>. They are not an offer, a guaranteed scope, or a substitute for an approved commercial agreement.</>, schemaAnswer: "Current public service amounts are research-based starting estimates pending owner approval, not a final offer or guaranteed scope." },
      { question: "Does Coreweaver Labs guarantee rankings, citations, leads, or ROAS?", answer: <>No. Search engines, AI answer systems, paid platforms, buyer decisions, and market conditions are independent. Coreweaver Labs can define evidence, methods, ownership, and reviewable work, but it does not guarantee rankings, AI citations, leads, revenue, or return on ad spend.</>, schemaAnswer: "Coreweaver Labs does not guarantee rankings, AI citations, leads, revenue, or return on ad spend." },
    ],
  },
  {
    id: "method",
    label: "Method and AI",
    title: "Method, AI, and representation",
    description: "How the framework treats trustworthy information and AI-facing brand clarity.",
    items: [
      { question: "What does “Make your brand easier for AI to understand” mean?", answer: <>It means making a company’s facts, services, expertise, source material, and buyer language clearer and more consistent so people, search systems, and AI answer systems can interpret the same underlying business with less ambiguity. It is not a claim that any AI system will surface or cite the company.</>, schemaAnswer: "Making a brand easier for AI to understand means making its facts, services, expertise, source material, and buyer language clearer and more consistent; it does not guarantee AI visibility or citation." },
      { question: "What is the ARM Framework?", answer: <>ARM stands for <strong>Authority, Representation, and Measurement</strong>. It is Coreweaver Labs’ public model for building evidence that earns trust, making the right story structurally clear, and reviewing what search and AI systems return without relying on vanity metrics.</>, schemaAnswer: "ARM stands for Authority, Representation, and Measurement, a model for evidence, clear representation, and reviewable measurement." },
      { question: "How does Coreweaver Labs use AI?", answer: <>AI may assist classification, drafting, and workflow support, but it is not treated as a source of authority. Public research requires a named human accountable for the claim, source, method, reviewer record, and explanation of relevant automation assistance.</>, schemaAnswer: "Coreweaver Labs may use AI for classification, drafting, and workflow support, while named humans remain accountable for public claims, sources, methods, and review." },
      { question: "Can AI crawlers use Coreweaver Labs content?", answer: <>Responsible AI search and answer systems may retrieve, index, summarize, and quote limited portions of public content to help users find the original work. General model training, bulk reuse, protected information, and misleading representation are not authorized; see the <a href="/ai-data-policy">AI Data Policy</a> for the complete public policy and crawler controls.</>, schemaAnswer: "Responsible AI search and answer systems may retrieve public Coreweaver Labs content to help users find the original work. General model training, bulk reuse, protected information, and misleading representation are not authorized." },
    ],
  },
  {
    id: "evidence",
    label: "Research and evidence",
    title: "Research, case studies, and proof",
    description: "The safeguards that separate an assertion from authorized public evidence.",
    items: [
      { question: "How does Coreweaver Labs publish research?", answer: <>Public research begins with a documented method, source ledger, author, scope, and claim-review record. A research or field brief may remain a private draft; it cannot publish without source references, a method note, a named reviewer, and explicit claim-review confirmation.</>, schemaAnswer: "Coreweaver Labs publishes research only after a documented method, source ledger, author, scope, source references, method note, named reviewer, and explicit claim-review confirmation are complete." },
      { question: "What makes a case study publishable?", answer: <>A public case study needs an approved record containing the client label or authorized anonymous label, source URL or document, exact supportable finding, scope, reporting window, review date, and written publication authorization. Private intake records never become public automatically.</>, schemaAnswer: "A public case study requires an approved record with a client or authorized anonymous label, source, exact supportable finding, scope, reporting window, review date, and written publication authorization." },
      { question: "Why are there no fabricated testimonials or performance claims?", answer: <>Coreweaver Labs treats customer proof as evidence that must be authorized, sourced, reviewed, and scoped. It does not create customer reviews, ratings, testimonials, client results, or case-study findings as placeholder marketing content.</>, schemaAnswer: "Coreweaver Labs does not fabricate customer reviews, ratings, testimonials, client results, or case-study findings; public proof must be authorized, sourced, reviewed, and scoped." },
      { question: "Can an article or research brief be corrected?", answer: <>Yes. When evidence changes, the editorial standard is to update, qualify, archive, or correct the work rather than simply changing a date. The public Research page explains the source, accountability, and correction expectations behind that standard.</>, schemaAnswer: "When evidence changes, Coreweaver Labs updates, qualifies, archives, or corrects the work rather than merely changing a date." },
    ],
  },
  {
    id: "operations",
    label: "Operations and support",
    title: "Operations, privacy, and support",
    description: "How requests, private records, and customer context are handled.",
    items: [
      { question: "What happens after I submit a contact or support request?", answer: <>Public requests enter a private manual-triage process. A request does not automatically create a customer account, sales opportunity, support case, engagement, or public claim; an operator reviews the context before any internal record is promoted.</>, schemaAnswer: "Public requests enter private manual triage and do not automatically create a customer account, sales opportunity, support case, engagement, or public claim." },
      { question: "Is customer and prospect information public?", answer: <>No. Private workspaces, contact records, support context, case-study intake, unpublished research, and confidential source material are not public site content and are not authorized for crawler retrieval or model training.</>, schemaAnswer: "Private workspaces, contact records, support context, case-study intake, unpublished research, and confidential source material are not public site content and are not authorized for crawler retrieval or model training." },
      { question: "How can I ask a question not answered here?", answer: <>Use the <a href="/contact">contact page</a> and share the decision, service area, or policy concern you are trying to resolve. Coreweaver Labs will review the request with the same evidence and governance standards applied to public work.</>, schemaAnswer: "Use the Coreweaver Labs contact page to ask a question not answered in the FAQ." },
    ],
  },
];

const plainAnswer = (item: FaqItem) => item.schemaAnswer;

export default function Faq() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCategories = useMemo(() => faqCategories.map((group) => ({ ...group, items: group.items.filter((item) => {
    const matchesCategory = category === "all" || category === group.id;
    const haystack = `${item.question} ${item.schemaAnswer}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  }) })).filter((group) => group.items.length > 0), [category, normalizedQuery]);
  const resultCount = visibleCategories.reduce((total, group) => total + group.items.length, 0);
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [{
      "@type": "FAQPage",
      "@id": "https://coreweaverlabs.com/faq#faq",
      url: "https://coreweaverlabs.com/faq",
      name: "Frequently Asked Questions | Coreweaver Labs",
      mainEntity: faqCategories.flatMap((group) => group.items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: plainAnswer(item) } }))),
    }, {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://coreweaverlabs.com/" }, { "@type": "ListItem", position: 2, name: "FAQ", item: "https://coreweaverlabs.com/faq" }],
    }],
  }).replace(/</g, "\\u003c");

  const chooseCategory = (id: string) => {
    setCategory(id);
    const results = document.getElementById("faq-results");
    if (typeof results?.scrollIntoView === "function") results.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <MarketingShell><SeoHead title="FAQ | Coreweaver Labs" description="Answers to common questions about Coreweaver Labs, its mid-market B2B SEO, Content Marketing, and Paid Ads services, AI governance, research, proof, and support." path="/faq" /><main className="faq-page"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
    <section className="faq-hero section-pad" aria-labelledby="faq-title"><SectionLabel>Frequently asked questions</SectionLabel><p className="page-kicker">Direct answers. Clear boundaries.</p><h1 id="faq-title">The working questions behind an evidence-led B2B growth partner.</h1><p>Coreweaver Labs answers these questions with the same public standards used for services, research, AI data use, and authorized proof. No fabricated results, reviews, or promises.</p><div className="faq-stat-row" aria-label="FAQ coverage"><span><b>{faqCategories.length}</b> topics</span><span><b>{faqCategories.reduce((total, group) => total + group.items.length, 0)}</b> answers</span><span><b>3</b> launch services</span><span><b>0</b> invented outcomes</span></div></section>
    <section className="faq-layout section-pad section-rule" aria-labelledby="faq-results-title"><aside className="faq-sidebar" aria-label="FAQ filters and topic navigation"><label className="faq-search"><span className="sr-only">Search frequently asked questions</span><Search size={16} aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search answers" /><button type="button" onClick={() => setQuery("")} aria-label="Clear FAQ search" className={query ? "is-visible" : ""}><X size={14} /></button></label><p className="faq-result-count" aria-live="polite">{resultCount} {resultCount === 1 ? "answer" : "answers"} shown</p><nav className="faq-topic-nav" aria-label="FAQ topics"><button type="button" className={category === "all" ? "is-active" : ""} onClick={() => chooseCategory("all")}>All topics <span>{faqCategories.reduce((total, group) => total + group.items.length, 0)}</span></button>{faqCategories.map((group) => <button type="button" key={group.id} className={category === group.id ? "is-active" : ""} onClick={() => chooseCategory(group.id)}>{group.label} <span>{group.items.length}</span></button>)}</nav></aside>
      <div className="faq-main" id="faq-results"><div className="faq-main-heading"><BookOpenCheck size={20} aria-hidden="true" /><div><SectionLabel>Knowledge base</SectionLabel><h2 id="faq-results-title">Answers that a buyer can inspect.</h2></div></div>{visibleCategories.length ? visibleCategories.map((group) => <section className="faq-category" id={`faq-${group.id}`} key={group.id} aria-labelledby={`faq-${group.id}-title`}><div className="faq-category-heading"><p>{group.label}</p><h3 id={`faq-${group.id}-title`}>{group.title}</h3><span>{group.items.length} {group.items.length === 1 ? "answer" : "answers"}</span><p>{group.description}</p></div><Accordion type="multiple" className="faq-accordion">{group.items.map((item, index) => <AccordionItem value={`${group.id}-${index}`} key={item.question} className="faq-accordion-item"><AccordionTrigger className="faq-accordion-trigger"><span className="faq-question-number">{String(index + 1).padStart(2, "0")}</span><span>{item.question}</span></AccordionTrigger><AccordionContent className="faq-accordion-answer"><div>{item.answer}</div></AccordionContent></AccordionItem>)}</Accordion></section>) : <div className="faq-empty"><h3>No matching answers.</h3><p>Try a broader term, clear the search, or send us your question directly.</p><button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>Reset FAQ filters</button></div>}</div>
    </section>
    <section className="faq-cta section-pad section-rule"><div><SectionLabel>Still deciding?</SectionLabel><h2>Bring the working question, not a polished brief.</h2><p>Start a conversation about an evidence, service, research, or AI-governance question. We will route it for review without creating a public claim or automatic engagement.</p></div><a className="button button-primary" href="/contact">Start a conversation <ArrowUpRight size={16} aria-hidden="true" /></a></section>
  </main></MarketingShell>;
}
