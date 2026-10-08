import { routes } from "@/data/site";
import { byNewest, SLUG_PATTERN } from "@/lib/media";
import type { Episode } from "@/types";
import caVinitBandi from "./ca-vinit-bandi";

/**
 * Every guest page on the site.
 *
 * TO ADD A GUEST: copy `_template.ts` to `<slug>.ts`, fill it in, then import
 * it here and add it to this list. Order does not matter: every list on the
 * site sorts by `publishedAt`, newest first.
 */
const all: Episode[] = [caVinitBandi];

/* Guest pages sit at the root (/ca-vinit-bandi), so a slug must not take the
   name of a real page. Checked when the site builds, so a clash fails the
   build instead of silently hiding a page. */
const reserved = new Set<string>([
  ...Object.values(routes)
    .map((path) => path.split("/")[1])
    .filter(Boolean),
  "special-guests",
  "api",
  "_next",
]);
const seen = new Set<string>();
for (const { slug } of all) {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`Episode slug "${slug}": use lowercase words joined by hyphens.`);
  }
  if (reserved.has(slug)) {
    throw new Error(`Episode slug "${slug}" clashes with the /${slug} page.`);
  }
  if (seen.has(slug)) {
    throw new Error(`Two episodes share the slug "${slug}".`);
  }
  seen.add(slug);
}

export const episodes: Episode[] = [...all].sort(byNewest);

/** The Podcast page grid. */
export const listedEpisodes = episodes.filter((e) => e.listed !== false);

/** The homepage row: the newest three marked `featured`, or the newest three
 *  listed episodes if none are marked. */
export const featuredEpisodes = (() => {
  const marked = episodes.filter((e) => e.featured);
  return (marked.length > 0 ? marked : listedEpisodes).slice(0, 3);
})();

export function getEpisode(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}
