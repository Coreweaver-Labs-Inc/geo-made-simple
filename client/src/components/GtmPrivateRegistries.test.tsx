import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/_core/hooks/useAuth", () => ({ useAuth: () => ({ user: { role: "admin" } }) }));

const invalidate = vi.fn();
vi.mock("@/lib/trpc", () => ({
  trpc: {
    useUtils: () => ({ gtm: { listAccounts: { invalidate }, listContacts: { invalidate }, listRequests: { invalidate } } }),
    gtm: {
      listAccounts: { useQuery: () => ({ data: [{ id: 1, name: "Acme Systems", website: null, segment: "B2B software", status: "prospect", ownerName: "Sales owner" }] }) },
      listContacts: { useQuery: () => ({ data: [{ id: 2, accountId: 1, fullName: "Jordan Lee", email: "jordan@example.com", roleTitle: "VP Marketing", status: "active" }] }) },
      listRequests: { useQuery: () => ({ data: [{ id: 3, requestType: "service_inquiry", fullName: "Alex Rivera", email: "alex@example.com", organization: "Example Co", serviceInterest: "gtm_enablement_sprint", subject: null, message: "We need a clear operating model across our GTM functions.", urgency: "standard", status: "new", ownerName: null }] }) },
      updateAccount: { useMutation: () => ({ mutate: vi.fn(), isPending: false, error: null }) },
      updateContact: { useMutation: () => ({ mutate: vi.fn(), isPending: false, error: null }) },
      updateRequest: { useMutation: () => ({ mutate: vi.fn(), isPending: false, error: null }) },
    },
  },
}));

import { GtmPrivateRegistries } from "./GtmPrivateRegistries";

afterEach(() => cleanup());

describe("GtmPrivateRegistries", () => {
  it("labels private registry and triage controls with a logical keyboard path", async () => {
    const user = userEvent.setup();
    render(<GtmPrivateRegistries />);
    const owner = screen.getByLabelText(/^owner$/i);
    const state = screen.getByLabelText(/^state$/i);
    owner.focus();
    await user.tab();
    expect(document.activeElement).toBe(state);
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: /^save$/i }));
    const contactStatus = screen.getByLabelText(/^status$/i);
    const privateOwner = screen.getByLabelText(/private owner/i);
    const triageState = screen.getByLabelText(/triage state/i);
    const saveTriage = screen.getByRole("button", { name: /save triage/i });
    await user.tab();
    expect(document.activeElement).toBe(contactStatus);
    await user.tab();
    expect(document.activeElement).toBe(privateOwner);
    await user.tab();
    expect(document.activeElement).toBe(triageState);
    await user.tab();
    expect(document.activeElement).toBe(saveTriage);
  });
});
