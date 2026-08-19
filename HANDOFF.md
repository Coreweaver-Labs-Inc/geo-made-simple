# Coreweaver Labs — Next-Session Handoff

**Project:** `coreweaver-labs-simple`  
**Path:** `/home/ubuntu/coreweaver-labs-simple`  
**Latest live checkpoint:** `22c034fa`  
**Published preview domain:** `https://coregeo-aqp8tam3.manus.space`  
**Canonical production target:** `https://coreweaverlabs.com`

## Current Operating Direction

Coreweaver Labs is an evidence-led, Google-indexable B2B growth resource and GTM platform for mid-market teams. The public site connects SEO, Content Marketing, Paid Ads, AI representation, and content governance through useful reader decisions—not content volume, fabricated proof, outcome promises, or autonomous publication.

The active authority strategy is now the **Evidence Ledger sprint**: publish only source-reviewed, named-author work that makes a buyer decision, the evidence boundary, and the next relevant public resource easy to inspect. The private queue remains draft-only and review-gated. No automation may publish, post, send externally, or turn a signal into a public claim without explicit human review.

| Area | Current state |
|---|---|
| Public authority system | `/topics`, `/research`, `/method`, `/faq`, `/case-studies`, and `/insights` form a connected evidence-led reader path. |
| Implemented child guides | Website information architecture, buyer enablement, paid-message alignment, B2B claim ledger, and AI answer review are public child routes beneath their parent topic pillars. |
| Claim-ledger guide | `/topics/content-governance/claim-ledger` provides a six-field blank worksheet for statement, source, scope/limitation, owner, review trigger, and action. It remains browser-local, accepts no submission, and instructs readers not to enter private or customer-specific material. |
| Signal Notes | Two reviewed field briefs are published with named author, reviewer, primary-source references, explicit method notes, limitations, and contextual public links. |
| Reader guidance | Homepage Resources and the `/topics` cards use the shared resource-purpose vocabulary: **Start here**, **Decision guide**, **Working method**, and **Research standard**. |
| FAQ | `/faq` retains accessible search, category filters, accordions, and FAQPage JSON-LD, now fully aligned with the warm paper/ink/brass/teal Signal Ledger system. |
| Method page | `/method` includes sticky navigation, decision gates, a source-safe “Method at work” example, and the exploratory-only Earthward Foundry pathway. |
| Publishing governance | Private Studio research and field briefs need sources, method, named reviewer, and confirmed claim review before publication. Intake/case-study material remains private until separately authorized. |
| Communications infrastructure | Hostinger Mail and Vapi callbacks remain authenticated, minimized, private, and draft-only; no autonomous external actions are enabled. |

## Recently Published Public Work

| Route | Publication record | Boundary |
|---|---|---|
| `/topics/content-governance/claim-ledger` | **A B2B claim ledger: connecting public statements to current support.** Includes a blank, non-client-specific worksheet and links to Content Governance, Research, Case Studies, FAQ evidence answers, and Method. | It does not turn an unsupported assertion into evidence, replace legal/compliance review, authorize private material, or promise commercial outcomes. |
| `/topics/ai-representation/ai-answer-review` | **AI answer review for B2B brands.** Includes a blank browser-local worksheet that connects a buyer question, source-of-truth page, observable ambiguity, support/limitation, owner, and next action. | It does not diagnose, control, verify, correct, or guarantee the behavior of any third-party AI system, nor promise citation, visibility, traffic, trust, leads, pipeline, or revenue. |
| `/insights/useful-resource-route-not-page-pile` | **Signal Note 001 — “A useful resource is a route, not a pile of pages.”** Author: Mason Nguyen. Reviewer: Coreweaver research editor. | It is an operating interpretation of current Google guidance, not a performance study or visibility promise. |
| `/insights/claim-boundary-before-distribution` | **Signal Note 002 — “A B2B claim needs a boundary before it needs distribution.”** Author: Mason Nguyen. Reviewer: Coreweaver research editor. Database record ID: `30001`. | It is an editorial operating interpretation about source, scope, limitation, ownership, and review; it is not a compliance standard, trust claim, or commercial-result promise. |

## Review Records and Primary Sources

