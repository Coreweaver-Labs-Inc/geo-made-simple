# Expanded Site Validation Notes

The public Framework, Products, Insights, article, and Contact routes were visually checked at desktop size. The Framework, Insights, and Contact routes were also checked at a 390px mobile viewport; each kept a readable single-column layout, accessible navigation trigger, and usable contact inputs.

The production build, TypeScript check, and five Vitest checks pass. Raw server responses were verified to include the article body, article Open Graph type, BlogPosting JSON-LD, and the fallback-backed sitemap URL for the first Insights article.

The server-rendering and technical SEO pass verifies one title, description, canonical URL, Open Graph title, Twitter card, and visible server-rendered application shell on every public route: Home, Framework, Products, Insights, the sample insight detail page, and Contact. The page source also includes Organization and WebSite structured data, BlogPosting schema for articles, an indexable `robots.txt`, and a sitemap that excludes the private studio route. Canonical URLs, sitemap URLs, and schema now use `https://coreweaverlabs.com/` consistently.

The Work With Us page was simplified to a three-step guided qualification flow. Desktop and 390px mobile views confirm that the first prompt, tap targets, progress indicator, and reassurance copy remain clear without making visitors complete a traditional long form. The new qualification-message helper is covered by two focused Vitest cases.

The managed database migration later completed successfully. The `users`, `insights`, and `contact_submissions` tables were confirmed present. With owner approval, a clearly labeled live Work With Us verification inquiry was accepted and persisted through the public contact procedure, with no owner-notification delivery warning recorded by the server. The temporary verification record was then removed to keep the inquiry list clean.

A second approved browser-driven verification completed the rendered three-step Work With Us flow against the live backend. The browser displayed the real success message, the generated qualification payload persisted in `contact_submissions`, and the server logged `Owner notification accepted` for that inquiry. The browser-verification record was removed after confirmation.

The runtime sitemap retains a static fallback whenever the Insights table is temporarily unavailable, so public crawlability remains intact during a database service interruption.
