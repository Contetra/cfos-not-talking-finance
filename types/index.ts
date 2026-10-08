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
  /** Two sentences, third person: the "About Host" block on episode and blog
   *  pages. */
  about: string;
  /** Where "Say Hello!" and the episode credits point. */
  linkedin: string;
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

/* -------------------------------------------------------------------------
   Listening platforms
------------------------------------------------------------------------- */

export type ListenPlatform = "spotify" | "youtube" | "jiosaavn" | "apple-podcasts";

/** One place to hear the show. A platform with no `url` yet is skipped
 *  everywhere it would appear, rather than rendered as a dead link. */
export type ListenLink = {
  platform: ListenPlatform;
  name: string;
  url: string | null;
};

/* -------------------------------------------------------------------------
   Guest episode pages and blog posts

   Both are templates: one data file per guest renders a full page. See
   data/episodes/_template.ts and data/blogs/_template.ts.
------------------------------------------------------------------------- */

/** One run of an article: an optional heading and its paragraphs. The first
 *  section usually has no heading — it is the introduction. */
export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type Person = {
  /** As it should be printed, with any prefix: "CA Vinit Bandi". */
  name: string;
  /** "CFO at The Whole Truth". */
  role: string;
  linkedin?: string;
};

/** A guest's own page, at /{slug}. Built to be shared by the guest. */
export type Episode = {
  /** The page's address: /{slug}. Lowercase and hyphenated. Must be unique
   *  and must not clash with a site route (podcast, blogs, join-us…) — the
   *  episode index checks both and fails loudly if it does. */
  slug: string;
  /** Browser tab and search result title, used exactly as written. */
  pageTitle: string;
  /** Meta description and link preview text. Aim for ~150 characters. */
  description: string;
  guest: Person;
  /** The YouTube video id: the part after `youtu.be/` or `watch?v=`. */
  youtubeId: string;
  /** The video's title on YouTube. Read out on the play button. */
  videoTitle: string;
  /** Optional. Defaults to the video's own YouTube thumbnail. */
  thumbnail?: string;
  /** ISO date the episode went live. Orders every list, newest first. */
  publishedAt: string;
  /** Last crumb in the page hero. */
  crumb: string;
  /** The card on the Podcast page. */
  card: { title: string; excerpt: string };
  /** `false` keeps the page live and shareable but leaves it off the Podcast
   *  page grid. Defaults to true. */
  listed?: boolean;
  /** In the homepage's "Featured Episodes" row (the newest three). */
  featured?: boolean;
  /** Episode-specific links. A platform left out falls back to the show's
   *  own link in data/site.ts. */
  listen?: Partial<Record<ListenPlatform, string>>;
  body: ArticleSection[];
};

/** A blog post, at /blogs/{slug}. */
export type BlogPost = {
  /** The post's address: /blogs/{slug}. Lowercase and hyphenated. */
  slug: string;
  /** Browser tab title. " — CFOs Not Talking Finance" is appended. */
  pageTitle: string;
  description: string;
  /** Beside the video: the first line is set in orange, the second in navy. */
  heading: [string, string];
  /** Last crumb in the page hero. */
  crumb: string;
  /** The card on the Blog page and in "Recent Posts". */
  card: { title: string; excerpt: string };
  /** Card and carousel image. Defaults to the video's YouTube thumbnail. A
   *  post with no video must set this. */
  cover?: string;
  guest: Person;
  /** Optional: a post without a video shows its cover image instead. */
  youtubeId?: string;
  videoTitle?: string;
  /** ISO date. Orders every list, newest first. */
  publishedAt: string;
  /** The matching guest page, if there is one. */
  episodeSlug?: string;
  listen?: Partial<Record<ListenPlatform, string>>;
  body: ArticleSection[];
};
