import type { JourneyStageItem } from "@/types";

/** Heading for the journey section. */
export const journeyIntro = {
  title: "How an episode gets made",
  line: "Five stages, from the date you pick to the morning it goes live.",
};

/**
 * The five production stages, in order. This is the only numbered sequence on
 * the site — the content genuinely is a sequence, which is what earns it.
 *
 * `media` accepts a few kinds:
 *   - "video"  a looping .mp4/.webm. Preferred for real motion: smallest
 *              file, best quality.
 *   - "image"  a plain static icon/still — goes through next/image's normal
 *              optimisation.
 *   - "lottie" a vector .json, recolourable to #211654 / #F49A00 so it matches
 *              the site rather than sitting next to it. No player wired up
 *              yet, so it renders as a still.
 *   - "gif"    supported, but the heaviest of the four for the same clip.
 *
 * Video is lazy, muted, and paused while off-screen; stills are lazy-loaded.
 */
export const journey: JourneyStageItem[] = [
  {
    id: "schedule",
    number: 1,
    title: "Schedule the shoot",
    copy: "You pick a date and we hold the Mumbai studio for half a day, or send a kit and a director to you.",
    media: {
      src: "https://contetra.b-cdn.net/CFO%20Podcast/Episode_making_01.png",
      type: "image",
    },
  },
  {
    id: "shoot-day",
    number: 2,
    title: "Shoot day",
    copy: "Three cameras, two hours, one conversation; we shoot long so the edit has somewhere to go.",
    media: {
      src: "https://contetra.b-cdn.net/CFO%20Podcast/Episode_making_02.png",
      type: "image",
    },
  },
  {
    id: "off-camera",
    number: 3,
    title: "Off-camera conversations",
    copy: "The mics come down and we keep talking, and a fair amount of the final cut gets decided here.",
    media: {
      src: "https://contetra.b-cdn.net/CFO%20Podcast/Episode_making_03.png",
      type: "image",
    },
  },
  {
    id: "review-edit",
    number: 4,
    title: "Review and edit",
    copy: "You see the cut before anyone else does, and anything you want taken out comes out, no argument.",
    media: {
      src: "https://contetra.b-cdn.net/CFO%20Podcast/Episode_making_04.png",
      type: "image",
    },
  },
  {
    id: "live",
    number: 5,
    title: "Live across every platform",
    copy: "It goes up on YouTube and Spotify the same morning, then runs through the week cut for LinkedIn.",
    media: {
      src: "https://contetra.b-cdn.net/CFO%20Podcast/Episode_making_05.png",
      type: "image",
    },
  },
];
