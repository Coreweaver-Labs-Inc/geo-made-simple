# Coreweaver Labs — Integrated GTM Foundation

## Release intent

This release turns the existing marketing site into a connected GTM foundation rather than a collection of independent pages. It pairs a clear client-facing service hub with one protected operational workspace for the people who qualify opportunities, support customers, coordinate delivery, create marketing, run research, and manage design work.

## Default launch assumptions

The initial market focus is **B2B organizations with complex, trust-sensitive products** that need their AI-search representation, customer evidence, sales motion, and operating systems to agree. The foundation supports three launch segments without changing its core workflow:

| Segment | Primary operating need | Core GTM entry point |
|---|---|---|
| B2B software and infrastructure | Improve representation of a technical offering across AI-mediated discovery and sales | Signal Intelligence Audit |
| Professional and knowledge services | Turn expertise, evidence, and service delivery into a clearer commercial system | GTM Enablement Sprint |
| Regulated or high-consideration B2B teams | Coordinate reviewable claims, customer support, and trusted market-facing content | Representation Operations |

The first service catalogue contains three connected offerings:

| Service | Commercial purpose | First delivery outcome |
|---|---|---|
| Signal Intelligence Audit | Qualify demand and establish a shared evidence baseline | A prioritized representation, authority, and measurement assessment |
| GTM Enablement Sprint | Convert an approved diagnostic into an executable cross-functional plan | A sequenced sales, marketing, research, design, and operations work plan |
| Representation Operations | Retain clients through ongoing coordination and signal maintenance | A visible service backlog, support path, evidence cadence, and quarterly review |

## Roles and access

The public service hub remains available to all visitors. The internal workspace is restricted to approved operators. Client-facing delivery information stays separate from the public site and will only be exposed after account membership is added; this release does not infer or create client access from a public form submission.

| Role | Primary responsibility | First-release access |
|---|---|---|
| Client or prospect | Discover services, qualify fit, request support | Public service and support routes |
| Sales | Convert qualified demand into a scoped opportunity | Protected opportunity pipeline |
| Customer support | Triage support requests and maintain response ownership | Protected support queue |
| Operations | Coordinate service delivery and handoffs | Protected work and engagement views |
| Marketing | Plan campaigns and update commercial messaging | Protected marketing work items |
| Research | Capture questions, sources, and findings | Protected research work items |
| Design | Receive, prioritize, and complete creative requests | Protected design work items |
| Administrator | Govern access and all workflow records | Full protected workspace |

## Lifecycle rules

The foundation uses one explicit lifecycle: **inquiry → qualified → discovery → proposal → won → onboarding → active service → renewal or closed**. A public inquiry or support request is never converted into an engagement automatically. Every transition requires an operator to create or update a protected record.

Delivery work uses **planned → in progress → blocked → review → done**. Each work item belongs to one functional area—support, sales, operations, marketing, research, or design—and can be handed off manually without exposing client information publicly.

## Shared data model

The GTM foundation separates public requests from protected commercial and delivery records. A public request can be triaged, but it must be deliberately promoted by an authorized operator before it becomes an account, opportunity, support case, or delivery item.

| Record | Purpose | Visibility | Key lifecycle |
|---|---|---|---|
| GTM request | Capture public service inquiries and support requests | Public write, private read | New → triaged → closed |
| Account | Represent a prospect or client organization | Protected | Prospect → client → inactive |
| Contact | Represent an approved business contact associated with an account | Protected | Active → archived |
| Opportunity | Track a scoped sales motion for an account and service | Protected | Inquiry → qualified → discovery → proposal → won/lost |
| Support case | Track an owned customer-support issue | Protected | New → open → waiting → resolved/closed |
| Work item | Coordinate functional delivery across sales, support, operations, marketing, research, and design | Protected | Planned → in progress → blocked → review → done |

Each protected record has an explicit functional owner, status, and timestamps. The initial model uses application-level relationships rather than automatic database-side promotion or cascading behavior. This keeps commercial and client changes reviewable during the foundation stage.

## Launch metrics

The first release will record operating metrics rather than invent targets. Baselines are established from the first complete 30-day operating cycle; leadership can then set target ranges by segment and service.

| Metric | Definition | Owner | Review cadence |
|---|---|---|---|
| Qualified-inquiry rate | Qualified inquiries divided by all completed service inquiries | Sales | Weekly |
| Inquiry response time | Time from submitted inquiry or support request to first owned response | Customer support | Weekly |
| Discovery-to-proposal conversion | Opportunities entering proposal divided by opportunities completing discovery | Sales | Monthly |
| Proposal-to-engagement conversion | Won opportunities divided by sent proposals | Sales and operations | Monthly |
| Time to active service | Time from won opportunity to an active engagement with an owned delivery plan | Operations | Monthly |
| Delivery throughput | Completed work items divided by planned work items for the reporting period | Functional owner | Biweekly |
| Support resolution time | Time from support-case creation to resolved or closed state | Customer support | Weekly |
| Evidence-complete publication rate | Approved evidence records divided by proposed public case-study records | Operations and research | Monthly |

## Integration posture

The first release uses the managed database and existing owner notifications as the source of truth. CRM, help-desk, email, calendar, analytics, and automation connections are deliberately deferred until the required launch systems are confirmed. The data model will retain clear integration seams, but no third-party account, webhook, or background automation will be enabled by default.

## Non-negotiable controls

- No fabricated clients, outcomes, testimonials, support cases, pipeline values, or campaign performance will be seeded.
- Public forms create private records only; they do not create public claims, client access, opportunities, or engagements automatically.
- Cross-functional roles are represented explicitly to support ownership and auditability.
- External integrations and automated outbound actions require a separately approved integration scope.
