export type AuthorProfile = {
  slug: string;
  name: string;
  role: string;
  shortBio: string;
  bio: string;
  expertise: string[];
  initials: string;
  authorityLinks: { label: string; href: string }[];
};

export const authors: AuthorProfile[] = [
  {
    slug: "mason-nguyen",
    name: "Mason Nguyen",
    role: "Founder & CEO, Coreweaver Labs",
    shortBio: "Writes about GEO signal architecture, accountable AI systems, and the evidence practices that make brands easier for AI to understand.",
    bio: "Mason Nguyen is the founder and CEO of Coreweaver Labs. His work focuses on the practical systems behind trustworthy AI representation: evidence, clear claims, useful measurement, and accountable automation.",
    expertise: ["GEO signal architecture", "Accountable AI", "AI representation", "Evidence systems"],
    initials: "MN",
    authorityLinks: [
      { label: "Coreweaver Labs on LinkedIn", href: "https://www.linkedin.com/company/coreweaver-labs-inc/" },
      { label: "COREWEAVER on Substack", href: "https://coreweaverlabs.substack.com/" },
      { label: "Coreweaver Labs on X", href: "https://x.com/coreweaverlabs" },
      { label: "Coreweaver Labs on GitHub", href: "https://github.com/Coreweaver-Labs-Inc" },
    ],
  },
];

export function getAuthorBySlug(slug: string | undefined) {
  return authors.find(author => author.slug === slug);
}

export function getAuthorByName(name: string | null | undefined) {
  const normalized = name?.trim().toLowerCase();
  return authors.find(author => author.name.toLowerCase() === normalized);
}

export function getAuthorHref(name: string | null | undefined) {
  const author = getAuthorByName(name);
  return author ? `/authors/${author.slug}` : undefined;
}
