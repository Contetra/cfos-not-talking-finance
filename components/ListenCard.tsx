import { ArrowRight, Star } from "lucide-react";

import { listenWidget } from "@/data/site";
import { type ResolvedListenLink, resolveListenLinks } from "@/lib/media";
import styles from "./ListenCard.module.css";
import { ListenMark } from "./SocialMarks";

/**
 * "CFOs Unfiltered with Chitra Parameswaran": the listening card at the top of
 * an episode page's sidebar, with a nudge to leave a review.
 */
export default function ListenCard({ links }: { links: ResolvedListenLink[] }) {
  const showLinks = resolveListenLinks();
  const review = listenWidget.reviewPlatforms
    .map((platform) => showLinks.find((link) => link.platform === platform))
    .find(Boolean);

  return (
    <section className={styles.card} aria-labelledby="listen-card-title">
      <h2 id="listen-card-title" className={styles.title}>
        {listenWidget.title.lead}{" "}
        <span className={styles.accent}>{listenWidget.title.accent}</span>
        <span className={styles.byline}>{listenWidget.byline}</span>
      </h2>
      <span aria-hidden="true" className={styles.rule} />

      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <ListenMark platform={link.platform} className={styles.mark} />
              {link.name}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>

      {review ? (
        <div className={styles.review}>
          <p className={styles.stars} role="img" aria-label="Five stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} aria-hidden="true" className={styles.star} />
            ))}
          </p>
          <p className={styles.prompt}>
            {listenWidget.reviewPrompt}{" "}
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.reviewLink}
            >
              {listenWidget.reviewLabel}
              <ArrowRight aria-hidden="true" className={styles.arrow} />
              <span className="sr-only"> on {review.name} (opens in a new tab)</span>
            </a>
          </p>
        </div>
      ) : null}
    </section>
  );
}
