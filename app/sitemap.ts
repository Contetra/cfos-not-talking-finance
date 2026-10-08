import type { MetadataRoute } from "next";

import { blogPosts } from "@/data/blogs";
import { episodes } from "@/data/episodes";
import { blogPath, episodePath, routes, site } from "@/data/site";

/**
 * Next only reads sitemap.ts from the root of `app/`.
 *
 * Every guest page and blog post is listed automatically from data/. The
 * contact page is still a placeholder and stays out (it is noindexed too).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => new URL(path, site.url).toString();
  const lastModified = new Date();

  return [
    { url: abs(routes.home), lastModified, changeFrequency: "weekly", priority: 1 },
    { url: abs(routes.podcast), lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: abs(routes.blogs), lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: abs(routes.joinUs), lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...episodes.map((episode) => ({
      url: abs(episodePath(episode.slug)),
      lastModified: new Date(episode.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((post) => ({
      url: abs(blogPath(post.slug)),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
