import { latestPosts } from "@/data/blogs";
import { blogPage, blogPath } from "@/data/site";
import { blogImage } from "@/lib/media";
import BlogCarousel from "./BlogCarousel";

type LatestBlogsProps = {
  /** Leave out the post being read. */
  exceptSlug?: string;
};

/**
 * "Check Out Our Latest Blog": the carousel that closes the homepage and every
 * inner page. Only the card data crosses to the client, never post bodies.
 * Renders nothing until there is a post to show.
 */
export default function LatestBlogs({ exceptSlug }: LatestBlogsProps) {
  const items = latestPosts(9, exceptSlug).map((post) => ({
    slug: post.slug,
    href: blogPath(post.slug),
    title: post.card.title,
    image: blogImage(post),
  }));

  if (items.length === 0) return null;

  return <BlogCarousel title={blogPage.latestTitle} items={items} />;
}
