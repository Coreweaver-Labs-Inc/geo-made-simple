import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { SeoHead } from "@/components/SeoHead";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { CaseStudyHandoff } from "@/components/CaseStudyHandoff";

type ArticleValues = { title: string; slug: string; excerpt: string; content: string; category: string; status: "draft" | "published" };

function StudioContent() {
  const { user, loading } = useAuth();
  const articles = trpc.insights.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const inquiries = trpc.contact.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const caseStudyIntakes = trpc.caseStudies.listStudio.useQuery(undefined, { enabled: user?.role === "admin", retry: false });
  const utils = trpc.useUtils();
  const form = useForm<ArticleValues>({ defaultValues: { title: "", slug: "", excerpt: "", content: "", category: "Signal systems", status: "draft" } });
  const save = trpc.insights.create.useMutation({ onSuccess: () => { form.reset(); utils.insights.listStudio.invalidate(); } });

  if (loading) return <div className="studio-state"><LoaderCircle className="spin" /> Loading your studio…</div>;
  if (!user) return <div className="studio-state"><h1>Sign in to manage Insights.</h1><button className="button button-primary" onClick={() => startLogin()}>Sign in</button></div>;
  if (user.role !== "admin") return <div className="studio-state"><h1>This studio is restricted.</h1><p>Ask the project owner to grant editor access.</p></div>;

  return <div className="studio-wrap"><SeoHead title="Publishing Studio | Coreweaver Labs" description="Private publishing workspace." path="/studio" noIndex /><header className="studio-heading"><span>Coreweaver Labs</span><h1>Publishing studio</h1><p>Publish an insight or review the inquiries and evidence records waiting for a response.</p></header><div className="studio-grid"><section className="studio-card"><h2>Write an insight</h2><form className="studio-form" onSubmit={form.handleSubmit(values => save.mutate(values))}><label>Title<input {...form.register("title", { required: true, minLength: 12, maxLength: 180 })} /></label><label>Slug<input placeholder="clear-signal-systems" {...form.register("slug", { required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ })} /></label><label>Category<input {...form.register("category", { required: true, maxLength: 80 })} /></label><label>Summary<textarea rows={3} {...form.register("excerpt", { required: true, minLength: 40, maxLength: 1200 })} /></label><label>Article content<textarea rows={10} placeholder="Use blank lines between paragraphs." {...form.register("content", { required: true, minLength: 120, maxLength: 50000 })} /></label><label>Status<select {...form.register("status")}><option value="draft">Draft</option><option value="published">Publish now</option></select></label>{save.error && <p className="studio-error">{save.error.message}</p>}<button className="button button-primary" disabled={save.isPending}>{save.isPending ? <><LoaderCircle className="spin" size={15} /> Saving</> : <><Send size={15} /> Save article</>}</button></form></section><section className="studio-card"><h2>Recent articles</h2><div className="studio-list">{articles.data?.length ? articles.data.map(article => <div key={article.id}><strong>{article.title}</strong><span>{article.status} · /insights/{article.slug}</span></div>) : <p>No database articles yet. Publish your first note here.</p>}</div></section></div><section className="studio-card inquiries-card"><h2>Case-study evidence queue</h2><p className="studio-queue-note">Intake records are private and cannot publish automatically. Review the source-owner record, privacy and claim-safety checks, then complete the reviewer handoff before manually creating a separate approved public record.</p><div className="studio-list">{caseStudyIntakes.data?.length ? caseStudyIntakes.data.map(record => <div key={record.id}><strong>{record.clientLabel}</strong><span>{record.status} · {record.reportingStart} to {record.reportingEnd} · reviewed {record.reviewDate}</span><p><b>Source:</b> {record.sourceName} — {record.sourceReference}</p><p><b>Finding:</b> {record.supportableFinding}</p>{record.metricDefinition && <p><b>Metric context:</b> {record.metricDefinition}</p>}<p><b>Safety checks:</b> {record.privacyReviewConfirmed && record.claimReviewConfirmed && record.authorizationConfirmed ? "confirmed" : "incomplete"}</p><CaseStudyHandoff record={record} /></div>) : <p>No case-study evidence records yet.</p>}</div></section><section className="studio-card inquiries-card"><h2>Recent inquiries</h2><div className="studio-list">{inquiries.data?.length ? inquiries.data.map(inquiry => <div key={inquiry.id}><strong>{inquiry.fullName} · {inquiry.email}</strong><span>{inquiry.organization || "Independent"} · {inquiry.createdAt.toLocaleDateString()}</span><p>{inquiry.message}</p></div>) : <p>No contact submissions yet.</p>}</div></section></div>;
}

export default function Studio() { return <DashboardLayout><StudioContent /></DashboardLayout>; }
