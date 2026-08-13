import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { SectionLabel } from "@/components/SiteChrome";

export type CaseStudyRecordView = {
  title: string;
  clientLabel: string;
  sourceName: string;
  sourceAttribution: string;
  sourceUrl?: string | null;
  supportableFinding: string;
  metricDefinition?: string | null;
  scope: string;
  reportingStart: string;
  reportingEnd: string;
  reviewDate: string;
  publicationAuthorization: string;
};

export function CaseStudyRecordLayout({ record, preview = false }: { record: CaseStudyRecordView; preview?: boolean }) {
  const source = record.sourceUrl ? <a className="case-source-link" href={record.sourceUrl} target="_blank" rel="noopener noreferrer">{record.sourceAttribution} <ExternalLink size={14} aria-hidden="true" /></a> : record.sourceAttribution;
  return <article className="case-study-page section-pad"><a className="back-link" href="/case-studies"><ArrowLeft size={15} /> Case studies</a>{preview && <div className="case-preview-notice"><ShieldCheck size={18} aria-hidden="true" /><div><strong>Governance preview — not a client case study.</strong><p>This sample contains no client result, source claim, or performance metric. It exists only to test the approved evidence layout.</p></div></div>}<SectionLabel>Evidence-led case study</SectionLabel><p className="page-kicker">{record.clientLabel}</p><h1>{record.title}</h1><dl className="case-facts"><div><dt>Reporting window</dt><dd>{record.reportingStart} to {record.reportingEnd}</dd></div><div><dt>Evidence review</dt><dd>{record.reviewDate}</dd></div><div><dt>Source attribution</dt><dd>{source}</dd></div><div><dt>Publication status</dt><dd>{preview ? "Preview only — no client claim published" : "Approved for publication"}</dd></div></dl><section className="case-study-section"><h2>The work</h2><p>{record.scope}</p></section><section className="case-study-section"><h2>Verified finding</h2><p>{record.supportableFinding}</p>{record.metricDefinition && <p className="case-metric-context"><strong>Metric context:</strong> {record.metricDefinition}</p>}</section><section className="case-study-section"><h2>Evidence basis</h2><p>This finding is supported by <strong>{record.sourceName}</strong>, reviewed on <strong>{record.reviewDate}</strong>, covering <strong>{record.reportingStart} to {record.reportingEnd}</strong>. {source}</p></section><section className="case-study-section"><h2>What this does—and does not—show</h2><p>This record describes the finding reported for this specific engagement and period. It does not guarantee that another organization will achieve the same outcome.</p></section><section className="case-study-section"><h2>Publication authorization</h2><p>{record.publicationAuthorization}</p></section></article>;
}
