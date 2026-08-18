import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it } from "vitest";
import Topics from "./Topics";
import { childTopics, getTopic, topics } from "@/lib/topicContent";

afterEach(cleanup);

describe("B2B Growth Topics", () => {
  it("presents the five evidence-led clusters with crawlable spoke links", () => {
    render(<Topics />);
    expect(screen.getByRole("heading", { name: /useful topics for teams building a clearer commercial story/i })).toBeTruthy();
    expect(topics).toHaveLength(5);
    expect(screen.getByRole("link", { name: /explore mid-market b2b seo/i }).getAttribute("href")).toBe("/topics/b2b-seo");
    expect(screen.getByRole("link", { name: /explore ai representation/i }).getAttribute("href")).toBe("/topics/ai-representation");
  });

  it("keeps every topic connected to a service, resources, related topics, and a no-guarantee boundary", () => {
    for (const topic of topics) {
      expect(getTopic(topic.slug)).toEqual(topic);
      expect(topic.serviceLink.href).toBe("/services");
      expect(topic.relatedResources.length).toBeGreaterThan(1);
      expect(topic.relatedTopicSlugs.length).toBeGreaterThan(1);
      expect(topic.boundary.toLowerCase()).toMatch(/does not guarantee|does not promise/);
    }
  });

  it("makes the implemented child guides available to the deterministic topic finder", () => {
    render(<Topics />);
    expect(childTopics.map((topic) => `${topic.parentSlug}/${topic.slug}`)).toEqual(["b2b-seo/website-information-architecture", "b2b-content-marketing/buyer-enablement", "b2b-paid-ads/message-landing-page-alignment", "content-governance/claim-ledger"]);
    expect(screen.getByRole("searchbox", { name: /what are you trying to make clearer/i })).toBeTruthy();
  });

  it("labels each topic card by the reader-purpose resource type", () => {
    render(<Topics />);
    expect(screen.getAllByText("Start here")).toHaveLength(1);
    expect(screen.getAllByText("Decision guide")).toHaveLength(2);
    expect(screen.getAllByText("Working method")).toHaveLength(1);
    expect(screen.getAllByText("Research standard")).toHaveLength(1);
  });
});
