import { MarketingShell } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { CaseStudyRecordLayout } from "@/components/CaseStudyRecordLayout";

const previewRecord = {
  title: "How an approved record becomes a defensible public story.",
  clientLabel: "Preview only — approved client label required",
  sourceName: "Approved source name required",
  sourceAttribution: "Source URL or document reference required before publication",
  supportableFinding: "No supportable finding is displayed in this preview. In an approved record, this section contains only the exact claim the named source supports—using the approved wording.",
  metricDefinition: "Metric unit, denominator, comparison point, and method are retained whenever a metric appears.",
  scope: "Approved scope appears here, including services delivered, relevant channels or markets, and meaningful exclusions.",
  reportingStart: "Reporting start required",
  reportingEnd: "Reporting end required",
  reviewDate: "Review date required",
  publicationAuthorization: "Before publication, this section records that written authorization covers the displayed client label, source attribution, finding wording, and public scope.",
};

export default function CaseStudyPreview() { return <MarketingShell><SeoHead title="Case Study Governance Preview | Coreweaver Labs" description="A non-publishable layout preview for evidence-led, authorized case-study records." path="/case-studies/governance-preview" noIndex /><main><CaseStudyRecordLayout record={previewRecord} preview /></main></MarketingShell>; }
