# Hostinger Mail → Manus Agentic Workflow Architecture

## Recommendation

Use **one secure mail gateway with three bounded role workflows**, rather than three independent agents with unrestricted inboxes and send permissions. The gateway receives an event from Hostinger Mail, validates it, minimizes the message data, records the event, and routes only the relevant context to one role-specific Manus workflow: **Operations**, **Development**, or **People & Feedback**.

This design lets each function keep its own instructions and review boundary while preserving a single audit trail, one sender-validation rule set, and one mechanism for stopping a bad workflow. It also avoids using `coreweaverlabs711@manus.bot` as an uncontrolled catch-all relay. Keep that address as an optional human command or escalation channel unless its exact provider behavior and access controls are independently confirmed.

> **Critical distinction:** Hostinger Agentic Mail’s allow/block lists govern **outbound sending from a mailbox**. They do not by themselves decide which inbound sender can trigger a workflow. The gateway must maintain its own inbound sender/domain allowlist and verify every webhook request. [1]

## Viable Approaches

| Approach | How it works | Tradeoffs | Cost profile | Setup complexity |
|---|---|---|---|---|
| **Shared triage gateway with three bounded role workflows — recommended** | Hostinger sends each `message.received` event to one HTTPS receiver. The receiver validates the event, checks the sender, then routes the message to the relevant Operations, Development, or People workflow. | Strongest auditability and consistent safety controls; requires a small HTTPS service and initial configuration. | Infrastructure cost plus only the agent work actually invoked. | Moderate |
| **Three separate mailbox webhooks and three role workflows** | Each mailbox has its own Hostinger webhook and dedicated workflow. | Strong isolation and simple mailbox-to-role mapping; duplicates security, monitoring, and routing logic. | Similar per-message agent cost; slightly higher operational maintenance. | Moderate to high |
| **Manual mailbox assistant through Hostinger’s MCP/API** | A team member opens an agent session and asks it to triage, search, or draft within a selected mailbox. | Lowest implementation risk and no webhook receiver; not automatic or immediate. | Human-triggered only. | Low |

The recommended approach is the first one. It offers the practical separation the team wants without treating role mailboxes as autonomous senders.

## Role Boundaries

| Role workflow | Primary input | May do automatically | Must require human approval | Must not receive by default |
|---|---|---|---|---|
| **Operations** | Customer, vendor, scheduling, and operational messages | Classify, summarize, extract a request, draft a response, create an internal review item | Any external reply, commitment, spending, contract, or account change | Development diagnostics and HR-sensitive material |
| **Development** | Product, site, technical, incident, and integration messages | Classify technical issue, summarize logs or steps, draft a technical response, create a private engineering item | Deployments, credential changes, DNS, production data changes, and external technical commitments | HR feedback and nonessential commercial material |
| **People & Feedback** | Voluntary research-quality feedback and ethical-review-program messages | Redact/summarize feedback, identify consent or follow-up needs, prepare internal review note | Any response that implies an employment, legal, review, or public-testimonial decision | Evidence archives, confidential client records, and mailbox-administration controls |

## Event Flow

1. A message arrives in a selected Hostinger mailbox.
2. Hostinger emits a `message.received` HTTPS POST to the mail gateway. Hostinger states that its webhook includes a bearer token, has a test delivery control, and fires immediately after delivery. [1]
3. The gateway verifies the bearer token, rejects unexpected paths and malformed payloads, deduplicates by message/event ID, and logs only minimum operational metadata.
4. The gateway checks the **inbound** sender address/domain against an approved sender list. Any non-approved sender becomes a private review item and is not handed to an agent automatically.
5. The gateway maps mailbox and approved sender to one role workflow. It sends only the minimum needed text, thread identifier, sender, subject, and approved attachment metadata to Manus.
6. The workflow returns a structured classification, internal summary, risk flag, and a draft-only recommendation. It does **not** send email by itself.
7. Operations reviews any proposed external communication. Only an explicitly approved, separate action may call Hostinger’s send endpoint.
8. The gateway records the review decision, task identifier, message identifier, and any external-send confirmation for audit.

## Hostinger Configuration

