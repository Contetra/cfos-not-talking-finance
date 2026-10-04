import type { Stats } from "@/types";
import { site } from "./site";

/**
 * Maintained by hand — edit the numbers and bump `lastUpdated`.
 *
 * The YouTube and Instagram figures could later be fetched server-side and
 * cached (YouTube Data API `channels.list?part=statistics`, Instagram Graph
 * API), so the band stays current without an edit. Deliberately not built:
 * both need API keys and a cache layer, and four numbers that move slowly are
 * not worth a runtime dependency yet.
 */
export const stats: Stats = {
  lastUpdated: "2026-09-13",
  items: [
    {
      id: "episodes",
      mark: "episodes",
      value: 24,
      label: "episodes published",
      weight: "primary",
    },
    {
      id: "youtube",
      mark: "youtube",
      value: 1840,
      label: "subscribers on YouTube",
      weight: "secondary",
      href: site.socials.find((s) => s.platform === "youtube")?.url,
    },
    {
      id: "instagram",
      mark: "instagram",
      value: 3120,
      label: "followers on Instagram",
      weight: "secondary",
      href: site.socials.find((s) => s.platform === "instagram")?.url,
    },
    {
      id: "linkedin",
      mark: "linkedin",
      value: 5460,
      label: "followers on LinkedIn",
      weight: "secondary",
      href: site.socials.find((s) => s.platform === "linkedin")?.url,
    },
  ],
};
