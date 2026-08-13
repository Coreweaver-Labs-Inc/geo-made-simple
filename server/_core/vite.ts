import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import superjson from "superjson";
import { buildSsrPrefetch } from "./ssrCaller";
import type { HeadMeta } from "../../client/src/ssr/prefetch";

const CANONICAL_ORIGIN = process.env.CANONICAL_ORIGIN || "https://coreweaver.io";
const SITE_NAME = process.env.SITE_NAME || "Coreweaver Labs";
const escapeHtml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const compact = (value: string, max: number) => {
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean;
};

function headTags(head: HeadMeta) {
  const title = escapeHtml(compact(head.title, 70));
  const description = escapeHtml(compact(head.description, 200));
  const canonical = head.canonicalPath ? `${CANONICAL_ORIGIN}${head.canonicalPath}` : "";
  const ogImage = head.ogImage ? (head.ogImage.startsWith("/") ? `${CANONICAL_ORIGIN}${head.ogImage}` : head.ogImage) : "";
  return [
    `<title>${title}</title>`, `<meta name="description" content="${description}" />`, `<meta property="og:type" content="${head.ogType || "website"}" />`, `<meta property="og:site_name" content="${SITE_NAME}" />`, `<meta property="og:title" content="${title}" />`, `<meta property="og:description" content="${description}" />`, `<meta name="twitter:card" content="${ogImage ? "summary_large_image" : "summary"}" />`, `<meta name="twitter:title" content="${title}" />`, `<meta name="twitter:description" content="${description}" />`,
    canonical ? `<link rel="canonical" href="${canonical}" /><meta property="og:url" content="${canonical}" />` : "",
    ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}" /><meta name="twitter:image" content="${escapeHtml(ogImage)}" />` : "",
    head.ogType === "article" && head.publishedTime ? `<meta property="article:published_time" content="${escapeHtml(head.publishedTime)}" />` : "",
    head.notFound || head.noindex ? `<meta name="robots" content="noindex, follow" />` : "",
  ].filter(Boolean).join("\n");
}

function composeHtml(template: string, html: string, head: HeadMeta, state: unknown) {
  const serialized = JSON.stringify(superjson.serialize(state)).replace(/</g, "\\u003c");
  const preloadMatch = html.match(/^(?:<link rel="preload"[^>]*\/>)+/);
  const preloads = preloadMatch?.[0] || "";
  const appHtml = preloads ? html.slice(preloads.length) : html;
  return template.replace("</head>", () => `${preloads}</head>`).replace("</body>", () => `<script>window.__RQ_STATE__ = ${serialized}</script></body>`).replace("<!--app-head-->", () => headTags(head)).replace("<!--app-html-->", () => appHtml);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(`src="/src/entry-client.tsx"`, `src="/src/entry-client.tsx?v=${nanoid()}"`);
      template = await vite.transformIndexHtml(url, template);
      template = template.replace("</head>", `<link rel="stylesheet" href="/src/index.css?direct" data-ssr-dev-css></head>`);
      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
      const prefetch = await buildSsrPrefetch(req, res);
      const result = await render(url, prefetch);
      res.status(result.head.notFound ? 404 : 200).set({ "Content-Type": "text/html", "Cache-Control": "no-cache" }).end(composeHtml(template, result.html, result.head, result.dehydratedState));
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use((req, res, next) => {
    if (req.path === "/index.html") return res.redirect(301, "/");
    if (req.path !== "/" && /\/+$/ .test(req.path)) return res.redirect(301, req.path.replace(/\/+$/ , "") + req.originalUrl.slice(req.path.length));
    next();
  });
  app.use(express.static(distPath, { index: false, redirect: false }));
  const templatePath = path.resolve(distPath, "index.html");
  const serverEntryPath = path.resolve(import.meta.dirname, "server-ssr", "entry-server.js");
  app.use("*", async (req, res) => {
    try {
      const template = await fs.promises.readFile(templatePath, "utf-8");
      const { render } = await import(serverEntryPath);
      const prefetch = await buildSsrPrefetch(req, res);
      const result = await render(req.originalUrl, prefetch);
      res.status(result.head.notFound ? 404 : 200).set("Cache-Control", "no-cache").type("html").end(composeHtml(template, result.html, result.head, result.dehydratedState));
    } catch (error) {
      console.error("[SSR] render failed, serving shell:", error);
      const template = await fs.promises.readFile(templatePath, "utf-8");
      res.status(200).set("Cache-Control", "no-cache").type("html").end(template.replace("<!--app-head-->", () => headTags({ title: SITE_NAME, description: "Practical GEO infrastructure for companies that want to be clearer, more consistent, and more citable in AI search." })).replace("<!--app-html-->", () => ""));
    }
  });
}
