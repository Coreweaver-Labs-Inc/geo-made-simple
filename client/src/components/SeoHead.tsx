import { useEffect } from "react";

export function SeoHead({ title, description, path, noIndex = false }: { title: string; description: string; path: string; noIndex?: boolean }) {
  useEffect(() => {
    document.title = title;
    const canonicalOrigin = "https://coreweaver.io";
    const updateMeta = (selector: string, content: string, attribute = "content") => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, content);
    };
    updateMeta('meta[name="description"]', description);
    updateMeta('meta[property="og:title"]', title);
    updateMeta('meta[property="og:description"]', description);
    updateMeta('meta[property="og:url"]', `${canonicalOrigin}${path}`);
    updateMeta('meta[name="robots"]', noIndex ? "noindex, nofollow" : "index, follow");
    updateMeta('link[rel="canonical"]', `${canonicalOrigin}${path}`, "href");
  }, [description, noIndex, path, title]);
  return null;
}
