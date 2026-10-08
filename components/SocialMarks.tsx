import type { ListenPlatform, SocialPlatform } from "@/types";

/**
 * Brand marks, drawn here as geometry rather than pulled from an icon pack, so
 * every mark sits on the same 24x24 grid and is optically balanced at ~28px.
 *
 * - youtube / linkedin / spotify are solid badges with their glyph knocked out
 *   (one path, `fillRule="evenodd"`), so they read as a single silhouette.
 * - instagram is line-drawn, exactly as the real mark is: rounded square,
 *   concentric lens, solid dot at upper right.
 * - "episodes" is the show's own mark: the logo's headphone band and its two
 *   squared quote-block earcups.
 *
 * Everything is `currentColor`; size it with `className` (e.g. `size-11`).
 */

type MarkName = SocialPlatform | "episodes";

/* "episodes" is the show's own mark, lifted from the logo: an open headphone
   band arcing over the top, closed by the two squared quote blocks the logo
   uses as earcups. Drawn, not borrowed. */
const HEADPHONE_ARC = "M3.4 15.2V12a8.6 8.6 0 0 1 17.2 0v3.2";
const EARCUP_LEFT = "M2 14h3.4v6.4H3.6A1.6 1.6 0 0 1 2 18.8Z";
const EARCUP_RIGHT = "M18.6 14H22v4.8a1.6 1.6 0 0 1-1.6 1.6h-1.8Z";

/* YouTube: rounded badge, play triangle knocked out. The triangle's centroid
   sits on the badge centre rather than its bounding box, which is what stops it
   looking left-heavy. */
const YOUTUBE_D =
  "M5.5 4.6h13A4.5 4.5 0 0 1 23 9.1v5.8a4.5 4.5 0 0 1-4.5 4.5h-13A4.5 4.5 0 0 1 1 14.9V9.1a4.5 4.5 0 0 1 4.5-4.5Z" +
  "M9.8 8.6 16.2 12l-6.4 3.4Z";

/* LinkedIn: rounded square with the lowercase "in" knocked out — dot, stem,
   and the n as one closed shape. */
const LINKEDIN_D =
  "M4 1.5h16A2.5 2.5 0 0 1 22.5 4v16a2.5 2.5 0 0 1-2.5 2.5H4A2.5 2.5 0 0 1 1.5 20V4A2.5 2.5 0 0 1 4 1.5Z" +
  "M6.6 5.15a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5Z" +
  "M5.15 9.9h2.9v8.95h-2.9Z" +
  "M10.05 9.9h2.78v1.22h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.9 3.47 4.38v4.85h-2.9v-4.3c0-1.03-.02-2.35-1.44-2.35-1.44 0-1.66 1.12-1.66 2.28v4.37h-3.03Z";

/* Spotify: solid disc with the three curved bars knocked out. Each bar is a
   band between two concentric arcs whose shared centre sits below the disc, so
   the bars flatten and shorten as they descend, as they do on the real mark. */
const SPOTIFY_D =
  "M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22Z" +
  "M5.2 10.4A9 9 0 0 1 18.8 10.4L17.06 11.91A6.7 6.7 0 0 0 6.94 11.91Z" +
  "M6.7 12.93A7 7 0 0 1 17.3 12.93L15.71 14.3A4.9 4.9 0 0 0 8.29 14.3Z" +
  "M8 15.33A5.2 5.2 0 0 1 16 15.33L14.54 16.54A3.3 3.3 0 0 0 9.46 16.54Z";

export function SocialMark({
  platform,
  className,
}: {
  platform: MarkName;
  className?: string;
}) {
  const base = {
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": true,
    focusable: "false",
  } as const;

  switch (platform) {
    case "youtube":
      return (
        <svg {...base} fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d={YOUTUBE_D} />
        </svg>
      );

    case "linkedin":
      return (
        <svg {...base} fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d={LINKEDIN_D} />
        </svg>
      );

    case "instagram":
      return (
        <svg
          {...base}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinejoin="round"
        >
          <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" />
          <circle cx="12" cy="12" r="4.35" />
          <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
        </svg>
      );

    case "spotify":
      return (
        <svg {...base} fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d={SPOTIFY_D} />
        </svg>
      );

    case "episodes":
      return (
        <svg {...base} fill="none">
          <path
            d={HEADPHONE_ARC}
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
          />
          <path d={EARCUP_LEFT} fill="currentColor" />
          <path d={EARCUP_RIGHT} fill="currentColor" />
        </svg>
      );
  }
}

/**
 * Marks for the listening platforms. Spotify and YouTube reuse the badges
 * above; JioSaavn and Apple Podcasts are line-drawn, like the Instagram mark,
 * so they read on navy and on white without a knockout.
 */
export function ListenMark({
  platform,
  className,
}: {
  platform: ListenPlatform;
  className?: string;
}) {
  const base = {
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": true,
    focusable: "false",
  } as const;

  switch (platform) {
    case "spotify":
    case "youtube":
      return <SocialMark platform={platform} className={className} />;

    case "apple-podcasts":
      // The podcast glyph: two open rings around a microphone head and stem.
      return (
        <svg {...base} fill="none">
          <path
            d="M6.2 17.2A8.2 8.2 0 1 1 17.8 17.2"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
          />
          <path
            d="M8.7 14.4A4.7 4.7 0 1 1 15.3 14.4"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
          />
          <circle cx="12" cy="10.8" r="2" fill="currentColor" />
          <rect x="10.8" y="13.6" width="2.4" height="8" rx="1.2" fill="currentColor" />
        </svg>
      );

    case "jiosaavn":
      // A ringed disc holding a single note.
      return (
        <svg {...base} fill="none">
          <circle cx="12" cy="12" r="9.6" stroke="currentColor" strokeWidth={1.9} />
          <ellipse cx="10.1" cy="15.7" rx="2.3" ry="1.85" fill="currentColor" />
          <rect x="11.3" y="6.6" width="1.7" height="9.2" rx="0.6" fill="currentColor" />
          <path d="M12.6 6.6c1.9.3 3.6 1.5 3.8 3.6-1-.9-2.3-1.4-3.8-1.5Z" fill="currentColor" />
        </svg>
      );
  }
}
