import type { Metadata } from "next";

import grid from "@/components/CardGrid.module.css";
import ContentCard from "@/components/ContentCard";
import PageHero from "@/components/PageHero";
import { blogPosts } from "@/data/blogs";
import { blogPage, blogPath, CRUMB_ROOT, routes } from "@/data/site";
import { blogImage } from "@/lib/media";

export const metadata: Metadata = {
  title: blogPage.title,
  description: blogPage.description,
  alternates: { canonical: routes.blogs },
};

/** Every blog post, newest first. Same cards as the Podcast page. */
export default function BlogsPage() {
  return (
    <>
      <PageHero
        title={blogPage.title}
        crumbs={[{ label: CRUMB_ROOT, href: routes.home }, { label: blogPage.crumb }]}
      />

      {blogPosts.length > 0 ? (
        <ul className={grid.grid}>
          {blogPosts.map((post, index) => (
            <li key={post.slug}>
              <ContentCard
                href={blogPath(post.slug)}
                image={blogImage(post)}
                title={post.card.title}
                excerpt={post.card.excerpt}
                priority={index < 3}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={grid.empty}>{blogPage.empty}</p>
      )}
    </>
  );
}
