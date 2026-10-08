import Image from "next/image";
import Link from "next/link";

import { featuredEpisodes } from "@/data/episodes";
import { homeFeatured } from "@/data/home";
import { episodePath } from "@/data/site";
import { cn } from "@/lib/cn";
import { episodeImage } from "@/lib/media";
import shared from "./home.module.css";
import styles from "./HomeFeatured.module.css";

/**
 * "Featured Episodes": up to three thumbnails in navy frames, each opening
 * that guest's page. Which episodes appear is set in data/episodes/
 * (`featured: true`). Hidden until there is at least one.
 */
export default function HomeFeatured() {
  if (featuredEpisodes.length === 0) return null;

  return (
    <section className={styles.featured} aria-labelledby="featured-title">
      <div className={styles.canvas}>
        <h2 id="featured-title" className={styles.title}>
          {homeFeatured.title}
        </h2>
        <p className={cn(shared.hand, styles.line)}>{homeFeatured.line}</p>

        <ul className={styles.list}>
          {featuredEpisodes.map((episode) => (
            <li key={episode.slug}>
              <Link href={episodePath(episode.slug)} className={styles.card}>
                <Image
                  src={episodeImage(episode)}
                  alt={episode.card.title}
                  fill
                  sizes="(min-width: 1440px) 380px, (min-width: 768px) 27vw, 90vw"
                  className={styles.image}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
