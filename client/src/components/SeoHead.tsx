import { useEffect } from "react";

const DEFAULT_OG_IMAGE = "/manus-storage/coreweaver-hero-identity_7f2f7654.jpg";
const DEFAULT_OG_IMAGE_ALT = "Abstract architectural weave representing a brand becoming clearer to search and AI systems.";

export function SeoHead({ title, description, path, keywords = [], noIndex = false, ogType = "website", ogImage = DEFAULT_OG_IMAGE, ogImageAlt = DEFAULT_OG_IMAGE_ALT }: { title: string; description: string; path: string; keywords?: string[]; noIndex?: boolean; ogType?: "website" | "article"; ogImage?: string; ogImageAlt?: string }) {
  useEffect(() => {
    document.title = title;
    const canonicalOrigin = (import.meta.env.VITE_CANONICAL_ORIGIN as string | undefined)?.replace(/\/$/, "") || "";
    const assetOrigin = canonicalOrigin || window.location.origin;
    const socialImage = ogImage.startsWith("/") ? `${assetOrigin}${ogImage}` : ogImage;
    const updateMeta = (selector: string, content: string, attribute = "content") => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, content);
    };
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[name="keywords"]', keywords.join(", "));
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:site_name"]', "Coreweaver Labs");
    updateMeta('meta[property="og:url"]', canonicalOrigin ? `${canonicalOrigin}${path}` : window.location.href);
    updateMeta('meta[property="og:type"]', ogType);
    updateMeta('meta[property="og:image"]', socialImage);
    updateMeta('meta[property="og:image:alt"]', ogImageAlt);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="twitter:image"]', socialImage);
    updateMeta('meta[name="twitter:image:alt"]', ogImageAlt);
    updateMeta('meta[name="robots"]', noIndex || !canonicalOrigin ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonicalOrigin) canonical?.setAttribute("href", `${canonicalOrigin}${path}`);
    else canonical?.remove();
  }, [description, keywords, noIndex, ogImage, ogImageAlt, ogType, path, title]);
  return null;
}
