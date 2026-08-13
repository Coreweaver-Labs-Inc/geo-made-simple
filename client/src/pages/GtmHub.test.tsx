import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { capturedRequests } = vi.hoisted(() => ({ capturedRequests: [] as unknown[] }));

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
    },
  },
}));

import GtmHub from "./GtmHub";

afterEach(() => {
  capturedRequests.length = 0;
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
    expect(screen.getByRole("button", { name: /start a gtm engagement/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /request customer support/i })).toBeTruthy();
    expect(screen.getByRole("button", { name: /send private request/i })).toBeTruthy();
  });

  it("submits a private service inquiry without turning it into a public engagement", async () => {
    const user = userEvent.setup();
    render(<GtmHub />);
    await user.type(screen.getByLabelText(/^name$/i), "Jordan Lee");
    await user.type(screen.getByLabelText(/business email/i), "jordan@example.com");
    await user.type(screen.getByLabelText(/what outcome are you trying to create/i), "We need an evidence-led GTM operating plan that aligns our sales, marketing, research, design, operations, and customer support teams.");
    await user.click(screen.getByRole("button", { name: /send private request/i }));
    expect(await screen.findByText("Your GTM request is in the private queue.")).toBeTruthy();
    expect(capturedRequests).toHaveLength(1);
    expect(capturedRequests[0]).toMatchObject({ requestType: "service_inquiry", fullName: "Jordan Lee", serviceInterest: "not_sure" });
  });
});
