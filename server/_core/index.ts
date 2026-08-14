import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { listPublishedCaseStudies, listPublishedInsights } from "../db";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.get("/sitemap.xml", async (_req, res) => {
    const canonicalOrigin = process.env.CANONICAL_ORIGIN || "https://coreweaverlabs.com";
    const fixedPaths = ["/", "/framework", "/products", "/services", "/insights", "/research", "/faq", "/ai-data-policy", "/case-studies", "/contact", "/authors/mason-nguyen"];
    const fallbackSlugs = ["a-practical-signal-audit", "representation-is-an-operating-concern", "measurement-without-vanity-metrics"];

    try {
      const [articles, caseStudies] = await Promise.all([listPublishedInsights(), listPublishedCaseStudies()]);
      const articleSlugs = Array.from(new Set([...fallbackSlugs, ...articles.map(article => article.slug)]));
      const urls = [...fixedPaths, ...articleSlugs.map(slug => `/insights/${slug}`), ...caseStudies.map(record => `/case-studies/${record.slug}`)];
      const body = urls
        .map(path => `  <url><loc>${canonicalOrigin}${path}</loc><changefreq>${path.startsWith("/insights/") ? "monthly" : "weekly"}</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`)
        .join("\n");
      res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`);
    } catch (error) {
      console.error("[Sitemap] Failed to render dynamic sitemap", error);
      const urls = [...fixedPaths, ...fallbackSlugs.map(slug => `/insights/${slug}`)];
      const body = urls.map(path => `  <url><loc>${canonicalOrigin}${path}</loc><changefreq>${path.startsWith("/insights/") ? "monthly" : "weekly"}</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n");
      res.type("application/xml").send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>`);
    }
  });
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
