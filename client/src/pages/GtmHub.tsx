import React, { useEffect, useState } from "react";
import { CheckCircle2, LoaderCircle, Send, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { trpc } from "@/lib/trpc";

type ServiceInterest = "seo" | "content_marketing" | "paid_ads" | "not_sure";
type RequestMode = "service_inquiry" | "support_request";
type ChatMessage = { role: "user" | "assistant"; content: string };
type RequestValues = {
  fullName: string;
  email: string;
  organization: string;
  website: string;
  serviceInterest: ServiceInterest;
  subject: string;
  message: string;
  urgency: "standard" | "high";
  formWebsite: string;
};

const services: Array<{ code: string; id: Exclude<ServiceInterest, "not_sure">; title: string; price: string; note: string; text: string; includes: string[] }> = [
  {
    code: "01",
    id: "seo",
    title: "SEO",
    price: "From $6,500/month",
    note: "Approved commercial starting price; exact scope confirmed before engagement",
    text: "For mid-market B2B teams that need a clearer search, content, and information-architecture system—not disconnected keyword activity.",
    includes: ["Evidence-led search and content baseline", "Technical and buyer-language priorities", "Owned roadmap and measurement review"],
  },
  {
    code: "02",
    id: "content_marketing",
    title: "Content Marketing",
    price: "From $7,500/month",
    note: "Approved commercial starting price; exact scope confirmed before engagement",
    text: "For teams that need useful buyer education, category perspective, and sales-enabling content governed by a coherent editorial operating system.",
    includes: ["Research-led editorial planning", "Decision-useful content and distribution", "Voice, claim, and measurement governance"],
  },
  {
    code: "03",
    id: "paid_ads",
    title: "Paid Ads",
    price: "From $7,500/month",
    note: "Approved commercial starting price; media spend is separate and exact scope is confirmed before engagement",
    text: "For B2B teams that need paid media to test and distribute a clear commercial story, with disciplined campaign operations and reviewable reporting.",
    includes: ["Audience, channel, and message strategy", "Campaign operations and creative coordination", "Measurement review; no ROAS or lead guarantees"],
  },
];

function GtmRequestForm({ suggestedMode, suggestedService }: { suggestedMode?: RequestMode; suggestedService?: ServiceInterest }) {
  const [mode, setMode] = useState<RequestMode>(suggestedMode || "service_inquiry");
  const form = useForm<RequestValues>({ defaultValues: { fullName: "", email: "", organization: "", website: "", serviceInterest: suggestedService || "not_sure", subject: "", message: "", urgency: "standard", formWebsite: "" } });
  const submit = trpc.gtm.submitRequest.useMutation({ onSuccess: () => form.reset() });

  useEffect(() => {
    if (suggestedMode) setMode(suggestedMode);
    if (suggestedService) form.setValue("serviceInterest", suggestedService);
  }, [suggestedMode, suggestedService, form]);

  if (submit.isSuccess) return <div className="gtm-request-success" role="status" aria-live="polite"><CheckCircle2 size={27} aria-hidden="true" /><div><strong>{mode === "support_request" ? "Your support request is in the private queue." : "Your sales request is in the private queue."}</strong><p>An operator will review the context and assign a next step. Submission does not create a public client record, engagement, or claim.</p></div></div>;

  return <form className="gtm-request-form" onSubmit={form.handleSubmit(values => submit.mutate({ ...values, requestType: mode, serviceInterest: mode === "service_inquiry" ? values.serviceInterest : undefined, subject: mode === "support_request" ? values.subject : undefined }))} noValidate>
    <div className="gtm-request-toggle" role="group" aria-label="Request type">
      <button type="button" className={mode === "service_inquiry" ? "is-active" : ""} onClick={() => setMode("service_inquiry")}>Talk to sales</button>
      <button type="button" className={mode === "support_request" ? "is-active" : ""} onClick={() => setMode("support_request")}>Request customer support</button>
    </div>
    <div className="form-honeypot" aria-hidden="true"><label htmlFor="gtm-website">Leave this field empty</label><input id="gtm-website" tabIndex={-1} autoComplete="off" {...form.register("formWebsite")} /></div>
    <div className="form-grid"><label className="form-field">Name<input className="contact-input" autoComplete="name" {...form.register("fullName", { required: "Please enter your name." })} /></label><label className="form-field">Business email<input className="contact-input" type="email" autoComplete="email" {...form.register("email", { required: "Please enter a valid email." })} /></label></div>
    <div className="form-grid"><label className="form-field">Organization<input className="contact-input" autoComplete="organization" {...form.register("organization")} /></label><label className="form-field">Website <i>Optional</i><input className="contact-input" type="url" placeholder="https://" {...form.register("website")} /></label></div>
    {mode === "service_inquiry" ? <label className="form-field">Service interest<select className="contact-input" {...form.register("serviceInterest")}><option value="seo">SEO</option><option value="content_marketing">Content Marketing</option><option value="paid_ads">Paid Ads</option><option value="not_sure">Not sure yet</option></select></label> : <><label className="form-field">Support subject<input className="contact-input" {...form.register("subject", { required: "Please add a short subject." })} /></label><label className="form-field">Urgency<select className="contact-input" {...form.register("urgency")}><option value="standard">Standard</option><option value="high">High</option></select></label></>}
    <label className="form-field">{mode === "support_request" ? "What do you need help with?" : "What outcome are you trying to create?"}<textarea className="contact-textarea" rows={5} {...form.register("message", { required: "Please share enough context for a useful response.", minLength: 30 })} /></label>
    {submit.error && <p className="form-alert" role="alert">{submit.error.message}</p>}
    <button className="button button-primary" type="submit" disabled={submit.isPending}>{submit.isPending ? <><LoaderCircle size={16} className="spin" /> Sending request</> : "Send private request"}</button>
    <p className="form-note">Requests are private and manually triaged. They do not create an engagement, case study, or public profile automatically.</p>
  </form>;
}

function SupportGuide({ onRoute }: { onRoute: (mode: RequestMode, service?: ServiceInterest) => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: "I can help you find the right private next step for SEO, Content Marketing, Paid Ads, or an existing engagement. Please do not share passwords, payment details, or confidential client material here." }]);
  const [draft, setDraft] = useState("");
  const [recommendation, setRecommendation] = useState<{ path: "sales" | "support"; service: ServiceInterest } | null>(null);
  const assistant = trpc.gtm.supportAssistant.useMutation({
    onSuccess: response => {
      setMessages(current => [...current, { role: "assistant", content: response.reply }]);
      setRecommendation({ path: response.recommendedPath, service: response.recommendedService });
    },
    onError: () => setMessages(current => [...current, { role: "assistant", content: "I could not classify that message just now. Please use the private request form and a team member will review it." }]),
  });
  const send = (content: string) => {
    if (content.trim().length < 8 || assistant.isPending) return;
    setMessages(current => [...current, { role: "user", content }]);
    assistant.mutate({ requestType: "support_request", message: content });
    setDraft("");
  };
  return <div className="gtm-support-guide"><div className="gtm-support-chat"><div className="gtm-support-log" role="log" aria-live="polite" aria-label="Support guide conversation">{messages.map((message, index) => <p key={`${message.role}-${index}`} className={`gtm-support-message is-${message.role}`}>{message.content}</p>)}{assistant.isPending && <p className="gtm-support-message is-assistant"><LoaderCircle size={15} className="spin" aria-hidden="true" /> Preparing a routing recommendation…</p>}</div><div className="gtm-support-prompts" aria-label="Suggested questions">{["I need help with an existing engagement", "I’m considering SEO for our B2B team", "We need a paid media strategy"].map(prompt => <button key={prompt} type="button" onClick={() => send(prompt)} disabled={assistant.isPending}>{prompt}</button>)}</div><form className="gtm-support-input" onSubmit={event => { event.preventDefault(); send(draft); }}><label className="sr-only" htmlFor="support-guide-message">Describe what you need help with</label><textarea id="support-guide-message" value={draft} onChange={event => setDraft(event.target.value)} rows={3} placeholder="Describe what you need help with…" /><button className="button button-primary" type="submit" disabled={assistant.isPending || draft.trim().length < 8}>{assistant.isPending ? "Thinking" : <><Send size={15} aria-hidden="true" /> Ask the guide</>}</button></form></div>
    {recommendation && <div className="gtm-route-recommendation" role="status"><ShieldCheck size={18} aria-hidden="true" /><div><strong>{recommendation.path === "sales" ? "Recommended: talk to sales" : "Recommended: request customer support"}</strong><p>A human will review the request before any private record or assignment is created.</p><button className="button button-secondary" type="button" onClick={() => onRoute(recommendation.path === "sales" ? "service_inquiry" : "support_request", recommendation.service)}>Continue to the private form</button></div></div>}
  </div>;
}

