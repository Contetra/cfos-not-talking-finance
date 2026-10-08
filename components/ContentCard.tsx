import Image from "next/image";
import Link from "next/link";

import styles from "./ContentCard.module.css";

type ContentCardProps = {
  href: string;
  image: string;
  title: string;
  excerpt: string;
  /** The card's whole surface is the link; this is its visible cue. */
  cta?: string;
  priority?: boolean;
};

/**
 * Thumbnail, title, two lines and "Read More": the card on the Podcast and
 * Blog grids. The title's link is stretched over the whole card, so the card
 * is one link with one accessible name rather than three.
 */
export default function ContentCard({
  href,
  image,
  title,
  excerpt,
  cta = "Read More",
  priority = false,
}: ContentCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1200px) 380px, (min-width: 640px) 45vw, 92vw"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <h2 className={styles.title}>
          <Link href={href} className={styles.link}>
            {title}
          </Link>
        </h2>
        <p className={styles.excerpt}>{excerpt}</p>
        <span aria-hidden="true" className={styles.cta}>
          {cta}
        </span>
      </div>
    </article>
  );
}
