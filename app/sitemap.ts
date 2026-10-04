import type { MetadataRoute } from "next";

import { routes, site } from "@/data/site";

/**
 * Next only reads sitemap.ts from the root of `app/`.
 *
 * The three coming-soon routes are deliberately excluded — they also carry
 * `robots: { index: false }` in their own metadata. Add them here once the
 * real pages ship.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => new URL(path, site.url).toString();
  const lastModified = new Date();

  return [
    {
      url: abs(routes.home),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: abs(routes.joinUs),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
