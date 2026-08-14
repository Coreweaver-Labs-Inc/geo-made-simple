# Coreweaver Labs — Next-Session Handoff

**Project:** `coreweaver-labs-simple`  
**Path:** `/home/ubuntu/coreweaver-labs-simple`  
**Latest live checkpoint:** `2a2f4203` (the research experience and governed publication workflow are implemented and awaiting the next checkpoint)  
**Published preview domain:** `https://coregeo-aqp8tam3.manus.space`  
**Canonical production domain in metadata:** `https://coreweaverlabs.com`

## Current Product State

The site now includes an **integrated GTM foundation** selected by the user as option C: a public service hub backed by a protected internal operating workspace. The system deliberately uses manual, reviewable handoffs. It does not fabricate customer data, seed claims, create public records from inquiries, or promote private records automatically.

| Area | Implemented state |
|---|---|
| Public GTM hub | `/services` presents Signal Intelligence Audit, GTM Enablement Sprint, and Representation Operations; it accepts private service inquiries and support requests. |
| Internal workspace | `/workspace` is private and noindexed. Admin users can create and manage private accounts, contacts, opportunities, support cases, cross-functional work, and incoming-request triage. |
| Manual handoffs | A request can be assigned an owner and moved through `new`, `triaged`, or `closed`. Operators must separately create accounts, opportunities, or support cases after review. |
| Functions covered | Sales, customer support, operations, marketing, research, and design have explicit work-item ownership and lifecycle fields. |
| Reporting | The foundation defines baseline-first launch metrics in `gtm-foundation.md`; it intentionally does not claim results or set fabricated performance targets. |
| Research credibility | `/research` explains sources, authorship, claim review, correction, and client-evidence safeguards without presenting agenda topics as completed findings. |
| Governed publishing | The private Studio supports articles, research briefs, and field briefs. Research records may stay drafts; publishing requires source references, a method note, a named reviewer, and explicit claim-review confirmation. |
| Public transparency | Published research records display their method, reviewer confirmation, and plain-text source references in the public Insight detail page. |
| Existing governance | Case-study intake, reviewer handoff, author pages, SSR, SEO, and owner notification workflows remain in place. |

## Key Routes

| Route | Purpose | Indexing |
|---|---|---|
| `/services` | Public GTM services and private request intake | Public, canonical, sitemap-listed |
| `/research` | Public research methods, source standards, and agenda | Public, canonical, sitemap-listed |
| `/ai-data-policy` | Public AI crawler permissions, restrictions, attribution expectations, and contact path | Public, canonical, sitemap-listed |
| `/faq` | Public buyer FAQ covering company fit, services, AI, evidence, and operations | Public, canonical, sitemap-listed; FAQPage JSON-LD |
| `/workspace` | Protected GTM control workspace | `noindex`, sitemap-excluded |
| `/studio` | Existing protected publishing and governance studio | `noindex` |
| `/case-study-intake` | Private compliant evidence intake | `noindex` |
| `/case-studies` | Approved-record-only public case-study index | Public |

## Data Model and Migrations

The GTM foundation adds six private/controlled tables: `gtm_requests`, `gtm_accounts`, `gtm_contacts`, `gtm_opportunities`, `gtm_support_cases`, and `gtm_work_items`.

| Migration | Purpose |
|---|---|
| `drizzle/0006_smiling_orphan.sql` | Creates the GTM foundation tables without inserting customer or performance data. |
| `drizzle/0007_wide_molten_man.sql` | Adds the nullable private `ownerName` field to `gtm_requests` for manual triage. |
| `drizzle/0008_adorable_kate_bishop.sql` | Extends the private GTM opportunity service-line enum for the three launch services. |
| `drizzle/0009_flashy_sir_ram.sql` | Adds governed research publication type, source-reference, method, reviewer, and claim-review fields to `insights`. |

The most recent Drizzle parity check reported **no pending schema changes**.

## Key Implementation Files

