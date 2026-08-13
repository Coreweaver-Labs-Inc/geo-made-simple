import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { capturedSubmissions } = vi.hoisted(() => ({ capturedSubmissions: [] as unknown[] }));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    contact: {
      submit: {
        useMutation: (options: { onSuccess?: () => void }) => ({
          mutate: (payload: unknown) => {
            capturedSubmissions.push(payload);
            options.onSuccess?.();
          },
          isPending: false,
          error: null,
        }),
      },
    },
  },
}));

import { ContactForm } from "./ContactForm";

afterEach(() => {
  capturedSubmissions.length = 0;
  cleanup();
});

describe("ContactForm", () => {
  it("guides a visitor through choices and supports back navigation", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /make our brand easier/i }));
    expect(await screen.findByRole("heading", { name: "Where are you today?" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /change focus/i }));
    expect(await screen.findByRole("heading", { name: /what would make this conversation useful/i })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /build accountable ai systems/i }));
    await screen.findByRole("heading", { name: "Where are you today?" });
    await user.click(screen.getByRole("button", { name: /we need a practical plan/i }));
    expect(await screen.findByRole("heading", { name: /where should we send the next step/i })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /change stage/i }));
    expect(await screen.findByRole("heading", { name: "Where are you today?" })).toBeTruthy();
  });

  it("renders validation feedback and then the success state after a valid guided submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: /talk through a different challenge/i }));
    await screen.findByRole("heading", { name: "Where are you today?" });
    await user.click(screen.getByRole("button", { name: /we are ready to move/i }));
    await screen.findByRole("heading", { name: /where should we send the next step/i });
    await user.click(screen.getByRole("button", { name: /send my answers/i }));

    expect(await screen.findByText("Please enter your name.")).toBeTruthy();
    expect(screen.getByText("Please enter your email address.")).toBeTruthy();
    expect(capturedSubmissions).toHaveLength(0);

    await user.type(screen.getByLabelText(/name/i), "Jordan Lee");
    await user.type(screen.getByLabelText(/work email/i), "jordan@example.com");
    await user.click(screen.getByRole("button", { name: /send my answers/i }));

    expect(await screen.findByText("Your request is in.")).toBeTruthy();
    expect(capturedSubmissions).toHaveLength(1);
    expect(capturedSubmissions[0]).toMatchObject({
      fullName: "Jordan Lee",
      email: "jordan@example.com",
      message: expect.stringContaining("Talk through a different challenge"),
    });
  });
});
