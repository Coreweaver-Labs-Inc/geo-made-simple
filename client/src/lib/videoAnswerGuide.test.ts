import { describe, expect, it } from "vitest";
import { answerVideoQuestion } from "./videoAnswerGuide";

describe("answerVideoQuestion", () => {
  it("returns the approved AI-answer boundary without making an outcome claim", () => {
    const answer = answerVideoQuestion("Will this help us show up in AI answers?");
    expect(answer.message).toContain("does not control third-party AI systems");
    expect(answer.links.map(link => link.href)).toContain("/topics/ai-representation/ai-answer-review");
  });

  it("routes service questions to approved public guides", () => {
    const answer = answerVideoQuestion("How does the video relate to paid ads and content marketing?");
    expect(answer.message).toContain("none promises rankings, leads, or return on ad spend");
    expect(answer.links.map(link => link.href)).toContain("/topics");
  });

  it("uses a transparent fallback for questions outside the approved brief", () => {
    const answer = answerVideoQuestion("What exact result should I expect?");
    expect(answer.message).toContain("only answer from the approved video brief");
  });
});
