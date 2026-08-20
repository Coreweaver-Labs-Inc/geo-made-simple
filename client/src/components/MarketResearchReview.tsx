import { trpc } from "@/lib/trpc";
import { useForm } from "react-hook-form";

type MarketResearchRecord = {
  id: number;
  status: "draft" | "reviewed" | "archived";
  reviewerName: string | null;
  reviewConfirmed: boolean;
};

type ReviewValues = {
  status: "draft" | "reviewed" | "archived";
  reviewerName: string;
  reviewConfirmed: boolean;
};

export function MarketResearchReview({ record }: { record: MarketResearchRecord }) {
  const utils = trpc.useUtils();
  const form = useForm<ReviewValues>({ defaultValues: { status: record.status, reviewerName: record.reviewerName || "", reviewConfirmed: record.reviewConfirmed } });
  const review = trpc.marketResearch.review.useMutation({ onSuccess: () => utils.marketResearch.list.invalidate() });

  return <form className="studio-form studio-compact-form market-research-review" onSubmit={form.handleSubmit(values => review.mutate({ id: record.id, ...values }))}>
    <label>Review state<select aria-label={`Review state for market record ${record.id}`} {...form.register("status")}><option value="draft">Draft</option><option value="reviewed">Reviewed</option><option value="archived">Archive</option></select></label>
    <label>Named reviewer<input aria-label={`Named reviewer for market record ${record.id}`} placeholder="Research editor" {...form.register("reviewerName")} /></label>
    <label className="studio-check"><input type="checkbox" {...form.register("reviewConfirmed")} />I confirm the source, limitation, interpretation, and next decision were reviewed.</label>
    {review.error && <p className="studio-error">{review.error.message}</p>}
    <button className="button button-secondary" type="submit" disabled={review.isPending}>{review.isPending ? "Saving…" : "Save private review"}</button>
  </form>;
}