Hostinger’s current Agentic Mail documentation confirms that Agentic Mail provides per-mailbox API tokens, mailbox webhooks, outbound allow/block lists, and an MCP server. Its webhook event is currently `message.received`; the destination must be public HTTPS, and the service can issue a test event from the mailbox UI. [1]

| Step | Configuration | Safe default |
|---|---|---|
| 1 | In **hPanel → Emails → domain → Agentic Mail → API**, create a token. | Choose **Selected mailboxes**, not all current/future mailboxes. Do not paste the token into chat, source code, or a client application. |
| 2 | Select the three workflow mailboxes. | Start with the relevant role inboxes; do not use a shared privileged mailbox. |
| 3 | In **Agentic Mail → Webhooks**, add one webhook per selected mailbox or one gateway URL with a distinct role path. | Subscribe to `message.received` only. Use a unique high-entropy bearer token per webhook. |
| 4 | Configure outbound allow/block lists. | Keep send allowlists restricted to the organization domain and explicitly approved destinations while testing. Do not use an outbound allowlist as inbound-agent authorization. |
| 5 | Click Hostinger’s webhook **Test** control. | Verify the gateway returns 2xx, stores no secret in logs, and creates a draft-only internal record. |

## Manus API Configuration

The Manus API v2 base URL is `https://api.manus.ai`, and first-party integrations authenticate with an API key in the `x-manus-api-key` header. A production integration should create a task only after gateway validation, retain the resulting task ID, and use Manus task lifecycle webhooks rather than polling when it needs a completed result asynchronously. [2] [3]

Create **three durable role projects** in Manus rather than three unconstrained agents. Each project should carry only the role-specific operating instructions and must produce a bounded, machine-readable result such as:

| Field | Allowed values or rule |
|---|---|
| `route` | `ops`, `dev`, `hr`, or `manual_review` |
| `classification` | Role-specific, concise internal category |
| `risk_level` | `low`, `medium`, `high` |
| `summary` | Internal, minimal, no secrets copied unless strictly necessary |
| `recommended_action` | `draft_reply`, `create_internal_item`, `request_human_review`, or `ignore` |
| `draft_reply` | Optional; must carry a `human_approval_required: true` flag |
| `external_send_allowed` | Always `false` for the initial launch |

The receiving gateway should call the Manus task-creation endpoint only with an API key held in server-side secret storage. Do not configure the key in a browser, a static site bundle, a webhook URL, or a mailbox rule. Manus documents task creation, role-specific projects, and connector attachment as separate configuration surfaces; the key does not itself make an email workflow safe. [2]

## What Not to Configure Yet

Do **not** enable automatic external replies, calendar changes, deployments, credential changes, HR decisions, or any agentic send action in the first release. Do not forward all Hostinger mail to `coreweaverlabs711@manus.bot` and assume that approved senders will prevent untrusted inbound triggers. Do not give a single API token all-mailbox access when selected-mailbox access is available. Do not pass full attachments to an agent by default; allow only a small approved file-type list after a separate review.

## Minimum Approval Needed Before Build

1. Confirm **Approach 1** (shared gateway plus three bounded role workflows) or choose another row above.
2. Name the three Hostinger mailbox addresses to monitor. Do not share passwords or API keys in chat.
3. Confirm the inbound sender/domain allowlist. The current internal addresses may be a starting set, but outbound “approved senders” are not the same control.
4. Confirm that version one is **draft-only** with no autonomous external sending.
5. Confirm the desired result destination: private internal dashboard, selected internal mailbox, or Manus task thread.

After approval, create the Hostinger token with selected-mailbox scope, add the webhook endpoint, store the Hostinger and Manus secrets server-side, test with Hostinger’s test delivery, and keep the workflow disabled until the draft-only audit log is verified.

## References

[1] [Hostinger: How to use Agentic Mail](https://www.hostinger.com/support/how-to-use-agentic-mail-in-hostinger/)  
[2] [Manus API v2: `task.create`](https://open.manus.ai/docs/v2/task.create)  
[3] [Manus API Integration Guide](https://open.manus.ai/docs/v2/webhooks-overview)
