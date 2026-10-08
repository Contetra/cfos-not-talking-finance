import { byNewest, SLUG_PATTERN } from "@/lib/media";
import type { BlogPost } from "@/types";
import caVinitBandi from "./ca-vinit-bandi";

/**
 * Every blog post on the site.
 *
 * TO ADD A POST: copy `_template.ts` to `<slug>.ts`, fill it in, then import
 * it here and add it to this list. Order does not matter: every list on the
 * site sorts by `publishedAt`, newest first.
 */
const all: BlogPost[] = [caVinitBandi];

const seen = new Set<string>();
for (const post of all) {
  if (!SLUG_PATTERN.test(post.slug)) {
    throw new Error(`Blog slug "${post.slug}": use lowercase words joined by hyphens.`);
  }
  if (seen.has(post.slug)) {
    throw new Error(`Two blog posts share the slug "${post.slug}".`);
  }
  if (!post.youtubeId && !post.cover) {
    throw new Error(`Blog post "${post.slug}" needs a youtubeId or a cover image.`);
  }
  seen.add(post.slug);
}

export const blogPosts: BlogPost[] = [...all].sort(byNewest);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** The newest posts, optionally leaving one out (the post being read). */
export function latestPosts(limit: number, exceptSlug?: string): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== exceptSlug).slice(0, limit);
}
