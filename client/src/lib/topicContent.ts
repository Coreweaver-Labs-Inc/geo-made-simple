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

export type ChildTopic = {
  parentSlug: string;
  slug: string;
  label: string;
  title: string;
  description: string;
  kicker: string;
  buyerProblem: string;
  decision: string;
  approach: string;
  includes: string[];
  boundary: string;
  serviceLink: TopicLink;
  relatedResources: TopicLink[];
  searchTerms: string[];
};

export type TopicSearchResult = {
  href: string;
  label: string;
  title: string;
  description: string;
  kind: "Hub" | "Topic" | "Guide";
  score: number;
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

export const childTopics: ChildTopic[] = [
  {
    parentSlug: "b2b-seo",
    slug: "website-information-architecture",
    label: "B2B website information architecture",
    title: "B2B website information architecture",
    description: "A practical guide to organizing B2B service, method, evidence, and next-step information around the questions a buyer needs to answer.",
    kicker: "Make commercial information easier to find",
    buyerProblem: "A B2B website can have useful material and still make buyers work too hard to understand the offer, locate the right explanation, or connect a claim to its context. The friction is usually not a missing page alone. It is a weak relationship between buyer questions, page purpose, navigation, evidence, and the next useful action.",
    decision: "Decide which buyer questions deserve a source-of-truth page, what each page must explain, and how those pages should connect without forcing a visitor to reconstruct the commercial story.",
    approach: "Coreweaver Labs treats website information architecture as an editorial and operating choice. A useful structure gives each important page a plain-language purpose, a clear relationship to related information, a responsible owner, and a reason to be reviewed when the offer or evidence changes.",
    includes: ["A buyer-question map for service, method, proof, and support information", "A page-purpose and navigation review that surfaces overlap, gaps, and handoff friction", "A source-of-truth and refresh pattern for information that must remain current"],
    boundary: "Clearer website architecture can make information easier to inspect and navigate. It does not guarantee search rankings, traffic, leads, conversions, AI visibility, or revenue.",
    serviceLink: { href: "/services", label: "Explore evidence-led B2B SEO services" },
    relatedResources: [{ href: "/topics/b2b-seo", label: "Mid-market B2B SEO systems" }, { href: "/framework", label: "The ARM Framework" }, { href: "/insights/a-practical-signal-audit", label: "What a practical signal audit should reveal" }, { href: "/topics/b2b-content-marketing/buyer-enablement", label: "B2B buyer enablement content" }],
    searchTerms: ["website information architecture", "site structure", "website navigation", "service pages", "buyers cannot find information", "find the right page", "content hierarchy", "b2b seo", "source of truth pages", "organize our website"],
  },
  {
    parentSlug: "b2b-content-marketing",
    slug: "buyer-enablement",
    label: "B2B buyer enablement content",
    title: "B2B buyer enablement content",
    description: "A practical guide to creating B2B content that helps a buying group understand the problem, inspect the approach, and take a clearer next step.",
    kicker: "Give buying groups useful decision context",
    buyerProblem: "B2B buyers often encounter a category, a service page, a campaign, and a sales conversation as separate explanations. Even strong content can fail to help if it does not anticipate the questions different stakeholders need to resolve before they can move together.",
    decision: "Decide which questions deserve public education, which evidence or limitations belong alongside the answer, and how a page should hand the reader to the next useful source rather than a generic call to action.",
    approach: "Coreweaver Labs approaches buyer enablement as a connected editorial system. The work begins with the decision a reader is trying to make, then connects a plain-language explanation to current sources, a disclosed point of view, relevant adjacent resources, and a review routine.",
    includes: ["A buying-group question map that distinguishes awareness, evaluation, and handoff needs", "Content briefs that define the reader decision, supporting source plan, and adjacent resource", "A refresh and claim-review pattern that keeps buyer education current and inspectable"],
    boundary: "Useful buyer education does not guarantee demand, citations, lead volume, pipeline, revenue, or agreement from a buying group. It makes the information available for a clearer review.",
    serviceLink: { href: "/services", label: "Explore evidence-led Content Marketing services" },
    relatedResources: [{ href: "/topics/b2b-content-marketing", label: "B2B Content Marketing systems" }, { href: "/research", label: "Research methods and editorial standards" }, { href: "/faq#faq-evidence", label: "Research and evidence FAQ answers" }, { href: "/topics/b2b-seo/website-information-architecture", label: "B2B website information architecture" }],
    searchTerms: ["buyer enablement", "buying group", "buying committee", "content helps buyers decide", "buyer education", "decision content", "content marketing", "thought leadership", "content strategy", "help buyers understand"],
  },
  {
    parentSlug: "b2b-paid-ads",
    slug: "message-landing-page-alignment",
    label: "B2B paid-message and landing-page alignment",
    title: "B2B paid ads and landing-page alignment",
    description: "A practical guide to reviewing whether a B2B paid message, landing-page explanation, and follow-up context ask a buyer to understand the same thing.",
    kicker: "Test one coherent commercial explanation",
    buyerProblem: "A paid message can be concise while its destination is detailed, generic, or aimed at a different question. That disconnect makes it harder for a buyer to understand what the offer is for, what they should inspect next, or whether the promised context continues after the click.",
    decision: "Decide which buyer question the message is introducing, what the destination must explain before requesting action, and what shared terms need to stay stable across the ad, page, and follow-up context.",
    approach: "Coreweaver Labs treats paid-message alignment as a reviewable continuity system. The work connects the audience assumption, message, landing-page purpose, evidence boundary, next step, and a record of what a test can and cannot teach.",
    includes: ["A message-to-destination review that checks whether the same buyer question carries through the path", "A landing-page purpose and evidence-boundary check before activity is expanded", "A learning record that distinguishes delivery observations from commercial claims"],
    boundary: "Message and landing-page alignment can make a test easier to inspect and improve. It does not guarantee clicks, cost efficiency, leads, pipeline, revenue, return on ad spend, or buyer agreement.",
    serviceLink: { href: "/services", label: "Explore evidence-led B2B Paid Ads services" },
    relatedResources: [{ href: "/topics/b2b-paid-ads", label: "B2B Paid Ads and message systems" }, { href: "/topics/b2b-content-marketing/buyer-enablement", label: "B2B buyer enablement content" }, { href: "/framework", label: "The ARM Framework" }, { href: "/services", label: "Service scope and private next steps" }],
    searchTerms: ["paid ads landing page alignment", "paid message alignment", "ad message does not match landing page", "b2b paid media", "landing page clarity", "campaign message continuity", "paid media testing", "message to destination", "paid ads", "b2b offer clarity"],
  },
];

export function getTopic(slug: string | undefined) {
  return topics.find((topic) => topic.slug === slug);
}

export function getChildTopic(parentSlug: string | undefined, slug: string | undefined) {
  return childTopics.find((topic) => topic.parentSlug === parentSlug && topic.slug === slug);
}

export function getChildTopicsForParent(parentSlug: string | undefined) {
  return childTopics.filter((topic) => topic.parentSlug === parentSlug);
}

const stopWords = new Set(["a", "an", "and", "are", "can", "for", "from", "help", "i", "in", "is", "it", "my", "need", "of", "our", "the", "to", "we", "with"]);

function words(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter((word) => word.length > 1 && !stopWords.has(word));
}

function buildSearchEntries(): Array<Omit<TopicSearchResult, "score"> & { searchText: string; searchTerms: string[] }> {
  const hub = [{ href: "/topics", label: "B2B Growth Topics", title: "B2B Growth Topics", description: "A connected learning path across SEO, content, paid media, AI representation, and content governance.", kind: "Hub" as const, searchTerms: ["b2b growth topics", "where should we start", "growth system", "commercial story", "find a topic"] }];
  const pillars = topics.map((topic) => ({ href: `/topics/${topic.slug}`, label: topic.label, title: topic.title, description: topic.description, kind: "Topic" as const, searchTerms: [topic.label, topic.title, topic.buyerProblem, topic.approach] }));
  const guides = childTopics.map((topic) => ({ href: `/topics/${topic.parentSlug}/${topic.slug}`, label: topic.label, title: topic.title, description: topic.description, kind: "Guide" as const, searchTerms: topic.searchTerms }));
  return [...hub, ...pillars, ...guides].map((entry) => ({ ...entry, searchText: words([entry.label, entry.title, entry.description, ...entry.searchTerms].join(" ")).join(" ") }));
}

const searchEntries = buildSearchEntries();

export function searchTopicLibrary(query: string, limit = 4): TopicSearchResult[] {
  const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const queryWords = words(query);
  if (!normalizedQuery || queryWords.length === 0) return [];

  return searchEntries.map(({ searchText, searchTerms, ...entry }) => {
    const phraseScore = searchTerms.reduce((score, term) => {
      const normalizedTerm = term.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      return normalizedTerm.length > 2 && normalizedQuery.includes(normalizedTerm) ? score + Math.max(5, words(normalizedTerm).length * 4) : score;
    }, 0);
    const matchingWords = queryWords.filter((word) => searchText.includes(word)).length;
    return { ...entry, score: phraseScore + matchingWords * 2 };
  }).filter((entry) => entry.score > 0).sort((first, second) => second.score - first.score || first.title.localeCompare(second.title)).slice(0, limit);
}
