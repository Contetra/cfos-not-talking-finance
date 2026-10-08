import type { MetadataRoute } from "next";

import { routes, site } from "@/data/site";

/**
 * Next only reads robots.ts from the root of `app/`.
 *
 * The contact page is still a placeholder: disallowed here as well as being
 * noindexed in its own metadata. Remove the line when the real page ships.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [routes.contactUs],
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