| File | Responsibility |
|---|---|
| `presence-first-strategy.md` | Evidence-led research thesis, source hierarchy, claim ledger, agenda, and authority indicators. |
| `client/src/pages/Research.tsx` | Public research-methods and source-standard page. |
| `client/src/pages/AiDataPolicy.tsx` | Public AI Data Policy with permitted retrieval use, prohibited training/bulk reuse, provider documentation, and contact path. |
| `client/public/robots.txt` | General search permission plus named crawler directives that distinguish known retrieval agents from named training/model-development agents. |
| `client/src/pages/Faq.tsx` | Searchable, category-led public FAQ with accessible accordions, claim-safe answers, FAQPage JSON-LD, and contact handoff. |
| `brand-strengths.md` | Supportable external strengths, recommended buyer-first navigation order, and explicit claim boundaries. |
| `client/src/pages/Home.tsx` | Homepage copy with plain-language definitions for signals, operating system, AI answer/source review, shared knowledge, and governance-adjacent review routines. |
| `client/src/pages/Studio.tsx` | Private insight, research brief, and field brief authoring with publication review gates. |
| `client/src/pages/InsightDetail.tsx` | Public insight rendering, author disclosure, social sharing, and research-record transparency. |
| `delivery-playbooks.md` | Reviewable operating playbooks for launch SEO, Content Marketing, and Paid Ads delivery. |
| `proof-and-review-program.md` | Authorized evidence pipeline and ethical, neutral client-review program. |
| `authority-scorecard.md` | Manual quarterly authority and Clutch-readiness scorecard; no unapproved external collection or fabricated baseline data. |
| `gtm-foundation.md` | Operating model, default segments, lifecycle, metrics, and non-automatic boundaries. |
| `client/src/pages/GtmHub.tsx` | Public services hub and request form. |
| `client/src/pages/GtmWorkspace.tsx` | Private GTM workspace creation and lifecycle views. |
| `client/src/components/GtmPrivateRegistries.tsx` | Private account/contact registries and request-triage controls. |
| `client/src/pages/GtmHub.test.tsx` | Public intake success-boundary and keyboard-label coverage. |
| `client/src/components/GtmPrivateRegistries.test.tsx` | Keyboard focus order through account, contact, and triage controls. |
| `drizzle/schema.ts` | GTM tables and all existing site data models. |
| `server/contentSchemas.ts` | Zod contracts for public request intake and protected record transitions. |
| `server/db.ts` | GTM persistence helpers. |
| `server/routers.ts` | Public request procedure and admin-protected GTM procedures. |
| `validation.md` | Detailed validation log. |
| `todo.md` | Working checklist and historical implementation record. |

## Validation Completed

The current build passed `pnpm run check`, the full Vitest suite (**29 tests**), and `pnpm run build` for both client and SSR output. `/research` was verified server-rendered with canonical metadata and sitemap inclusion, and was reviewed at desktop plus 390px mobile widths. The reviewed additive migration `0009_flashy_sir_ram.sql` was applied. `/services` was verified server-rendered with canonical metadata and sitemap inclusion. `/workspace` was verified `noindex` and absent from the sitemap. A request to `gtm.listRequests` without an authenticated admin session returned **HTTP 403**. Accessibility coverage verifies labelled controls and the keyboard focus path across account, contact, and request-triage controls.

> The build reports a non-blocking client bundle-size warning above 500 kB. No active TypeScript errors remain. Historical browser-console output may show a stale pre-fix missing-export message; final type checks and production builds are clean.

## Remaining Product Decisions

The launch segment and three launch services are now defined. The remaining user decisions are:

1. Approve the research-based starting estimates for SEO ($6,500/month), Content Marketing ($7,500/month), and Paid Ads ($7,500/month), or provide revised commercial prices.
2. Confirm the first authorized evidence/proof pipeline and the ethical customer-review program timing.
3. Confirm which external launch systems—if any—are required before they are configured.

Until then, preserve the current native database workflow and manual handoffs. Do not enable, simulate, or configure external connectors prematurely.

## Recommended Next Session

1. Read `HANDOFF.md`, `todo.md`, `presence-first-strategy.md`, and `validation.md`.
2. Obtain the remaining commercial, proof-pipeline, review-program, and external-system decisions if the user is ready to make them.
3. Keep research records in draft until their sources, method, reviewer, and claim-review confirmation are complete; never insert fabricated findings, client proof, or testimonials.
4. For any integration or scheduled workflow, read the relevant integration and automation guidance before changing schema or code.
5. Run `pnpm run check`, `pnpm test`, `pnpm run build`, review `todo.md`, and create a checkpoint after the next discrete feature set.
