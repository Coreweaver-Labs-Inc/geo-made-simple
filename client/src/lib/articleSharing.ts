const CANONICAL_ORIGIN = "https://coreweaverlabs.com";

export function createPageShareUrls(path: string, title: string) {
  const pageUrl = `${CANONICAL_ORIGIN}${path}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  const x = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`;
  const reddit = `https://www.reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(title)}`;

  return { pageUrl, linkedin, x, reddit };
}

export function createArticleShareUrls(slug: string, title: string) {
  const shareUrls = createPageShareUrls(`/insights/${encodeURIComponent(slug)}`, title);

  return { articleUrl: shareUrls.pageUrl, linkedin: shareUrls.linkedin, x: shareUrls.x };
}
