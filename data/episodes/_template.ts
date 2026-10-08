import type { Episode } from "@/types";

/**
 * TEMPLATE FOR A NEW GUEST PAGE. Not imported anywhere, so it never renders.
 *
 * 1. Copy this file to `data/episodes/<slug>.ts`, e.g. `ca-sumit-jain.ts`.
 * 2. Fill in every field below. Comments on each field are in types/index.ts.
 * 3. In `data/episodes/index.ts`, import the new file and add it to `all`.
 *
 * The page appears at cfosnottalkingfinance.com/<slug>, joins the Podcast page
 * (unless `listed: false`), the sitemap, and the homepage row if `featured`.
 * The video thumbnail comes from YouTube automatically.
 */
const template: Episode = {
  slug: "ca-firstname-lastname",
  pageTitle: "CFOs Not Talking Finance with CA Firstname Lastname",
  description:
    "One or two sentences for search results and link previews, about 150 characters.",
  guest: {
    name: "CA Firstname Lastname",
    role: "CFO at Company",
    linkedin: "https://www.linkedin.com/in/their-profile/",
  },
  // From https://youtu.be/VIDEO_ID or https://www.youtube.com/watch?v=VIDEO_ID
  youtubeId: "VIDEO_ID",
  videoTitle: "The video's title on YouTube",
  publishedAt: "2026-01-31",
  crumb: "Lastname podcast | A short hook from the episode",
  card: {
    title: "CA Firstname Lastname Podcast | One line about the conversation",
    excerpt: "One or two short sentences for the Podcast page card.",
  },
  // Optional:
  // featured: true,           // show in the homepage's Featured Episodes row
  // listed: false,            // keep the page live but off the Podcast page
  // thumbnail: "https://…",   // replace the YouTube thumbnail
  // listen: { spotify: "https://open.spotify.com/episode/…" },
  body: [
    {
      // The first section has no heading: it is the introduction.
      paragraphs: ["First paragraph.", "Second paragraph."],
    },
    {
      heading: "A Section Heading",
      paragraphs: ["Paragraph.", "Paragraph."],
    },
  ],
};

export default template;
