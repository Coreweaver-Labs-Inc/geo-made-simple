import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

type HandoffRecord = {
  id: number;
  sourceOwnerApprovedBy: string | null;
  swellReviewer: string | null;
  privacyReviewedBy: string | null;
  plannedPublicationDate: string | null;
  handoffStatus: "pending" | "returned" | "ready";
};

type HandoffValues = {
  sourceOwnerApprovedBy: string;
  swellReviewer: string;
  privacyReviewedBy: string;
  plannedPublicationDate: string;
  handoffStatus: HandoffRecord["handoffStatus"];
};

export function CaseStudyHandoff({ record }: { record: HandoffRecord }) {
  const utils = trpc.useUtils();
  const form = useForm<HandoffValues>({ defaultValues: { sourceOwnerApprovedBy: record.sourceOwnerApprovedBy || "", swellReviewer: record.swellReviewer || "", privacyReviewedBy: record.privacyReviewedBy || "", plannedPublicationDate: record.plannedPublicationDate || "", handoffStatus: record.handoffStatus } });
  const update = trpc.caseStudies.updateHandoff.useMutation({ onSuccess: () => utils.caseStudies.listStudio.invalidate() });
  return <form className="studio-form case-handoff-form" onSubmit={form.handleSubmit(values => update.mutate({ id: record.id, ...values }))}><p className="case-handoff-title">Reviewer handoff — private only</p><div className="form-grid"><label>Source owner approved by<input {...form.register("sourceOwnerApprovedBy")} /></label><label>Swell reviewer<input {...form.register("swellReviewer")} /></label></div><div className="form-grid"><label>Privacy review completed by<input {...form.register("privacyReviewedBy")} /></label><label>Planned publication date<input type="date" {...form.register("plannedPublicationDate")} /></label></div><label>Handoff state<select {...form.register("handoffStatus")}><option value="pending">Pending reviewer handoff</option><option value="returned">Returned for evidence updates</option><option value="ready">Ready for manual public-record creation</option></select></label><p className="form-note">“Ready” records remain private. This does not create a public case study or sitemap entry.</p>{update.error && <p className="studio-error">{update.error.message}</p>}<button className="button button-primary" type="submit" disabled={update.isPending}>{update.isPending ? <><LoaderCircle className="spin" size={15} /> Saving handoff</> : "Save reviewer handoff"}</button></form>;
}
