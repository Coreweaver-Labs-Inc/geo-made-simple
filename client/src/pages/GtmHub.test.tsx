import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { capturedRequests, capturedGuidance } = vi.hoisted(() => ({ capturedRequests: [] as unknown[], capturedGuidance: [] as unknown[] }));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    gtm: {
      submitRequest: {
        useMutation: (options: { onSuccess?: () => void }) => ({
          mutate: (payload: unknown) => {
            capturedRequests.push(payload);
            options.onSuccess?.();
          },
          isPending: false,
          error: null,
          isSuccess: capturedRequests.length > 0,
        }),
      },
      supportAssistant: {
        useMutation: (options: { onSuccess?: (reply: { reply: string; recommendedPath: "sales" | "support"; recommendedService: "seo" | "content_marketing" | "paid_ads" | "not_sure"; urgency: "standard" | "high"; summary: string }) => void }) => ({
          mutate: (payload: unknown) => {
            capturedGuidance.push(payload);
            options.onSuccess?.({ reply: "A human will review the next step.", recommendedPath: "sales", recommendedService: "seo", urgency: "standard", summary: "New SEO inquiry." });
          },
          isPending: false,
        }),
      },
    },
  },
}));

import GtmHub from "./GtmHub";

afterEach(() => {
  capturedRequests.length = 0;
  capturedGuidance.length = 0;
  cleanup();
});

describe("GtmHub", () => {
  it("provides named request controls with a logical keyboard path", async () => {
    const user = userEvent.setup();
    render(<GtmHub />);
    const name = screen.getByLabelText(/^name$/i);
    const email = screen.getByLabelText(/business email/i);
    name.focus();
    await user.tab();
    expect(document.activeElement).toBe(email);
    expect(screen.getByRole("button", { name: /talk to sales/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /request customer support/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /send private request/i })).toBeTruthy();
    expect(screen.getByText("Research estimate: from $6,500/month")).toBeTruthy();
    expect(screen.getAllByText("Research estimate: from $7,500/month")).toHaveLength(2);
  });

  it("submits a private service inquiry without turning it into a public engagement", async () => {
    const user = userEvent.setup();
    render(<GtmHub />);
    await user.type(screen.getByLabelText(/^name$/i), "Jordan Lee");
    await user.type(screen.getByLabelText(/business email/i), "jordan@example.com");
    await user.type(screen.getByLabelText(/what outcome are you trying to create/i), "We need an evidence-led GTM operating plan that aligns our sales, marketing, research, design, operations, and customer support teams.");
    await user.click(screen.getByRole("button", { name: /send private request/i }));
    expect(await screen.findByText("Your sales request is in the private queue.")).toBeTruthy();
    expect(capturedRequests).toHaveLength(1);
    expect(capturedRequests[0]).toMatchObject({ requestType: "service_inquiry", fullName: "Jordan Lee", serviceInterest: "not_sure" });
  });

  it("uses the AI guide only for a recommendation, then sends the visitor to the private sales form", async () => {
    const user = userEvent.setup();
    render(<GtmHub />);
    await user.click(screen.getByRole("button", { name: /considering seo/i }));
    expect(capturedGuidance).toHaveLength(1);
    expect(await screen.findByText(/recommended: talk to sales/i)).toBeTruthy();
    await user.click(screen.getByRole("button", { name: /continue to the private form/i }));
    expect(screen.getByRole("button", { name: /talk to sales/i }).className).toContain("is-active");
    expect((screen.getByLabelText(/service interest/i) as HTMLSelectElement).value).toBe("seo");
  });
});
