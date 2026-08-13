import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { capturedRecords } = vi.hoisted(() => ({ capturedRecords: [] as unknown[] }));

vi.mock("@/lib/trpc", () => ({
  trpc: {
    caseStudies: {
      submitIntake: {
        useMutation: (options: { onSuccess?: () => void }) => ({
          mutate: (payload: unknown) => {
            capturedRecords.push(payload);
            options.onSuccess?.();
          },
          isPending: false,
          error: null,
          isSuccess: capturedRecords.length > 0,
        }),
      },
    },
  },
}));

import CaseStudyIntake from "./CaseStudyIntake";

afterEach(() => {
  capturedRecords.length = 0;
  cleanup();
});

describe("CaseStudyIntake", () => {
  it("submits the complete governance record only after written authorization is confirmed", async () => {
    const user = userEvent.setup();
    render(<CaseStudyIntake />);

    await user.type(screen.getByLabelText(/client name or authorized anonymous label/i), "Authorized anonymous platform");
    await user.type(screen.getByLabelText(/^source name/i), "Approved Q1 visibility report");
    await user.type(screen.getByLabelText(/source url or document reference/i), "Q1 evidence report, source tab, approved access folder");
    await user.type(screen.getByLabelText(/exact supportable finding/i), "The reviewed source supports this exact finding, method, reporting context, and approved wording.");
    await user.type(screen.getByLabelText(/scope of work/i), "GEO architecture review across approved service pages and evidence sources.");
    const dateInputs = screen.getAllByDisplayValue("");
    const dateOnly = dateInputs.filter(input => input.getAttribute("type") === "date");
    fireEvent.change(dateOnly[0]!, { target: { value: "2026-01-01" } });
    fireEvent.change(dateOnly[1]!, { target: { value: "2026-03-31" } });
    fireEvent.change(dateOnly[2]!, { target: { value: "2026-04-15" } });
    await user.type(screen.getByLabelText(/source-owner approval reference/i), "Signed source-owner release ID Q1-2026.");
    await user.type(screen.getByLabelText(/written publication authorization record/i), "Jordan Lee, VP Marketing, approved this authorized anonymous label and exact public wording on 2026-04-15.");
    const confirmations = screen.getAllByRole("checkbox");
    await user.click(confirmations[0]!);
    await user.click(confirmations[1]!);
    await user.click(confirmations[2]!);
    await user.click(screen.getByRole("button", { name: /submit for review/i }));

    expect(await screen.findByText("Your evidence record is in review.")).toBeTruthy();
    expect(capturedRecords).toHaveLength(1);
    expect(capturedRecords[0]).toMatchObject({ clientLabel: "Authorized anonymous platform", sourceName: "Approved Q1 visibility report", authorizationConfirmed: true, privacyReviewConfirmed: true, claimReviewConfirmed: true });
  });
});
