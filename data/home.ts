import type { HomeStep, HomeTeamGroup } from "@/types";

/**
 * Homepage content, taken from the landing design ("CFOs not talking finance
 * landing page.pdf"). The reach figures come from `data/stats.ts` and the
 * host's role and words from `data/team.ts`, so each lives in one place.
 *
 * Artwork sits in `public/home/` (extracted from the design file). To move an
 * image to Bunny CDN later, swap its path here for the CDN URL — the CDN host
 * is already allowed in next.config.ts.
 */

export const homeHero = {
  /** The visual lockup. Screen readers get `site.name` instead. */
  title: {
    lead: "CFOs",
    struck: "NOT",
    accent: "TALKING",
    tail: "FINANCE",
  },
  byline: "by Contetra",
  microphone: "/home/microphone.png",
} as const;

export const homeIntro = {
  title: ["One conversation.", "Many ways to be heard."],
  line: "One two-hour conversation becomes a full episode, sharp clips, and a story your clients can find any day of the week.",
} as const;

export const homeSteps: HomeStep[] = [
  {
    id: "record",
    number: 1,
    caption: ["Studio-grade audio", "and video, recorded", "in one sitting."],
    image: "/home/steps/step-1.png",
  },
  {
    id: "format",
    number: 2,
    caption: [
      "We decide the format",
      "with you: the full episode,",
      "short clips, quote cards.",
    ],
    image: "/home/steps/step-2.png",
  },
  {
    id: "edit",
    number: 3,
    caption: ["Every cut is tightened", "by our editors, and", "you approve it."],
    image: "/home/steps/step-3.png",
  },
  {
    id: "listen",
    number: 4,
    caption: [
      "Your audience listens",
      "on their commute, at",
      "the gym or on a walk.",
    ],
    image: "/home/steps/step-4.png",
  },
  {
    id: "library",
    number: 5,
    caption: [
      "Your episode stays online",
      "as a reference library your",
      "clients can revisit.",
    ],
    image: "/home/steps/step-5.png",
  },
];

/** The row of episode thumbnails under the About section. The episodes come
 *  from data/episodes/ (those marked `featured`). */
export const homeFeatured = {
  title: "Featured Episodes",
  line: "Open a full episode - summary, takeaways, and transcript.",
} as const;

/** The orange speech bubble over the team, broken where the design breaks it. */
export const homeTeamHeading = ["The people behind", "the conversation."] as const;

export const homeHost = {
  label: "Our Host",
  /** The orange name tags, one line each. */
  nameLines: ["CA Chitra", "Parameswaran"],
  /** Cut-out with its white sticker edge; its foot is already shaped to the
   *  capsule it sits in. */
  image: "/home/host/chitra-parameswaran.png",
} as const;

export const homeAbout = {
  title:
    "A show for finance leaders where the one thing we never discuss is the numbers.",
  /** Yellow bubble. */
  person:
    "Behind every balance sheet is a person. Behind every P&L, a team. We put them on camera and ask what the numbers never show: where they grew up, what they studied, the job that went wrong, the turn nobody planned, and the advice they wish someone had given them at twenty-five.",
  /** Orange bubble. The design starts "So we ask…" on a fresh line. */
  story: [
    "Their work is read, audited and questioned every quarter. Their story almost never is.",
    "So we ask how they got here and what they’d tell someone just starting out. No company secrets. No number crunching. Just one conversation about a career, not a quarter.",
  ],
  /** Handwritten, broken where the design breaks it. */
  note: [
    "No spreadsheets. No jargon. No shop talk.",
    "Just the person behind the signature.",
  ],
} as const;

export const homeTeam: HomeTeamGroup[] = [
  {
    id: "curated",
    label: "Curated by",
    members: [
      { id: "palak-kedia", name: "Palak Kedia", image: "/home/team/palak-kedia.png" },
      {
        id: "kashish-rajpal",
        name: "Kashish Rajpal",
        image: "/home/team/kashish-rajpal.png",
      },
    ],
  },
  {
    id: "production",
    // The design reads "Prodcution Team" — corrected.
    label: "Production Team",
    members: [
      {
        id: "pankaj-sakpal",
        name: "Pankaj Sakpal",
        image: "/home/team/pankaj-sakpal.png",
      },
      {
        id: "denal-radadia",
        name: "Denal Radadia",
        image: "/home/team/denal-radadia.png",
      },
      {
        id: "rui-manjrekar",
        name: "Rui Manjrekar",
        image: "/home/team/rui-manjrekar.png",
      },
    ],
  },
];

/** Intrinsic pixel sizes of the artwork above, for next/image. */
export const homeImageSizes: Record<string, { width: number; height: number }> = {
  "/home/microphone.png": { width: 246, height: 1264 },
  "/home/steps/step-1.png": { width: 715, height: 828 },
  "/home/steps/step-2.png": { width: 617, height: 749 },
  "/home/steps/step-3.png": { width: 625, height: 699 },
  "/home/steps/step-4.png": { width: 714, height: 800 },
  "/home/steps/step-5.png": { width: 706, height: 804 },
  "/home/host/chitra-parameswaran.png": { width: 941, height: 1085 },
  "/home/team/palak-kedia.png": { width: 417, height: 549 },
  "/home/team/kashish-rajpal.png": { width: 247, height: 346 },
  "/home/team/pankaj-sakpal.png": { width: 434, height: 580 },
  "/home/team/denal-radadia.png": { width: 492, height: 687 },
  "/home/team/rui-manjrekar.png": { width: 400, height: 614 },
};
