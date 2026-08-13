const CANONICAL_ORIGIN = "https://coreweaverlabs.com";

export function createArticleShareUrls(slug: string, title: string) {
  const articleUrl = `${CANONICAL_ORIGIN}/insights/${encodeURIComponent(slug)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  const x = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(articleUrl)}`;

  return { articleUrl, linkedin, x };
}
