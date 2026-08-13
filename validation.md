# Expanded Site Validation Notes

The public Framework, Products, Insights, article, and Contact routes were visually checked at desktop size. The Framework, Insights, and Contact routes were also checked at a 390px mobile viewport; each kept a readable single-column layout, accessible navigation trigger, and usable contact inputs.

The production build, TypeScript check, and five Vitest checks pass. Raw server responses were verified to include the article body, article Open Graph type, BlogPosting JSON-LD, and the fallback-backed sitemap URL for the first Insights article.

The server-rendering and technical SEO pass verifies one title, description, canonical URL, Open Graph title, Twitter card, and visible server-rendered application shell on every public route: Home, Framework, Products, Insights, the sample insight detail page, and Contact. The page source also includes Organization and WebSite structured data, BlogPosting schema for articles, an indexable `robots.txt`, and a sitemap that excludes the private studio route. Canonical URLs, sitemap URLs, and schema now use `https://coreweaverlabs.com/` consistently.

The Work With Us page was simplified to a three-step guided qualification flow. Desktop and 390px mobile views confirm that the first prompt, tap targets, progress indicator, and reassurance copy remain clear without making visitors complete a traditional long form. The new qualification-message helper is covered by two focused Vitest cases.

The managed database migration later completed successfully. The `users`, `insights`, and `contact_submissions` tables were confirmed present. With owner approval, a clearly labeled live Work With Us verification inquiry was accepted and persisted through the public contact procedure, with no owner-notification delivery warning recorded by the server. The temporary verification record was then removed to keep the inquiry list clean.

A second approved browser-driven verification completed the rendered three-step Work With Us flow against the live backend. The browser displayed the real success message, the generated qualification payload persisted in `contact_submissions`, and the server logged `Owner notification accepted` for that inquiry. The browser-verification record was removed after confirmation.

The Work With Us flow now animates step changes with a short directional opacity-and-position transition and disables nonessential motion for visitors who request reduced motion. Insight article pages now expose visible, labelled LinkedIn and X sharing controls with encoded canonical destinations. Desktop and 390px mobile reviews confirmed the controls remain clear and finger-friendly; raw SSR output also contains both sharing URLs.

The new Mason Nguyen author profile and article byline links were reviewed at desktop and 390px mobile widths. The author profile retains a readable hierarchy, compact authority topics, and a clearly separated article list. The linked article byline is visible without competing with the title or sharing controls.

The author profile now labels its LinkedIn, Substack, X, and GitHub links as Coreweaver Labs channels rather than personal accounts. Raw server-rendered HTML contains the authority links with safe external-link semantics, while desktop and mobile checks confirm the compact links remain readable and wrap cleanly.

The case-study index, governance preview, and private evidence intake form were reviewed at desktop size. The public index makes the review standard clear, the preview is conspicuously labelled as non-publishable, and the intake groups all seven required fields into a readable four-part evidence record.

At 390px, the public standards page, non-publishable preview, and seven-field intake all retain a readable single-column flow with usable form inputs and visible governance labels. Raw SSR checks confirm that the public index is crawlable and sitemap-listed, while the preview and private intake are noindexed and excluded from the sitemap. The rendered intake test confirms that a complete authorized record reaches the private-review success state without becoming public content.

The runtime sitemap retains a static fallback whenever the Insights table is temporarily unavailable, so public crawlability remains intact during a database service interruption.

The supplied Swell compliant case-study template was mapped to the private intake and approved-record contract. The intake now requires source naming, an exact supportable finding, optional metric context, reporting period, review date, a source-owner approval reference, written publication authorization, and affirmative privacy and claim-safety checks. The reusable approved-record layout now presents the work, verified finding, evidence basis, conditional metric context, and a specific non-guarantee statement. It remains a preview until an approved public record exists.

With owner approval, one clearly labelled temporary intake was submitted through the live public tRPC procedure. The server accepted the owner notification, and one row appeared in `case_study_intakes` with `received` status and all three authorization/privacy/claim-safety confirmations enabled. No matching row appeared in `case_studies`; the matching unapproved public URL returned HTTP 404 with `noindex`, and the test label was absent from the sitemap. The temporary private row was then deleted and a follow-up query returned no matching row.

The final validation pass completed successfully: TypeScript reported no errors, all 17 automated tests passed, and both client and SSR production bundles built. At 390px, the evidence-pending index, non-publishable preview, and expanded private intake preserve readable single-column hierarchy and usable controls. Raw SSR checks returned 200 for the public index with its evidence-pending body; the private intake and preview each returned 200 with `noindex`; the sitemap includes `/case-studies` and excludes both private routes.

The migration history was rechecked for reproducibility. `drizzle/0004_little_rhodey.sql` includes the first-statement addition of `case_studies.sourceName` as well as the related metric and private-review fields. A subsequent Drizzle generation run reported no pending schema changes, confirming that the tracked migrations match the current 18-column approved-record table and 19-column private-intake table.
