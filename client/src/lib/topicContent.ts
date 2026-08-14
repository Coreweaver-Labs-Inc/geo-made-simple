export type TopicLink = { href: string; label: string };

export type Topic = {
  slug: string;
  label: string;
  title: string;
  description: string;
  kicker: string;
  buyerProblem: string;
  approach: string;
  includes: string[];
  boundary: string;
  serviceLink: TopicLink;
  relatedResources: TopicLink[];
  relatedTopicSlugs: string[];
};

export const topics: Topic[] = [
  {
    slug: "b2b-seo",
    label: "Mid-market B2B SEO",
    title: "Mid-market B2B SEO systems",
    description: "A practical guide to making mid-market B2B expertise, services, and buyer language easier to find and understand in search.",
    kicker: "Search clarity for B2B teams",
    buyerProblem: "B2B SEO becomes difficult when the pages, evidence, and buyer language around a company tell disconnected stories. Useful search work starts by making the commercial information people need easier to locate, interpret, and maintain.",
    approach: "Coreweaver Labs treats SEO as an evidence and information-architecture system. The work connects buyer questions, service pages, source material, technical priorities, and review routines before activity is expanded.",
    includes: ["A buyer-question and service-language baseline", "Claim, source, and information-architecture review", "A prioritized roadmap that can be owned and revisited"],
    boundary: "A clear SEO system can make work more reviewable. It does not guarantee rankings, traffic, leads, or revenue.",
    serviceLink: { href: "/services", label: "Explore evidence-led B2B SEO services" },
    relatedResources: [{ href: "/framework", label: "The ARM Framework" }, { href: "/research", label: "Research methods and source standards" }, { href: "/insights/a-practical-signal-audit", label: "What a practical signal audit should reveal" }],
    relatedTopicSlugs: ["b2b-content-marketing", "ai-representation"],
  },
  {
    slug: "b2b-content-marketing",
    label: "B2B Content Marketing",
    title: "B2B Content Marketing systems",
    description: "A practical guide to buyer education, category perspective, and governed content operations for mid-market B2B teams.",
    kicker: "Content that teaches a buyer something useful",
    buyerProblem: "A busy B2B team can publish frequently and still leave its buyers unclear about the category, the company’s point of view, or the next decision. The issue is often not volume; it is whether the content works together as useful buyer education.",
    approach: "Coreweaver Labs connects editorial planning to real buyer questions, current source material, category perspective, distribution choices, and a repeatable review habit. The aim is a commercial story that can be taught and maintained.",
    includes: ["Research-led editorial priorities", "Content models that connect expertise to buyer decisions", "Voice, claim, and refresh governance"],
    boundary: "Publishing useful content does not guarantee demand, citations, pipeline, or revenue. It creates material that can be inspected, improved, and used consistently.",
    serviceLink: { href: "/services", label: "Explore evidence-led Content Marketing services" },
    relatedResources: [{ href: "/research", label: "Research methods and editorial standards" }, { href: "/framework", label: "The ARM Framework" }, { href: "/insights/representation-is-an-operating-concern", label: "Representation is now an operating concern" }],
    relatedTopicSlugs: ["content-governance", "b2b-seo"],
  },
  {
    slug: "b2b-paid-ads",
    label: "B2B Paid Ads",
    title: "B2B Paid Ads and message systems",
    description: "A practical guide to coordinating B2B paid media, landing-page clarity, message testing, and reviewable reporting.",
    kicker: "Paid media that tests a clear commercial story",
    buyerProblem: "Paid media can create more activity without creating more learning when the audience, offer, landing page, and sales story are disconnected. A useful paid-media system needs a clear proposition and a way to review what each test actually teaches.",
    approach: "Coreweaver Labs approaches paid ads as a coordinated message and learning system. It connects audience, channel, creative, landing-page continuity, and measurement review so decisions can be documented rather than treated as platform theater.",
    includes: ["Audience, channel, and message strategy", "Creative and landing-page continuity", "Campaign operations with reviewable reporting"],
    boundary: "Paid-media work does not guarantee leads, cost efficiency, pipeline, revenue, or return on ad spend. Platforms, buyer behavior, and markets remain independent.",
    serviceLink: { href: "/services", label: "Explore evidence-led B2B Paid Ads services" },
    relatedResources: [{ href: "/framework", label: "The ARM Framework" }, { href: "/faq#faq-services", label: "Service scope and no-guarantee FAQ answers" }, { href: "/insights/measurement-without-vanity-metrics", label: "Measure presence without chasing vanity metrics" }],
    relatedTopicSlugs: ["b2b-content-marketing", "content-governance"],
  },
  {
    slug: "ai-representation",
    label: "AI Representation",
    title: "AI representation for B2B brands",
    description: "A practical guide to reviewing how public information shapes AI answers about a mid-market B2B company without promising visibility or citation.",
    kicker: "Make public information easier to interpret",
    buyerProblem: "When buyers ask an AI system about a category, a company, or a founder, the answer may rely on incomplete or inconsistent public information. The practical question is whether the facts, sources, and buyer language available to those systems accurately reflect the business.",
    approach: "Coreweaver Labs reviews buyer questions, answer contexts, source patterns, and the public information that supports important claims. It then connects ambiguity to a clearer page, source, owner, or review action.",
    includes: ["Buyer-question and answer-context review", "Source and representation mapping", "A practical backlog for clearer public information"],
    boundary: "Clearer public information does not guarantee that any AI system will surface, describe, or cite a company.",
    serviceLink: { href: "/services", label: "Discuss an AI representation and growth-system review" },
    relatedResources: [{ href: "/research", label: "Research methods and claim-review standards" }, { href: "/ai-data-policy", label: "Coreweaver Labs AI Data Policy" }, { href: "/insights/representation-is-an-operating-concern", label: "Representation is now an operating concern" }],
    relatedTopicSlugs: ["content-governance", "b2b-seo"],
  },
  {
    slug: "content-governance",
    label: "Content Governance",
    title: "Content governance for B2B growth teams",
    description: "A practical guide to keeping B2B public claims, sources, ownership, and review routines accurate as content and campaigns grow.",
    kicker: "Keep the facts, sources, and approvals visible",
    buyerProblem: "As a B2B company publishes more pages, campaigns, research, and sales material, important facts can become disconnected from their sources and owners. That increases the chance of unclear or outdated public claims.",
    approach: "Coreweaver Labs frames governance as a working habit: name the claims that matter, connect them to current support, make an owner visible, and establish how the record will be reviewed, corrected, or retired.",
    includes: ["Claim and source mapping", "Ownership and approval routines", "Correction, refresh, and evidence-review practices"],
    boundary: "Content governance does not guarantee that an unsupported assertion becomes evidence or permit private material to become public. It makes public work more inspectable.",
    serviceLink: { href: "/services", label: "Discuss governed SEO, content, and paid-media operations" },
    relatedResources: [{ href: "/research", label: "Research methods and editorial standards" }, { href: "/case-studies", label: "Authorized case-study evidence standards" }, { href: "/faq#faq-evidence", label: "Research and evidence FAQ answers" }],
    relatedTopicSlugs: ["ai-representation", "b2b-content-marketing"],
  },
];

export function getTopic(slug: string | undefined) {
  return topics.find((topic) => topic.slug === slug);
}
