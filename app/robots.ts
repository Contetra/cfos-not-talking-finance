import type { MetadataRoute } from "next";

import { routes, site } from "@/data/site";

/**
 * Next only reads robots.ts from the root of `app/`.
 *
 * The three coming-soon routes are disallowed here as well as being noindexed
 * in their own page metadata. Remove each line as the real page ships.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [routes.specialGuests, routes.blogs, routes.contactUs],
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
