export type VideoAnswerLink = { href: string; label: string };

export type VideoAnswer = {
  message: string;
  links: VideoAnswerLink[];
};

const methodLink: VideoAnswerLink = { href: "/method", label: "Read the Coreweaver Method" };

export function answerVideoQuestion(input: string): VideoAnswer {
  const question = input.trim().toLowerCase();

  if (/(what.*video|video.*about|cornerstone|explainer)/.test(question)) {
    return {
      message: "The planned cornerstone video explains one idea: clearer public information starts with a buyer question, current support, and a connected next route. It is a method explanation, not a client result or a promise about channel performance.",
      links: [methodLink],
    };
  }

  if (/(ai answer|ai visibility|citation|show up in ai|answer engine)/.test(question)) {
    return {
      message: "Coreweaver’s method aims to make public information easier for people and systems to inspect. It does not control third-party AI systems or promise citation, retrieval, placement, traffic, or demand.",
      links: [{ href: "/topics/ai-representation/ai-answer-review", label: "Use the AI answer review guide" }, methodLink],
    };
  }

  if (/(seo|search|content marketing|content refresh|paid|ads|landing page)/.test(question)) {
    return {
      message: "The video’s method applies across SEO, buyer enablement content, and paid-message learning by connecting one buyer question to current support and a useful public route. Each area has a separate decision guide; none promises rankings, leads, or return on ad spend.",
      links: [{ href: "/topics", label: "Explore the B2B Growth Topics" }, { href: "/topics/b2b-content-marketing/content-refresh", label: "Review the content-refresh guide" }],
    };
  }

  if (/(caption|accessible|accessibility|music|narration|format|length|16:9|vertical)/.test(question)) {
    return {
      message: "The approved master is a 75–90 second 16:9 explainer with calm narration, reviewed captions, readable visual labels, and restrained ambient music that is not required to understand the message. A vertical cutdown is optional after the master is approved.",
      links: [methodLink],
    };
  }

  if (/(review|work with|custom|clarity|help)/.test(question)) {
    return {
      message: "If your team has a specific public-information question, Coreweaver can begin with a private conversation. A human reviews the context before any engagement, scope, or commercial term is discussed.",
      links: [{ href: "/contact", label: "Start a private conversation" }, methodLink],
    };
  }

  return {
    message: "I only answer from the approved video brief and linked public guides. Try asking what the video explains, how it relates to AI answers or services, how accessibility is handled, or where to start a private conversation.",
    links: [methodLink, { href: "/topics", label: "Browse B2B Growth Topics" }],
  };
}
