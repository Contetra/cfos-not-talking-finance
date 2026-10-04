import type { AboutCopy, SiteConfig } from "@/types";

/**
 * Every route on the site, in one place.
 *
 * Link to these constants rather than writing paths by hand; moving a route
 * then means editing one line.
 */
export const routes = {
  home: "/",
  specialGuests: "/special-guests",
  joinUs: "/join-us",
  blogs: "/blogs",
  contactUs: "/contact-us",
} as const;

/**
 * Stand-in for any image not yet supplied: a neutral tone in the surface
 * colour, deliberately NOT the logo. Using the logo here put the wordmark in
 * the hero, in the journey tiles and in the gallery — the one place the brand
 * mark should never appear is standing in for a photograph.
 *
 * Every use site carries a `// TODO(asset):` comment naming what belongs there.
 */
export const PLACEHOLDER_IMAGE = "/placeholder.png";

export const site: SiteConfig = {
  name: "CFOs Not Talking Finance",
  tagline: "Finance leaders, on everything except the numbers.",
  blurb:
    "A show where senior finance leaders talk about everything except the numbers.",
  description:
    "Senior finance leaders talk about their upbringing, their education, the turns their careers took and the advice they would give someone starting out. No number crunching. Produced by Contetra Private Limited.",
  producer: "Contetra Private Limited",
  // TODO(asset): replace with the production domain before launch — metadataBase
  // and the JSON-LD `url` both read from here.
  url: "https://www.contetra.com",
  logo: "https://contetra.b-cdn.net/CFO%20Podcast/Podcast%20logo%20Invers.png",
  logoInverse:
    "https://contetra.b-cdn.net/CFO%20Podcast/Podcast%20logo%20Inverted%20-%20CFO%20not%20talking%20Finnace.png",
  // TODO(asset): 1200x630 Open Graph card. Falls back to the logo until supplied.
  ogImage:
    "https://contetra.b-cdn.net/CFO%20Podcast/Podcast%20logo%20Invers.png",

  nav: [
    { label: "Home", href: routes.home },
    {
      label: "Special guests",
      href: routes.specialGuests,
      comingSoon: true,
    },
    { label: "Join us", href: routes.joinUs },
    { label: "Blogs", href: routes.blogs, comingSoon: true },
    {
      label: "Contact us",
      href: routes.contactUs,
      comingSoon: true,
    },
  ],

  socials: [
    {
      platform: "youtube",
      name: "YouTube",
      handle: "CFOs_Not_Talking_Finance",
      url: "https://www.youtube.com/@CFOs_Not_Talking_Finance",
    },
    {
      platform: "instagram",
      name: "Instagram",
      handle: "cfosnottalkingfinance",
      url: "https://www.instagram.com/cfosnottalkingfinance/",
    },
    {
      platform: "linkedin",
      name: "LinkedIn",
      handle: "cfos-not-talking-finance",
      url: "https://www.linkedin.com/showcase/cfos-not-talking-finance",
    },
    {
      platform: "spotify",
      name: "Spotify",
      handle: "CFOs Not Talking Finance",
      url: "https://open.spotify.com/show/7vIpKTLX53AcWpRmTne3IE",
    },
  ],
};

/**
 * The wordmark, as three lines. The hero re-sets this lockup at display size;
 * the logo artwork itself stacks the same three lines, with "not" in amber
 * italic running into "talking".
 */
/**
 * The wordmark, as the logo breaks it: three left-aligned lines on a shared
 * left edge, with the middle line set smaller and a step lighter. The hero
 * re-sets these at display size — words here, sizing in the component.
 */
export const wordmark = {
  line1: "CFOs",
  line2: "Not talking",
  line3: "Finance",
} as const;

/**
 * The About section: `lead` is set as a pull-quote, `body` as two columns
 * beneath it. 128 words all in.
 */
export const about: AboutCopy = {
  lead: "A show for finance leaders where the one thing we never discuss is the numbers.",
  body: [
    "Behind every balance sheet and every P&L there is a person, and a team. We put them on camera and ask about everything else — where they grew up, what they studied, the jobs that went wrong, the turns nobody planned, and the advice they wish someone had given them at twenty-five.",
    "The work these people sign off gets read and checked every quarter. The lives behind that work rarely get the same hearing, so we ask how they got here and what they would tell someone starting out today. No confidential company discussion, no number crunching, no insider information — one conversation, on the record, about a career rather than a quarter.",
  ],
};

/** The home page's primary conversion. */
export const joinCta = {
  line: "We record in Mumbai, or remotely if that is easier.",
  button: "Be our next guest",
  href: routes.joinUs,
};

/** The Join us page. */
export const joinPage = {
  title: "Be a guest on the show",
  line: "Tell us a little about yourself. We will take it from there.",
  scrollCue: "Apply to be a guest",
  requiredLegend: "Fields marked with an asterisk are required.",
  submit: "Send application",
  submitting: "Sending…",
  labels: {
    firstName: "First name",
    lastName: "Last name",
    contactNumber: "Contact number",
    email: "Email",
    currentCity: "Current city",
    travelToMumbai: "Can you travel to the Mumbai studio?",
  },
  hints: {
    contactNumber: "Include your country code if you are outside India.",
  },
  success: {
    title: "Application received",
    line: "One of the producers reads every application. Expect a reply within five working days, from a contetra.com address — check your spam folder if it has not arrived by then.",
  },
  failure:
    "That did not send. Check your connection and try again, or email us directly.",
};

/** Copy for the three placeholder routes. One line each, specific to the page. */
export const comingSoonCopy = {
  "special-guests": {
    title: "Special guests",
    line: "Every conversation, with the people who had them.",
  },
  blogs: {
    title: "Blogs",
    line: "Notes, transcripts and the things that did not make the edit.",
  },
  "contact-us": {
    title: "Contact us",
    line: "The direct line to the team.",
  },
} as const;
