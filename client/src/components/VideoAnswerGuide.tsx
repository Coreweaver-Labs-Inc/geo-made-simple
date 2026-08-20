import { ArrowUpRight, Send } from "lucide-react";
import React, { useState } from "react";
import { answerVideoQuestion } from "@/lib/videoAnswerGuide";

type ChatMessage = { role: "user" | "assistant"; content: string; links?: Array<{ href: string; label: string }> };

const suggestedQuestions = [
  "What is the cornerstone video about?",
  "Will this make us show up in AI answers?",
  "How does this relate to SEO, content, or paid ads?",
  "How will captions and accessibility work?",
];

export function VideoAnswerGuide() {
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", content: "Ask about the planned Coreweaver video, its method, its service links, accessibility, or its stated boundaries. I answer only from approved public guidance." }]);
  const [draft, setDraft] = useState("");

  const send = (content: string) => {
    if (content.trim().length < 4) return;
    const answer = answerVideoQuestion(content);
    setMessages(current => [...current, { role: "user", content }, { role: "assistant", content: answer.message, links: answer.links }]);
    setDraft("");
  };

  return <section className="video-answer-guide" id="video-answer-guide" aria-labelledby="video-answer-guide-title">
    <div className="video-answer-guide-intro"><span>Approved-answer guide</span><h2 id="video-answer-guide-title">Ask how the planned video connects to the method.</h2><p>This is a browser-local, deterministic guide. It does not send your question to a model, retain entries, or make promises beyond the reviewed public record.</p></div>
    <div className="video-answer-guide-chat"><div className="video-answer-guide-log" role="log" aria-live="polite" aria-label="Video content guide conversation">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`video-answer-message is-${message.role}`}><p>{message.content}</p>{message.links?.length ? <p className="video-answer-links">{message.links.map(link => <a key={link.href} href={link.href}>{link.label} <ArrowUpRight size={13} aria-hidden="true" /></a>)}</p> : null}</div>)}</div>
      <div className="video-answer-prompts" aria-label="Suggested video questions">{suggestedQuestions.map(question => <button key={question} type="button" onClick={() => send(question)}>{question}</button>)}</div>
      <form className="video-answer-input" onSubmit={event => { event.preventDefault(); send(draft); }}><label className="sr-only" htmlFor="video-answer-question">Ask about the planned Coreweaver video</label><textarea id="video-answer-question" rows={3} value={draft} onChange={event => setDraft(event.target.value)} placeholder="Ask about the video, its method, captions, or relevant guides…" /><button className="button button-primary" type="submit" disabled={draft.trim().length < 4}><Send size={15} aria-hidden="true" /> Ask the guide</button></form>
    </div>
  </section>;
}