export default function GtmHub() {
  const [route, setRoute] = useState<{ mode?: RequestMode; service?: ServiceInterest }>({});
  const routeToForm = (mode: RequestMode, service?: ServiceInterest) => {
    setRoute({ mode, service });
    const target = document.getElementById("request");
    if (target && typeof target.scrollIntoView === "function") target.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return <MarketingShell><SeoHead title="SEO, Content Marketing & Paid Ads for Mid-Market B2B | Coreweaver Labs" description="Evidence-led SEO, Content Marketing, and Paid Ads services for mid-market B2B teams, with transparent starting prices and a private support path." path="/services" /><main>
    <section className="gtm-hero section-pad"><SectionLabel>Mid-market B2B growth systems</SectionLabel><p className="page-kicker">Evidence before activity</p><h1>Make SEO, content, and paid media tell the same commercial story.</h1><p className="page-lede">Coreweaver Labs helps mid-market B2B teams replace fragmented activity with research, clear buyer education, named ownership, and work that can be reviewed.</p><a className="button button-primary" href="#services">Explore the services</a></section>
    <section id="services" className="gtm-service-grid gtm-priced-service-grid section-pad section-rule">{services.map(service => <article key={service.id}><p className="page-kicker">{service.code}</p><h2>{service.title}</h2><p className="gtm-service-price">{service.price}</p><p className="gtm-service-note">{service.note}</p><p>{service.text}</p><ul>{service.includes.map(item => <li key={item}>{item}</li>)}</ul><button type="button" className="text-link" onClick={() => routeToForm("service_inquiry", service.id)}>Start a private {service.title} conversation</button></article>)}</section>
    <section className="gtm-operating-model section-pad section-rule"><div><SectionLabel>Why the premium</SectionLabel><h2>Senior judgment, governed evidence, and integrated execution.</h2></div><div className="gtm-operating-list"><p><b>Research first</b> We establish the buyer, category, and evidence context before committing to activity.</p><p><b>Connected channels</b> SEO, content, and paid media are planned as one operating system rather than separate vendor tasks.</p><p><b>Reviewable decisions</b> Scope, ownership, claims, and measurement are documented so commercial progress can be inspected.</p><p><b>No performance theater</b> We do not promise rankings, leads, revenue, or return on ad spend outside our control.</p></div></section>
    <section className="gtm-support-section section-pad section-rule"><div className="gtm-request-intro"><SectionLabel>AI-assisted first response</SectionLabel><h2>Start with a private question. Reach the right team.</h2><p>The support guide offers an initial routing recommendation for a new sales conversation or an existing-client support need. A human reviews the next step; the chat does not create a customer, sales opportunity, or public record.</p></div><SupportGuide onRoute={routeToForm} /></section>
    <section id="request" className="gtm-request-section section-pad section-rule"><div className="gtm-request-intro"><SectionLabel>Private request intake</SectionLabel><h2>Give the team enough context to respond well.</h2><p>Use this form for a new SEO, Content Marketing, or Paid Ads discussion, or for customer support. Your request enters a private queue for manual sales or support triage.</p></div><GtmRequestForm suggestedMode={route.mode} suggestedService={route.service} /></section>
  </main></MarketingShell>;
}
