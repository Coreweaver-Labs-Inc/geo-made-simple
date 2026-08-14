# Owner Decisions — Interim Launch Posture

## Recorded Decision

**Decision date:** August 13, 2026  
**Status:** Active until replaced by an explicit owner revision

Coreweaver Labs has approved its current public service amounts as **commercial starting prices**:

| Service | Public label to retain | Status |
|---|---:|---|
| SEO | From $6,500/month | Approved commercial starting price |
| Content Marketing | From $7,500/month | Approved commercial starting price |
| Paid Ads | From $7,500/month, excluding client-funded media spend | Approved commercial starting price |

These amounts are approved starting prices, not binding offers, guaranteed scopes, or performance commitments. Any proposal or statement of work confirms the final commercial scope, timing, and separate terms for the specific engagement.

## Launch-System Posture

Coreweaver Labs will continue with the implemented **manual operating workflows**. No external CRM, help-desk, email, calendar, analytics, or automation integration will be enabled until the owner identifies the required systems and approves the corresponding scope.

Public contact and support requests remain subject to manual triage. They do not automatically create customer accounts, opportunities, support cases, engagements, external records, or public claims.

## Approved Agentic Mail and Voice-Operator Baseline

**Owner approval recorded:** August 14, 2026

Coreweaver Labs approved a single validated gateway for `ops@coreweaverlabs.com`, `dev@coreweaverlabs.com`, and `hr@coreweaverlabs.com`. The gateway uses the owner-created, API-key-based Manus integration only from server-side secret storage. It will receive selected-mailbox Hostinger events and Vapi voice events, but will not expose the Manus key to either provider or to browser code.

The approved initial inbound sender rule permits only the three exact Coreweaver mailbox addresses to trigger automatic email triage. Any external email requires human review before an agent workflow receives it. Results remain in a private Manus task thread and a private gateway audit record. Version one is **draft-only**: it may classify, summarize, and prepare an internal recommendation, but may not send external email, book a meeting, transfer a caller, alter a system, deploy code, change credentials, make a people decision, or make any external commitment.

The Vapi voice operator will use a focused Router and a Squad. The Router may hand a caller to Operations or Development based on stated intent. It may hand off to People & Feedback only when the caller explicitly volunteers research feedback or asks about the ethical review program. Sensitive, ambiguous, emergency, commitment-seeking, or explicitly human-requested calls must escalate to a human. No role workflow may substitute for a human decision.

## Approved Leading Indicators and Review Date

**Owner approval recorded:** August 13, 2026

The owner approved the seven leading indicators in `authority-scorecard.md`: governed public research rate, original-method share, research quality feedback, authorized proof readiness, verified independent reviews, independent mentions, and service consistency. These are early evidence-quality and market-readiness signals, not promised rankings, revenue, or third-party outcomes.

The first formal manual authority and Clutch-readiness review is scheduled for **January 1, 2027**. The recurring quarterly checkpoints are April 1, July 1, and October 1.

**Named role assignment recorded:** ops@coreweaverlabs.com is the January 1 review chair, decision recorder, and evidence-archive administrator. dev@coreweaverlabs.com is the technical measurement and systems owner. hr@coreweaverlabs.com is the people-and-feedback stakeholder for research-quality feedback and ethical review-program input, without evidence-archive administration or confidential-record access by default. Indicators that require both evidence interpretation and systems validation use the shared-review controls documented in `authority-scorecard.md`; missing data remains “not collected” and is never estimated.

## Remaining Owner Decisions

The following items remain intentionally open:

1. Complete the first quarterly Clutch-readiness and authority-scorecard review with real operating data on January 1, 2027.
2. Configure the approved Hostinger and Vapi provider settings only after the gateway is deployed, its webhook credentials are stored as secrets, and draft-only test deliveries have passed.
