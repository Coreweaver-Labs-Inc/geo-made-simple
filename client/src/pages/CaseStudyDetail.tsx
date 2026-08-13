import { useParams } from "wouter";
import { MarketingShell, SectionLabel } from "@/components/SiteChrome";
import { SeoHead } from "@/components/SeoHead";
import { CaseStudyRecordLayout } from "@/components/CaseStudyRecordLayout";
import { trpc } from "@/lib/trpc";

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const query = trpc.caseStudies.bySlug.useQuery({ slug: slug || "" }, { enabled: Boolean(slug), retry: false });
  if (query.isLoading) return <MarketingShell><main className="section-pad"><p className="page-kicker">Loading case study…</p></main></MarketingShell>;
  if (!query.data) return <MarketingShell><main className="section-pad"><SectionLabel>Case studies</SectionLabel><h1>That approved case study is not available.</h1><a className="text-link" href="/case-studies">Back to Case studies</a></main></MarketingShell>;
  const record = query.data;
  return <MarketingShell><SeoHead title={`${record.title} | Coreweaver Labs`} description={record.supportableFinding} path={`/case-studies/${record.slug}`} ogType="article" /><main><CaseStudyRecordLayout record={record} /></main></MarketingShell>;
}
