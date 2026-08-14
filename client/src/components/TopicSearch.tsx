import { ArrowUpRight, Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { searchTopicLibrary } from "@/lib/topicContent";

const starterPrompts = ["Buyers cannot find the right service page", "We need content that helps a buying group decide", "Our public claims need clearer ownership"];

export function TopicSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchTopicLibrary(query), [query]);
  const hasQuery = query.trim().length > 0;

  return <section className="topic-search" aria-labelledby="topic-search-title">
    <div className="topic-search-intro"><p className="topic-search-eyebrow">Find the next useful question</p><h2 id="topic-search-title">Describe the B2B work in front of you.</h2><p>This local topic finder matches the language you type to the public hub, pillar, and guide pages available here. It does not send the query to an external AI service or store it.</p></div>
    <div className="topic-search-panel">
      <label htmlFor="topic-query">What are you trying to make clearer?</label>
      <div className="topic-search-input"><Search size={18} aria-hidden="true" /><input id="topic-query" name="topic-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="For example: buyers cannot find the right page" autoComplete="off" aria-describedby="topic-search-help" /></div>
      <p id="topic-search-help" className="topic-search-help">Try a working problem, a buyer question, or a phrase such as “content helps a buying group decide.”</p>
      {!hasQuery && <div className="topic-search-prompts" aria-label="Example searches">{starterPrompts.map((prompt) => <button key={prompt} type="button" onClick={() => setQuery(prompt)}>{prompt}</button>)}</div>}
      {hasQuery && <div className="topic-search-results" aria-live="polite">
        <p className="topic-search-status">{results.length ? `${results.length} matching ${results.length === 1 ? "page" : "pages"}` : "No close match yet"}</p>
        {results.length ? <ul>{results.map((result) => <li key={result.href}><a href={result.href}><span>{result.kind}</span><b>{result.title}</b><p>{result.description}</p><ArrowUpRight size={16} aria-hidden="true" /></a></li>)}</ul> : <div className="topic-search-empty"><p>Try a more specific buyer problem, or start with the full topic directory.</p><a className="text-link" href="/topics">Browse all B2B Growth Topics <ArrowUpRight size={15} aria-hidden="true" /></a></div>}
      </div>}
    </div>
  </section>;
}
