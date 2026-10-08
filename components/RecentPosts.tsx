import Image from "next/image";
import Link from "next/link";

import { latestPosts } from "@/data/blogs";
import { blogPage, blogPath } from "@/data/site";
import { blogImage } from "@/lib/media";
import styles from "./RecentPosts.module.css";

/** "Recent Posts" in an episode page's sidebar. Hidden until there are any. */
export default function RecentPosts({ limit = 3 }: { limit?: number }) {
  const posts = latestPosts(limit);
  if (posts.length === 0) return null;

  return (
    <section className={styles.card} aria-labelledby="recent-posts-title">
      <h2 id="recent-posts-title" className={styles.title}>
        {blogPage.recentTitle}
      </h2>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.item}>
            <div className={styles.media}>
              <Image
                src={blogImage(post)}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, 90vw"
                className={styles.image}
              />
            </div>
            <Link href={blogPath(post.slug)} className={styles.link}>
              {post.card.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
