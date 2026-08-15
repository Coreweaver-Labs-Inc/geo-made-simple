# Coreweaver Labs Content Operations Foundation

**Status:** Design specification only. No scheduled job, third-party API connection, tracking change, automated content generation, or autonomous public publishing is enabled by this document.

## Purpose

Coreweaver should evolve its content library from **trusted signals into reviewable editorial work**, not from raw keywords into automatically published pages. The operating loop is designed to deepen existing topic clusters, preserve source and claim governance, and give every public page a clear reader decision, owner, source plan, and internal-link path.

> **Publication rule:** No signal can publish a page. A signal can create only a private candidate brief. Existing Studio controls remain mandatory: named author, public-facing purpose, sources where applicable, method note for research, named claim reviewer, claim-review confirmation, and a conscious human decision to publish.

## Signal Hierarchy

| Signal class | Example input | Permitted use | Not permitted |
|---|---|---|---|
| **Owned topic map** | Approved cluster, guide brief, related-resource gap, page refresh date | Identify the next connected guide, refresh, or internal link to investigate. | Creating many near-duplicate keyword pages. |
| **Search performance** | Search Console queries, impressions, clicks, position, indexing status | Surface repeated buyer language and pages needing clarification or a refresh. Search Console describes its reports as a way to inspect queries, impressions, clicks, and indexing. [1] | Treating a query as proof of buyer intent, demand, or commercial value. |
| **Aggregate visitor behavior** | Landing pages, referrers, campaign parameters, resource-card clicks, topic-finder result selection | Identify navigation friction and paths that may need a clearer related resource. Umami presents aggregate traffic, referrer, campaign, event, journey, and funnel analysis with a privacy-first posture. [2] | Storing raw search text, personal data, session recordings, or sensitive visitor data in editorial records. |
| **Trend research** | Google Trends topic/term comparisons, regional changes, recurring seasonality | Add a contextual research question to a private brief. Google’s Trends API is currently an alpha program requiring acceptance. [3] | Using a trend spike as a reason to publish unsupported commentary or claiming the data predicts revenue. |
| **Human-sourced signals** | Sales/support question themes, researcher observation, community question, partner request | Provide a named context and a source plan for an editor to investigate. | Turning private client information or unreviewed community statements into public claims. |

## Private Content Silo Model

The current topic map becomes a set of connected **content silos**. Each silo is a maintained resource area, not a high-volume production queue.

| Silo | Primary reader decision | Existing source-of-truth pages | Eligible next work |
|---|---|---|---|
| **Website clarity and B2B SEO** | “Can I find, understand, and compare the commercial information?” | B2B SEO pillar; B2B website information architecture guide | Service-page clarity, buyer-question mapping, technical-priority brief |
| **Buyer enablement and content marketing** | “What does our buying group need to understand before it can move together?” | Content Marketing pillar; buyer enablement guide | Category education, evaluation content, expert perspective, content refresh |
| **Paid-message learning** | “Do our audience, offer, landing page, and reporting teach us anything?” | Paid Ads pillar | Message-to-landing-page alignment, reporting interpretation, campaign learning brief |
| **AI representation** | “Does public information describe the company accurately and consistently?” | AI Representation topic; AI Data Policy | Source-of-truth audit, entity consistency, public-information correction brief |
| **Content governance** | “Can we identify the source, owner, scope, and review state behind this claim?” | Content Governance topic; Research page; FAQ | Claim ledger, source refresh, evidence workflow, correction note |

## Candidate Brief Contract

Every automated or manually created candidate must be saved as a **private brief**, never as a public page. Its record should include:

| Field | Requirement |
|---|---|
| Silo and buyer decision | Must map to one approved silo and one specific reader decision. |
| Signal summary | Must explain the aggregate observation without storing personal data or raw sensitive queries. |
| Evidence/source plan | Must identify what primary, official, research, or clearly attributed source will be assessed. |
| Proposed page type | New guide, refresh, research brief, field brief, internal-link improvement, or “no publication.” |
| Claim boundaries | Must state claims that are prohibited until independently supported. |
| Required links | Parent topic, one adjacent resource, one evidence/method source, and one appropriate next step. |
| Review state | `candidate → research → draft → claim review → approved / rejected`. |
| Human owners | Researcher, claim reviewer, and publication owner must be named before public release. |

## Two Viable Operating Approaches

| Approach | How it runs | Tradeoffs | Cost | Setup complexity |
|---|---|---|---|---|
| **Editorial signal review** | A human reviews a weekly Search Console export, aggregate analytics view, approved topic backlog, and any trend research; the outcome is a private Studio draft or no action. | Lowest risk and easiest to inspect, but slower and dependent on a regular editorial habit. | No additional automated-run cost. | Low. |
| **Governed background brief queue** | A background workflow periodically collects approved aggregate signals, applies deterministic thresholds, and creates a private candidate brief. A scoped language model may assist with a structured outline only after the source plan is present. | Faster discovery and more consistent coverage, but requires verified data access, source contracts, a content-operations data model, idempotent jobs, model-cost controls, and monitoring. | Uses model/API consumption and operational setup; exact cost depends on the chosen services and run frequency. | Moderate to high. |

No approach is activated by this specification. The second approach should be selected only after the signal sources, frequency, retention, reviewer, and draft-only policy are explicitly approved.

## Guardrails for a Future Background Queue

1. **No direct public publishing.** The only automatic output is a private candidate brief or a private draft.
2. **No unsupported research.** A trend or query may frame a question; it cannot supply evidence for an answer.
3. **No raw visitor-input archive.** Store only a privacy-reviewed aggregate label such as “navigation-friction: resource-to-guide path,” not a search string, email address, IP address, or session replay.
4. **No LLM-only claims.** Any language-model output is an editorial assist, not a source; factual statements require a named source and review.
5. **No keyword multiplication.** A candidate must strengthen a distinct reader decision in an approved silo or be rejected as duplication.
6. **No automatic external posting.** Distribution remains a human-led decision across LinkedIn, Substack, X, GitHub, Reddit, Quora, or any other channel.
7. **Idempotent and observable jobs.** A future scheduled workflow must create one candidate per signal fingerprint and record run outcome, source window, and reviewer status.

## Recommended Decision Before Activation

Choose the desired operating approach, then confirm the following implementation inputs: the approved signal sources; the run frequency; acceptable aggregated metrics; retention period; whether a language model may create outlines, drafts, or neither; named content/research/claim-review owners; and the publication authority. Until then, the current Studio workflow remains the sole public-publication path.

## References

[1] [Google Search Console](https://search.google.com/search-console/about)  
[2] [Umami — Privacy-First Analytics Platform](https://umami.is/)  
[3] [Google Trends API Alpha](https://developers.google.com/search/apis/trends)
