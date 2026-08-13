export type FallbackInsight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  content: string[];
};

// Editorial starter content keeps the first public Insights pages useful before the studio publishes its first database-backed article.
export const fallbackInsights: FallbackInsight[] = [
  {
    slug: "a-practical-signal-audit",
    title: "What a practical signal audit should reveal",
    excerpt: "A useful audit turns scattered claims, sources, and gaps into a prioritized picture of how a brand is represented in AI answers.",
    category: "Signal systems",
    publishedAt: "2026-08-12",
    content: [
      "A signal audit is not a scorecard for its own sake. It is a working read of the evidence around a company: the facts it publishes, the sources that corroborate those facts, and the language that keeps the story coherent across channels.",
      "Start by identifying the questions buyers actually ask. Then compare the answer a person should receive with the public material an answer engine can reasonably interpret. The distance between those two things is the useful work.",
      "The output should be a short, practical backlog. Some items will be editorial, such as clarifying a category page. Others will be structural, such as connecting a claim to the proof that supports it. The point is to make the next action obvious.",
    ],
  },
  {
    slug: "representation-is-an-operating-concern",
    title: "Representation is now an operating concern",
    excerpt: "When AI systems summarize a category, a company, or a founder, the public evidence around that brand becomes part of its operating environment.",
    category: "AI governance",
    publishedAt: "2026-07-28",
    content: [
      "Brand representation used to be discussed mainly as a communications problem. Today, it is also a systems problem. The way a company appears in AI answers is shaped by the availability, consistency, and authority of its public information.",
      "This does not mean chasing every output. It means deciding which claims matter, documenting the evidence behind them, and maintaining the pages and sources that communicate those claims clearly.",
      "A small governance practice can go a long way: name the owners of key claims, review high-value pages regularly, and keep a record of the sources that should explain your category well. Clarity compounds when it is maintained.",
    ],
  },
  {
    slug: "measurement-without-vanity-metrics",
    title: "Measure presence without chasing vanity metrics",
    excerpt: "A better AI-visibility measurement practice starts with the questions, sources, and audience contexts that matter to the business—not a single dashboard number.",
    category: "Measurement",
    publishedAt: "2026-07-11",
    content: [
      "A single visibility score is tempting because it is easy to present. It can also hide the conditions that make a result meaningful. A company can appear frequently in unimportant contexts while remaining absent from the questions that move a decision.",
      "Start with a small, stable set of queries tied to real buyer needs. Track not only whether a brand appears, but how it is described, which sources are cited, and whether the answer preserves the distinctions the company cares about.",
      "Measurement is most useful when it informs a change in the underlying system. If a review produces no clearer page, source, claim, or priority, it is reporting rather than learning.",
    ],
  },
];

export function formatInsightDate(value: string | Date | null) {
  if (!value) return "In progress";
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}
