import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { CaseStudyHandoff } from "@/components/CaseStudyHandoff";
import { SeoHead } from "@/components/SeoHead";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";

type ArticleValues = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  contentType: "article" | "research_brief" | "field_brief";
  sourceReferences: string;
  methodNote: string;
  claimReviewer: string;
  claimReviewConfirmed: boolean;
  status: "draft" | "published";
};

type SignalValues = {
  sourceType: "manual_trend_snapshot" | "search_console" | "analytics" | "research";
  sourceReference: string;
  silo: "website_clarity" | "buyer_enablement" | "paid_message_learning" | "ai_representation" | "content_governance";
  buyerQuestion: string;
  summary: string;
  sourceWindow: string;
};

type QueueScheduleValues = { cron: string };

function StudioContent() {
  const { user, loading } = useAuth();
  const articles = trpc.insights.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const inquiries = trpc.contact.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const caseStudyIntakes = trpc.caseStudies.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const queue = trpc.contentQueue.status.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const signals = trpc.contentQueue.listSignals.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const briefRecords = trpc.contentQueue.listBriefs.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const utils = trpc.useUtils();
  const form = useForm<ArticleValues>({
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Signal systems",
      contentType: "article",
      sourceReferences: "",
      methodNote: "",
      claimReviewer: "",
      claimReviewConfirmed: false,
      status: "draft",
    },
  });
  const signalForm = useForm<SignalValues>({
    defaultValues: { sourceType: "manual_trend_snapshot", sourceReference: "", silo: "paid_message_learning", buyerQuestion: "", summary: "", sourceWindow: "" },
  });
  const scheduleForm = useForm<QueueScheduleValues>({ defaultValues: { cron: "0 0 9 * * 1" } });
  const contentType = form.watch("contentType");
  const status = form.watch("status");
  const isResearch = contentType !== "article";
  const publishingResearch = isResearch && status === "published";
  const save = trpc.insights.create.useMutation({
    onSuccess: () => {
      form.reset();
      utils.insights.listStudio.invalidate();
    },
  });
  const createSignal = trpc.contentQueue.createSignal.useMutation({ onSuccess: () => { signalForm.reset(); signals.refetch(); } });
  const approveSignal = trpc.contentQueue.approveSignal.useMutation({ onSuccess: () => signals.refetch() });
  const enableSchedule = trpc.contentQueue.enableSchedule.useMutation({ onSuccess: () => queue.refetch() });

  if (loading) return <div className="studio-state"><LoaderCircle className="spin" /> Loading your studio…</div>;
  if (!user) return <div className="studio-state"><h1>Sign in to manage Insights.</h1><button className="button button-primary" onClick={() => startLogin()}>Sign in</button></div>;
  if (user.role !== "admin") return <div className="studio-state"><h1>This studio is restricted.</h1><p>Ask the project owner to grant editor access.</p></div>;

  return (
    <div className="studio-wrap">
      <SeoHead title="Publishing Studio | Coreweaver Labs" description="Private publishing workspace." path="/studio" noIndex />
      <header className="studio-heading">
        <span>Coreweaver Labs</span>
        <h1>Publishing studio</h1>
        <p>Publish an insight or review the inquiries and evidence records waiting for a response.</p>
      </header>
      <div className="studio-grid">
        <section className="studio-card">
          <h2>Write an insight</h2>
          <p className="studio-queue-note">Research records may be saved as drafts, but source, method, named-reviewer, and claim-review fields are required before they can publish.</p>
          <form className="studio-form" onSubmit={form.handleSubmit(values => save.mutate(values))}>
            <label>Title<input {...form.register("title", { required: true, minLength: 12, maxLength: 180 })} /></label>
            <label>Slug<input placeholder="clear-signal-systems" {...form.register("slug", { required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ })} /></label>
            <label>Category<input {...form.register("category", { required: true, maxLength: 80 })} /></label>
            <label>Publication type
              <select {...form.register("contentType")}>
                <option value="article">Article</option>
                <option value="research_brief">Research brief</option>
                <option value="field_brief">Field brief</option>
              </select>
            </label>
            <label>Summary<textarea rows={3} {...form.register("excerpt", { required: true, minLength: 40, maxLength: 1200 })} /></label>
            <label>Article content<textarea rows={10} placeholder="Use blank lines between paragraphs." {...form.register("content", { required: true, minLength: 120, maxLength: 50000 })} /></label>
            {isResearch && (
              <fieldset className="studio-research-fields">
                <legend>Research publication review</legend>
                <p>Provide a traceable method and sources. These records remain private drafts until their claim-review gate is complete.</p>
                <label>Source references<textarea rows={4} placeholder="One source URL or citation per line." {...form.register("sourceReferences", { validate: value => !publishingResearch || Boolean(value.trim()) || "Source references are required before publishing research." })} /></label>
                <label>Method note<textarea rows={4} placeholder="Describe the question, evidence scope, and how sources were assessed." {...form.register("methodNote", { validate: value => !publishingResearch || Boolean(value.trim()) || "A method note is required before publishing research." })} /></label>
                <label>Claim reviewer<input placeholder="Named editor or subject-matter reviewer" {...form.register("claimReviewer", { validate: value => !publishingResearch || Boolean(value.trim()) || "A named claim reviewer is required before publishing research." })} /></label>
                <label className="studio-check"><input type="checkbox" {...form.register("claimReviewConfirmed", { validate: value => !publishingResearch || value || "Confirm claim review before publishing research." })} />I confirm that this publication’s claims, sources, limitations, and wording have been reviewed.</label>
              </fieldset>
            )}
            <label>Status<select {...form.register("status")}><option value="draft">Draft</option><option value="published">Publish now</option></select></label>
            {save.error && <p className="studio-error">{save.error.message}</p>}
            <button className="button button-primary" disabled={save.isPending}>{save.isPending ? <><LoaderCircle className="spin" size={15} /> Saving</> : <><Send size={15} /> Save article</>}</button>
          </form>
        </section>
        <section className="studio-card">
          <h2>Recent articles</h2>
          <div className="studio-list">{articles.data?.length ? articles.data.map(article => <div key={article.id}><strong>{article.title}</strong><span>{article.contentType.replace("_", " ")} · {article.status} · /insights/{article.slug}</span>{article.contentType !== "article" && <p><b>Research review:</b> {article.claimReviewConfirmed ? `confirmed by ${article.claimReviewer || "named reviewer"}` : "draft or incomplete"}</p>}</div>) : <p>No database articles yet. Publish your first note here.</p>}</div>
        </section>
      </div>
      <section className="studio-card inquiries-card">
        <h2>Trend-to-draft queue</h2>
        <p className="studio-queue-note">Add only minimized, aggregate signals with a named source contract. An approved signal may create one private field-brief draft. It cannot publish, post externally, retain raw visitor input, or substitute for source and claim review.</p>
        <div className="studio-queue-status"><p><b>Queue:</b> {queue.data?.isEnabled ? "enabled" : "disabled"} · {queue.data?.cronExpression || "weekly schedule not configured"} · model {queue.data?.model || "gpt-5-mini"}</p><p>{queue.data?.lastRunAt ? `Last run: ${queue.data.lastRunAt.toLocaleString()}` : "No scheduled run has completed."}</p></div>
        <form className="studio-form studio-compact-form" onSubmit={scheduleForm.handleSubmit(values => enableSchedule.mutate(values))}>
          <label>Background schedule, UTC<input aria-label="Background schedule, UTC" {...scheduleForm.register("cron", { required: true })} /></label>
          <button className="button button-primary" disabled={enableSchedule.isPending}>{enableSchedule.isPending ? "Enabling…" : queue.data?.isEnabled ? "Update schedule" : "Enable weekly draft queue"}</button>
        </form>
        {enableSchedule.error && <p className="studio-error">{enableSchedule.error.message}</p>}
        <form className="studio-form studio-signal-form" onSubmit={signalForm.handleSubmit(values => createSignal.mutate(values))}>
          <h3>Add a private editorial signal</h3>
          <label>Signal source<select {...signalForm.register("sourceType")}><option value="manual_trend_snapshot">Approved trend snapshot</option><option value="search_console">Search performance summary</option><option value="analytics">Aggregate analytics summary</option><option value="research">Named research source</option></select></label>
          <label>Source or report reference<input {...signalForm.register("sourceReference", { required: true, minLength: 6 })} /></label>
          <label>Content silo<select {...signalForm.register("silo")}><option value="website_clarity">Website clarity and B2B SEO</option><option value="buyer_enablement">Buyer enablement and content marketing</option><option value="paid_message_learning">Paid-message learning</option><option value="ai_representation">AI representation</option><option value="content_governance">Content governance</option></select></label>
          <label>Buyer question<input {...signalForm.register("buyerQuestion", { required: true, minLength: 12 })} /></label>
          <label>Aggregate signal summary<textarea rows={3} placeholder="Describe a trend or pattern without raw queries, visitor identifiers, or private client data." {...signalForm.register("summary", { required: true, minLength: 30 })} /></label>
          <label>Observation window<input placeholder="e.g., 2026-08-01 to 2026-08-14" {...signalForm.register("sourceWindow", { required: true })} /></label>
          {createSignal.error && <p className="studio-error">{createSignal.error.message}</p>}
          <button className="button button-primary" disabled={createSignal.isPending}>{createSignal.isPending ? "Saving…" : "Save private signal"}</button>
        </form>
        <div className="studio-list">{signals.data?.length ? signals.data.map(signal => <div key={signal.id}><strong>{signal.buyerQuestion}</strong><span>{signal.silo.replaceAll("_", " ")} · {signal.sourceType.replaceAll("_", " ")} · {signal.status}</span><p>{signal.summary}</p><p><b>Source contract:</b> {signal.sourceReference} · {signal.sourceWindow}</p>{signal.status === "pending" && <button className="text-link" type="button" onClick={() => approveSignal.mutate({ id: signal.id })} disabled={approveSignal.isPending}>Approve for draft generation</button>}</div>) : <p>No private signals yet. Add a minimized, source-named signal for review.</p>}</div>
        <h3>Generated draft audit</h3>
        <div className="studio-list">{briefRecords.data?.length ? briefRecords.data.map(record => <div key={record.id}><strong>Signal #{record.signalId} · {record.status.replaceAll("_", " ")}</strong><span>{record.model} · draft insight {record.draftInsightId || "not created"}</span>{record.errorCode && <p><b>Run note:</b> {record.errorCode}</p>}</div>) : <p>No queue records yet. Approved signals remain private until a scheduled run claims them.</p>}</div>
      </section>
      <section className="studio-card inquiries-card">
        <h2>Case-study evidence queue</h2>
        <p className="studio-queue-note">Intake records are private and cannot publish automatically. Review the source-owner record, privacy and claim-safety checks, then complete the reviewer handoff before manually creating a separate approved public record.</p>
        <div className="studio-list">{caseStudyIntakes.data?.length ? caseStudyIntakes.data.map(record => <div key={record.id}><strong>{record.clientLabel}</strong><span>{record.status} · {record.reportingStart} to {record.reportingEnd} · reviewed {record.reviewDate}</span><p><b>Source:</b> {record.sourceName} — {record.sourceReference}</p><p><b>Finding:</b> {record.supportableFinding}</p>{record.metricDefinition && <p><b>Metric context:</b> {record.metricDefinition}</p>}<p><b>Safety checks:</b> {record.privacyReviewConfirmed && record.claimReviewConfirmed && record.authorizationConfirmed ? "confirmed" : "incomplete"}</p><CaseStudyHandoff record={record} /></div>) : <p>No case-study evidence records yet.</p>}</div>
      </section>
      <section className="studio-card inquiries-card">
        <h2>Recent inquiries</h2>
        <div className="studio-list">{inquiries.data?.length ? inquiries.data.map(inquiry => <div key={inquiry.id}><strong>{inquiry.fullName} · {inquiry.email}</strong><span>{inquiry.organization || "Independent"} · {inquiry.createdAt.toLocaleDateString()}</span><p>{inquiry.message}</p></div>) : <p>No contact submissions yet.</p>}</div>
      </section>
    </div>
  );
}

export default function Studio() {
  return <DashboardLayout><StudioContent /></DashboardLayout>;
}
