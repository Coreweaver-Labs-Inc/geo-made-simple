import { describe, expect, it } from "vitest";
import { readGatewayConfiguration } from "./gateway";

describe("gateway production credential configuration", () => {
  it("validates the server-only Manus API key with a lightweight project-list request", async () => {
    const configuration = readGatewayConfiguration();
    expect(configuration.manusApiKey).toBeTruthy();

    const response = await fetch("https://api.manus.ai/v2/project.list", {
      headers: { "x-manus-api-key": configuration.manusApiKey! },
    });
    expect(response.ok).toBe(true);

    const body = (await response.json()) as { ok?: boolean; data?: unknown[] };
    expect(body.ok).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
  }, 20_000);

  it("validates MANUS_HOSTINGER against Hostinger Mail's read-only authenticated-account endpoint", async () => {
    expect(process.env.MANUS_HOSTINGER).toBeTruthy();
    const response = await fetch("https://api.mail.hostinger.com/api/v1/me", {
      headers: { Authorization: `Bearer ${process.env.MANUS_HOSTINGER}`, Accept: "application/json" },
    });
    expect(response.ok).toBe(true);

    const body = (await response.json()) as { data?: { mailboxes?: Array<{ address?: string }> } };
    const addresses = body.data?.mailboxes?.map(mailbox => mailbox.address?.toLowerCase()).filter((address): address is string => Boolean(address)) ?? [];
    expect(addresses.sort()).toEqual([
      "dev@coreweaverlabs.com",
      "hr@coreweaverlabs.com",
      "ops@coreweaverlabs.com",
    ]);
  }, 20_000);

  it("loads distinct inbound-only Hostinger and Vapi credentials without exposing their values", () => {
    const configuration = readGatewayConfiguration();
    const secrets = [
      configuration.hostingerWebhookTokens.ops,
      configuration.hostingerWebhookTokens.dev,
      configuration.hostingerWebhookTokens.hr,
      configuration.vapiWebhookToken,
    ];

    expect(secrets.every(Boolean)).toBe(true);
    expect(new Set(secrets).size).toBe(secrets.length);
  });

  it("validates the Vapi bearer token through the local gateway with a non-terminal event", async () => {
    const configuration = readGatewayConfiguration();
    const response = await fetch("http://localhost:3000/webhooks/vapi", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${configuration.vapiWebhookToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: { type: "transcript", call: { id: "credential-validation" } } }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ accepted: true, state: "ignored_nonterminal_event" });
  }, 20_000);

  it("validates the Vapi private management key with a one-assistant read", async () => {
    expect(process.env.VAPI_API_KEY).toBeTruthy();
    const response = await fetch("https://api.vapi.ai/assistant?limit=1", {
      headers: { Authorization: `Bearer ${process.env.VAPI_API_KEY}` },
    });

    expect(response.ok).toBe(true);
    const body = (await response.json()) as unknown;
    expect(Array.isArray(body)).toBe(true);
  }, 20_000);
});
