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

function StudioContent() {
  const { user, loading } = useAuth();
  const articles = trpc.insights.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const inquiries = trpc.contact.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const caseStudyIntakes = trpc.caseStudies.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
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
