# Expanded Site Validation Notes

The public Framework, Products, Insights, article, and Contact routes were visually checked at desktop size. The Framework, Insights, and Contact routes were also checked at a 390px mobile viewport; each kept a readable single-column layout, accessible navigation trigger, and usable contact inputs.

The production build, TypeScript check, and five Vitest checks pass. Raw server responses were verified to include the article body, article Open Graph type, BlogPosting JSON-LD, and the fallback-backed sitemap URL for the first Insights article.

The managed database hostname was intermittently unavailable during schema application. The generated migration remains in `drizzle/0000_marvelous_smasher.sql`, and the runtime sitemap uses a static fallback whenever the Insights table is not reachable. Contact submissions notify the project owner and persist to the database when those managed services are available; the final live-delivery test remains pending until the migration succeeds.

