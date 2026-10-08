import caVinitBandiEpisode from "@/data/episodes/ca-vinit-bandi";
import type { BlogPost } from "@/types";

/** cfosnottalkingfinance.com/blogs/ca-vinit-bandi */
const caVinitBandi: BlogPost = {
  slug: "ca-vinit-bandi",
  pageTitle: "From Cricket Dreams to CFO: CA Vinit Bandi’s Unusual Path",
  description:
    "After 14 years of cricket, a teacher told Vinit Bandi he would never be a CA. He became CFO of The Whole Truth. Lessons on FP&A, working capital and leadership.",
  heading: ["From Cricket Dreams to CFO:", "CA Vinit Bandi’s Unusual Path"],
  crumb: "Vinit Bandi podcast | You will never be a CA",
  card: {
    title: "From Cricket Dreams to CFO: CA Vinit Bandi’s Unusual Path",
    excerpt:
      "Some finance careers begin on a balance sheet. CA Vinit Bandi’s began on a cricket field.",
  },
  guest: caVinitBandiEpisode.guest,
  youtubeId: caVinitBandiEpisode.youtubeId,
  videoTitle: caVinitBandiEpisode.videoTitle,
  publishedAt: caVinitBandiEpisode.publishedAt,
  episodeSlug: caVinitBandiEpisode.slug,
  // Same write-up as the guest page. Replace with the post's own copy if it
  // ever differs.
  body: caVinitBandiEpisode.body,
};

export default caVinitBandi;
