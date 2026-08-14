# Controlled Gateway Launch Checklist

## Scope and Release Boundary

This checklist applies only to the **draft-only** Coreweaver gateway. Its endpoints are deployed with the website at:

| Provider | Endpoint | Allowed role behavior |
|---|---|---|
| Hostinger Operations | `https://coregeo-aqp8tam3.manus.space/webhooks/hostinger/ops` | Internal Ops draft review only |
| Hostinger Development | `https://coregeo-aqp8tam3.manus.space/webhooks/hostinger/dev` | Internal Dev draft review only |
| Hostinger People & Feedback | `https://coregeo-aqp8tam3.manus.space/webhooks/hostinger/hr` | Consent-based feedback review only |
| Vapi Router | `https://coregeo-aqp8tam3.manus.space/webhooks/vapi` | End-of-call, private draft review only |

The gateway accepts **only** the three exact internal mail senders for automatic email triage. External email is recorded for human review but is never sent to Manus automatically. Vapi end-of-call reports route to Ops, Dev, consent-based People & Feedback, or human escalation. Interim transcripts, status callbacks, function calls, assistant requests, and transfer requests are ignored by the gateway. No route can send email, place calls, book a meeting, transfer a call, alter systems, or make an external commitment.

## 1. Hostinger Mail Setup

| Mailbox | Webhook URL | Required trigger | Safe launch state |
|---|---|---|---|
| `ops@coreweaverlabs.com` | `/webhooks/hostinger/ops` | `message.received` | Enabled only after test delivery succeeds |
| `dev@coreweaverlabs.com` | `/webhooks/hostinger/dev` | `message.received` | Enabled only after test delivery succeeds |
| `hr@coreweaverlabs.com` | `/webhooks/hostinger/hr` | `message.received` | Enabled only after test delivery succeeds |

In **hPanel → Emails → coreweaverlabs.com → Agentic Mail → Webhooks**, create one webhook per listed mailbox. Use the complete HTTPS URLs above and the single available `message.received` trigger. Hostinger displays the webhook bearer secret only once. Place each secret into its matching server-side field—`HOSTINGER_OPS_WEBHOOK_TOKEN`, `HOSTINGER_DEV_WEBHOOK_TOKEN`, or `HOSTINGER_HR_WEBHOOK_TOKEN`—and never paste it into source code, a URL, Vapi, or chat. [1]

Use the **Test** action for each webhook before enabling live delivery. A successful test must return an accepted HTTP response and create only a private audit record or draft-only internal task. Review Hostinger’s delivery log, then leave outbound sending disabled. Do not use Hostinger’s outgoing allow/block list as an inbound authorization control; it governs sending, whereas the gateway’s exact-address allowlist governs automated triage. [1]

## 2. Vapi Operations Number Setup

The private Operations entry point is **+1 (650) 484-0415** for `ops@coreweaverlabs.com`. In Vapi, create a reusable Custom Credential named `Coreweaver Gateway — Production` using a separate bearer token. The token must match the server’s `VAPI_GATEWAY_WEBHOOK_TOKEN` value; it must never be the Manus API key or a Hostinger secret. Vapi supports bearer, OAuth, and HMAC credentials for server URLs; a dedicated credential lets the secret be managed centrally rather than duplicated across assistants. [2]

Configure one **Router** assistant and three focused Squad members: Operations, Development, and People & Feedback. The Router should be the squad’s first member and may hand callers to a specialist only under these conditions:

| Router outcome | Permitted condition | Gateway consequence |
|---|---|---|
| Operations | Service, client, vendor, scheduling, or operating need | Draft-only Ops review |
| Development | Site, product, integration, access, or technical issue | Draft-only Dev review |
| People & Feedback | Caller explicitly volunteers research feedback or asks about the ethical review program | Draft-only HR feedback review |
| Human escalation | Sensitive, unclear, emergency, commitment-seeking, or caller-requested human matter | No automated task action beyond a private escalation record |

Assign **+1 (650) 484-0415** directly to the Router/Squad. Do not configure dynamic call assignment through this gateway. Vapi’s `assistant-request` needs a response within a short fixed call-setup window; the gateway deliberately avoids that latency-sensitive responsibility. Configure the Router assistant’s Server URL to `https://coregeo-aqp8tam3.manus.space/webhooks/vapi`, choose the reusable custom credential, and limit the relevant reporting to the end-of-call event. Vapi applies the most specific Server URL when multiple levels are configured, so do not add competing account-wide, phone-number, assistant, or tool URLs. [3] [4]

Before placing a real call, test the number with an unambiguous Operations scenario. Confirm that the call reaches the Router, that no external action occurs, and that the only resulting internal artifact is a private draft review. Then test Dev, consent-based feedback, and human-escalation scenarios. Do not enable outbound calling, live transfers, or email follow-ups during the pilot.

## 3. Required Evidence Before Enablement

| Check | Expected evidence | Owner |
|---|---|---|
| Hostinger credential scope | Read-only validation shows exactly Ops, Dev, and HR mailbox access | Technical systems owner |
| Hostinger test delivery | Each webhook receives a 2xx response and produces no external send | Operations + technical systems owner |
| Vapi credential | Gateway rejects absent or invalid bearer credentials | Technical systems owner |
| Vapi router test | End-of-call report creates one private, draft-only review according to route | Operations + technical systems owner |
| Safety review | No public record, external message, transfer, booking, deployment, credential change, or people decision occurred | Operations review chair |

> Do not treat a provider connection as permission for autonomous action. The gateway is deliberately a narrow intake and draft-review layer; human approval remains the only path to any external action.

## References

[1] [Hostinger: Agentic Mail](https://docs.hostinger.com/emails/agentic-mail)  
[2] [Vapi: Server Authentication](https://docs.vapi.ai/server-url/server-authentication)  
[3] [Vapi: Setting Server URLs](https://docs.vapi.ai/server-url/setting-server-urls)  
[4] [Vapi: Server URL Events](https://docs.vapi.ai/server-url/events)
