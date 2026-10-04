/**
 * Every piece of content on this site is typed here and lives in `data/`.
 * Components read from `data/` — nothing is hardcoded inside a component.
 */

/* -------------------------------------------------------------------------
   Site shell
------------------------------------------------------------------------- */

export type NavItem = {
  label: string;
  href: string;
  /** Route exists and is linked, but the page is a placeholder. Rendered as a
   *  small amber dot beside the label — never the word "soon". */
  comingSoon?: boolean;
};

export type SocialPlatform = "youtube" | "instagram" | "linkedin" | "spotify";

export type SocialLink = {
  platform: SocialPlatform;
  /** Display name of the platform, e.g. "YouTube". */
  name: string;
  /** Public handle, written without the leading "@" — the UI adds it. */
  handle: string;
  url: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  /** One line about the show, used in the footer and as a meta description. */
  blurb: string;
  description: string;
  producer: string;
  url: string;
  logo: string;
  logoInverse: string;
  ogImage: string;
  nav: NavItem[];
  socials: SocialLink[];
};

/* -------------------------------------------------------------------------
   Home page content
------------------------------------------------------------------------- */

/**
 * One full-bleed hero banner. The title, guest name and pull quote are
 * baked into the artwork itself — nothing here duplicates that as page
 * text, so a slide is just an image and its alt text.
 */
export type HeroImage = {
  id: string;
  /** Bunny CDN URL. Native size 1920x1080. */
  src: string;
  alt: string;
};

/**
 * Superseded by `HeroImage` above — the hero is now a banner-image slider,
 * not a guest-portrait one. Kept only so `data/guests.ts` and
 * `app/components/HeroSlide.tsx` still compile; neither file is imported
 * from anywhere anymore. Safe to delete this type along with both files.
 */
export type Guest = {
  id: string;
  name: string;
  designation: string;
  organisation: string;
  image: string;
  episodeUrl?: string;
};

/** One figure in the social reach band. `weight: "primary"` is the show's own
 *  number and is set at roughly double the size of the platform numbers. */
export type Stat = {
  id: string;
  /** Which brand mark to draw, or "episodes" for the show's own waveform mark. */
  mark: SocialPlatform | "episodes";
  value: number;
  /** Plain language, lowercase: "episodes published", "subscribers on YouTube". */
  label: string;
  weight: "primary" | "secondary";
  href?: string;
};

export type Stats = {
  items: Stat[];
  /** ISO date. These are maintained by hand — see data/stats.ts. */
  lastUpdated: string;
};

/**
 * The small looping animation in a journey stage's tile.
 *
 * Prefer "video" (.mp4/.webm) over "gif": a looping MP4 is typically 5–10x
 * smaller than the same GIF, and five autoplaying GIFs near the fold would cost
 * more than the whole rest of the page.
 *
 * "image" is a plain static icon — unlike "gif" it is NOT marked unoptimized,
 * so it still goes through next/image's normal resizing.
 */
export type JourneyMedia = {
  src: string;
  type: "gif" | "video" | "lottie" | "image";
};

export type JourneyStageItem = {
  id: string;
  /** 1-indexed. The only numbered sequence on the site. */
  number: number;
  title: string;
  /** One sentence, producer's voice. */
  copy: string;
  media: JourneyMedia;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  organisation: string;
  image: string;
};

export type CreditLine = {
  id: string;
  /** e.g. "Conceptualised and hosted by" */
  role: string;
  names: string[];
};

export type Host = {
  name: string;
  role: string;
  organisation: string;
  image: string;
  /** Paragraphs, in her own register. */
  paragraphs: string[];
};

export type GalleryItem = {
  id: string;
  type: "image" | "video" | "gif";
  /** Bunny CDN URL. */
  src: string;
  /** Required when type is "video". */
  poster?: string;
  /** Always required. */
  alt: string;
  /** This item's own dwell time in ms. A 3s GIF and a 20s clip share one reel. */
  durationMs: number;
  /** Video only: advance on the `ended` event and ignore durationMs.
   *  Falls back to durationMs if metadata never loads. */
  useMediaDuration?: boolean;
};

/* -------------------------------------------------------------------------
   About / editorial
------------------------------------------------------------------------- */

export type AboutCopy = {
  /** The large opening statement. */
  lead: string;
  /** Supporting paragraphs, set smaller. */
  body: string[];
};

/* -------------------------------------------------------------------------
   Homepage (landing design)
------------------------------------------------------------------------- */

/** One stage in "One conversation. Many ways to be heard." */
export type HomeStep = {
  id: string;
  /** 1-indexed; drawn in the circle beside the illustration. */
  number: number;
  /** Broken where the design breaks it, one string per line. */
  caption: string[];
  /** Blob + illustration, transparent PNG. */
  image: string;
};

export type HomeTeamMember = {
  id: string;
  name: string;
  /** Black-and-white cut-out on transparency. */
  image: string;
};

export type HomeTeamGroup = {
  id: "curated" | "production";
  /** Handwritten label above the group. */
  label: string;
  members: HomeTeamMember[];
};
