# Coreweaver Labs — Next-Session Handoff

**Project:** `coreweaver-labs-simple`  
**Path:** `/home/ubuntu/coreweaver-labs-simple`  
**Latest live checkpoint:** `bd8b1db9`  
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
| Existing governance | Case-study intake, reviewer handoff, author pages, Insights, SSR, SEO, and owner notification workflows remain in place. |

## Key Routes

| Route | Purpose | Indexing |
|---|---|---|
| `/services` | Public GTM services and private request intake | Public, canonical, sitemap-listed |
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

The most recent Drizzle parity check reported **no pending schema changes**.

## Key Implementation Files

| File | Responsibility |
|---|---|
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

The current build passed `pnpm run check`, the full Vitest suite (**23 tests**), and `pnpm run build` for both client and SSR output. `/services` was verified server-rendered with canonical metadata and sitemap inclusion. `/workspace` was verified `noindex` and absent from the sitemap. A request to `gtm.listRequests` without an authenticated admin session returned **HTTP 403**. Accessibility coverage verifies labelled controls and the keyboard focus path across account, contact, and request-triage controls.

> The build reports a non-blocking client bundle-size warning above 500 kB. No active TypeScript errors remain. Historical browser-console output may show a stale pre-fix missing-export message; final type checks and production builds are clean.

## One Pending Product Decision

The only remaining checklist item is blocked on the user. Before enabling external integrations or advanced automation, obtain:

1. The **primary customer segment**.
2. The **three launch services** to prioritize.
3. The required **launch systems**—CRM, help desk, email, calendar, analytics, or none.

Until then, preserve the current native database workflow and manual handoffs. Do not enable, simulate, or configure external connectors prematurely.

## Recommended Next Session

1. Read `HANDOFF.md`, `todo.md`, `gtm-foundation.md`, and `validation.md`.
2. Ask the user for the three pending launch decisions if they have not replied.
3. Translate those choices into a prioritized service catalogue and, only if requested, integration requirements.
4. For any integration or scheduled workflow, read the relevant integration and automation guidance before changing schema or code.
5. Run `pnpm run check`, `pnpm test`, `pnpm run build`, review `todo.md`, and create a checkpoint after the next discrete feature set.
