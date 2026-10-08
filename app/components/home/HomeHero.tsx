import Image from "next/image";

import { homeHero, homeImageSizes } from "@/data/home";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { QuoteBracket } from "./decor";
import shared from "./home.module.css";
import styles from "./HomeHero.module.css";

/**
 * The navy title card: the struck-through title and the studio microphone
 * standing in front of it. The logo and the navigation are laid over the
 * card's top edge by the site header (components/SiteHeader.tsx).
 *
 * The microphone is positioned in em of the title, so it stays on the same
 * letter at every size; its stand runs off the bottom of the card, which
 * clips it.
 */
export default function HomeHero() {
  const { title, byline, microphone } = homeHero;
  const mic = homeImageSizes[microphone];

  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.inner}>
        <div className={styles.cardWrap}>
          <div className={styles.card}>
            <span aria-hidden="true" className={cn(shared.pattern, styles.pattern)} />

            <div className={styles.canvas}>
              <div className={styles.titleBlock}>
                <h1 id="home-title" className={styles.title}>
                  <span className="sr-only">{site.name}</span>
                  <span aria-hidden="true" className={styles.line1}>
                    {title.lead} <span className={styles.struck}>{title.struck}</span>
                  </span>
                  <span aria-hidden="true" className={styles.line2}>
                    <span className={styles.accent}>{title.accent}</span> {title.tail}
                  </span>
                </h1>
                <Image
                  src={microphone}
                  alt=""
                  width={mic.width}
                  height={mic.height}
                  priority
                  sizes="(min-width: 1440px) 139px, (min-width: 768px) 9.7vw, 84px"
                  className={styles.mic}
                />
              </div>

              <p className={styles.byline}>{byline}</p>
            </div>
          </div>

          <QuoteBracket className={styles.bracketStart} />
          <QuoteBracket className={styles.bracketEnd} flip="x" />
        </div>
      </div>
    </section>
  );
}
