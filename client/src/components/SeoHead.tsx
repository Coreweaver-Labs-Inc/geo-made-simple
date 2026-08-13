import { useEffect } from "react";

export function SeoHead({ title, description, path, noIndex = false, ogType = "website" }: { title: string; description: string; path: string; noIndex?: boolean; ogType?: "website" | "article" }) {
  useEffect(() => {
    document.title = title;
    const canonicalOrigin = "https://coreweaverlabs.com";
    const updateMeta = (selector: string, content: string, attribute = "content") => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, content);
    };
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', `${canonicalOrigin}${path}`);
    updateMeta('meta[property="og:type"]', ogType);
    updateMeta('meta[name="twitter:title"]', title);
    updateMeta('meta[name="twitter:description"]', description);
    updateMeta('meta[name="robots"]', noIndex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    updateMeta('link[rel="canonical"]', `${canonicalOrigin}${path}`, "href");
  }, [description, noIndex, ogType, path, title]);
  return null;
}
