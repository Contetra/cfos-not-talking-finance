import type { BlogPost } from "@/types";

/**
 * TEMPLATE FOR A NEW BLOG POST. Not imported anywhere, so it never renders.
 *
 * 1. Copy this file to `data/blogs/<slug>.ts`, e.g. `ca-sumit-jain.ts`.
 * 2. Fill in every field below. Comments on each field are in types/index.ts.
 * 3. In `data/blogs/index.ts`, import the new file and add it to `all`.
 *
 * The post appears at cfosnottalkingfinance.com/blogs/<slug>, on the Blog
 * page, in every "Check Out Our Latest Blog" carousel and in the sitemap.
 *
 * If the guest already has a page in data/episodes/, you can reuse its
 * details instead of retyping them; see data/blogs/ca-vinit-bandi.ts.
 */
const template: BlogPost = {
  slug: "ca-firstname-lastname",
  pageTitle: "The Post's Headline",
  description:
    "One or two sentences for search results and link previews, about 150 characters.",
  // Line one is set in orange, line two in navy.
  heading: ["The first half of the headline:", "the second half"],
  crumb: "Lastname podcast | A short hook from the episode",
  card: {
    title: "The Post's Headline",
    excerpt: "One or two short sentences for the Blog page card.",
  },
  guest: {
    name: "CA Firstname Lastname",
    role: "CFO at Company",
    linkedin: "https://www.linkedin.com/in/their-profile/",
  },
  // From https://youtu.be/VIDEO_ID. Leave out for a post with no video, and
  // set `cover` instead.
  youtubeId: "VIDEO_ID",
  videoTitle: "The video's title on YouTube",
  publishedAt: "2026-01-31",
  // Optional:
  // cover: "https://contetra.b-cdn.net/…",  // card image; defaults to the video thumbnail
  // episodeSlug: "ca-firstname-lastname",    // links the post to the guest page
  // listen: { spotify: "https://open.spotify.com/episode/…" },
  body: [
    {
      paragraphs: ["Introduction paragraph.", "Another paragraph."],
    },
    {
      heading: "A Section Heading",
      paragraphs: ["Paragraph."],
    },
  ],
};

export default template;