| File | Purpose |
|---|---|
| `signal-note-001-brief.md` | Review record for the first Signal Note, including two current Google sources, contribution, limitation, links, and method note. |
| `signal-note-002-brief.md` | Review record for the second Signal Note, including [Google’s helpful-content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) and [Google’s transparency guidance for news sources](https://developers.google.com/search/blog/2021/06/google-news-sources). |
| `best-in-class-authority-roadmap.md` | Source-grounded roadmap for durable authority through useful original judgment, visible method, evidence records, and careful distribution. |
| `expanded-hub-spoke-content-map.md` | Child-guide briefs, source boundaries, link architecture, and governed sequence. The claim-ledger route was priority 4; the next candidate is AI answer review only after a distinct source plan and review brief exist. |
| `keyword-cloud-silo-expansion-2026-08.md` | Current coverage audit, buyer-language cloud, source-aware next-wave priorities, measurement loop, and publication gate. The next planned guide after AI answer review is content refresh. |
| `ai-answer-review-guide-brief.md` | Approved source contract, claim ledger, internal-link plan, boundary, worksheet design, and publication gate for the implemented AI answer review guide. |
| `editorial-review-2026-08.md` | Editor-in-chief review used to guide the Start Here paths, first-engagement record, FAQ normalization, resource labels, and Method-at-work example. |

## Key Implementation Files

| File | Responsibility |
|---|---|
| `client/src/lib/topicContent.ts` | Five topic pillars, five implemented child guides, deterministic search terms, reader-purpose labels, and optional browser-local worksheet structure. |
| `client/src/pages/ChildTopicDetail.tsx` | Reusable child-guide rendering, structured data, sharing, related links, and optional browser-local worksheet. |
| `client/src/pages/InsightDetail.tsx` | Public field-brief rendering, author disclosure, social sharing, reviewed source records, and slug-scoped related-resource paths. |
| `client/src/pages/Topics.tsx` | Public B2B Growth Topics hub with resource-purpose labels and deterministic topic search. |
| `client/src/pages/Faq.tsx` | Searchable and accessible FAQ with source-safe answers and FAQPage schema. |
| `client/src/pages/Methodology.tsx` | Public methodology narrative, sticky table of contents, decision gates, Method-at-work example, and Earthward Foundry boundary. |
| `client/src/ssr/prefetch.ts` | SSR title, canonical-path, keyword, and route prefetch handling for public routes. |
| `client/public/sitemap.xml` | Static sitemap fallback; includes both Signal Notes and the claim-ledger guide. |
| `server/_core/index.ts` | Dynamic sitemap route; includes the claim-ledger guide in the public fixed-path list. |
| `AGENTS.md` and `agent-training-playbook.md` | Cross-agent operating rules, evidence requirements, publication gates, and handoff protocol. |
| `/home/ubuntu/skills/geo-made-simple/SKILL.md` | Reusable future-agent skill for evidence-led GEO, crawlable B2B resource systems, entity clarity, source-aware publishing, claim-ledger governance, Signal Notes, and validation. |
| `/home/ubuntu/skills/geo-made-simple/references/geo-made-simple-templates.md` | Reusable templates for resource briefs, claim-ledger records, Signal Note review records, discovery validation, governed automation contracts, and handoffs. |
| `todo.md` | Append-only project checklist. All items through the current Evidence Ledger sprint are complete. |

## Validation Record

The current sequence has passed focused component tests, TypeScript checks, and production client plus SSR builds after each discrete checkpoint. The claim-ledger guide passed six focused tests, raw SSR title/canonical/worksheet/link checks, static sitemap verification, and desktop review. The reader-guidance and FAQ/Method refinements passed nine focused tests, TypeScript, production build, desktop/mobile visual review, and raw SSR checks. The second Signal Note passed focused Insight-detail tests, database verification, TypeScript, production build, raw SSR checks for its reviewed field record, two primary source URLs, five contextual links, sitemap inclusion, and desktop review. The AI answer review guide passed focused topic, page, and hub tests; TypeScript; production client/SSR build; desktop/mobile review; static sitemap verification; and raw SSR checks for title, structured data, worksheet, and five contextual links. The full regression suite passed **69 tests in 27 files** when the separately documented live Hostinger credential integration test was excluded; that external credential test remains non-OK and unchanged.

The reusable `geo-made-simple` skill was validated with `/home/ubuntu/skills/skill-creator/scripts/quick_validate.py`. It contains no runtime integrations, scripts, credentials, or autonomous publishing capability.

> **Known environment behavior:** `CANONICAL_ORIGIN` is not set in local development, so the dynamic local `/sitemap.xml` intentionally returns a 404. The static fallback sitemap is updated. Confirm that `CANONICAL_ORIGIN=https://coreweaverlabs.com` is configured before relying on the dynamic sitemap in production.

> **Non-blocking build note:** the client bundle still emits the existing chunk-size warning above 500 kB. Do not present this as a production failure; consider code-splitting only as a separately scoped performance task.

## Next Recommended Session

1. Read `HANDOFF.md`, `AGENTS.md`, `todo.md`, `best-in-class-authority-roadmap.md`, and `expanded-hub-spoke-content-map.md` before adding public work. Load the `geo-made-simple` skill for GEO, discovery, resource-system, Signal Note, claim-ledger, or evidence-led publishing work.
2. Prepare the **B2B content refresh** child-guide brief only after selecting current primary sources, defining one buyer decision, documenting a limitation, and identifying at least two contextual inbound links. Do not claim that freshness, publishing volume, or a refresh changes rankings.
3. Continue Signal Notes only when each note has a distinct contribution, named author, named reviewer, source references, method note, limitation, and scoped internal links. The content queue may draft privately; an editor alone decides publication.
4. If additional FAQ or design changes are requested, preserve the Signal Ledger design tokens and accessibility behavior rather than introducing a parallel visual system.
5. Before the next checkpoint, run focused tests, `pnpm check`, `pnpm build`, raw SSR checks, a relevant desktop/mobile review, and read the full `todo.md`.

## Non-Negotiable Guardrails

- Never fabricate reviews, testimonials, case studies, client names, outcomes, performance claims, rankings, citations, or social proof.
- Keep visitor, customer, support, case-study, and unpublished-research data private. Do not paste private material into public worksheets.
- Do not represent a source-supported principle as a claim that a page, link, ledger, source, author byline, or automation will produce a result.
- Do not enable autonomous public publishing, email sending, posting, purchasing, account creation, or external action. Human review remains mandatory.
- Preserve the draft-only boundaries for content queues and communications workflows.
