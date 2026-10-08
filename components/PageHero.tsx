import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Swoosh } from "@/app/components/home/decor";
import shared from "@/app/components/home/home.module.css";
import { homeHero, homeImageSizes } from "@/data/home";
import { cn } from "@/lib/cn";
import styles from "./PageHero.module.css";

export type Crumb = {
  label: string;
  /** Omit on the last crumb: it is the current page. */
  href?: string;
};

type PageHeroProps = {
  /** The large white title. */
  title: string;
  /** Appended to the <h1> for screen readers and search only, when the
   *  visible title is a section name rather than the page's subject. */
  titleSuffix?: string;
  /** "p" when the page sets its own <h1> further down (a blog post's
   *  headline); the hero title is then a label, not the page's heading. */
  titleAs?: "h1" | "p";
  crumbs?: Crumb[];
  /** A line or two under the breadcrumb. */
  children?: ReactNode;
};

/**
 * The navy hero every inner page opens with: title, breadcrumb, and the studio
 * microphone leaning in from the right, as the Podcast, episode and blog
 * designs draw it. The site header sits over its top edge.
 */
export default function PageHero({
  title,
  titleSuffix,
  titleAs: TitleTag = "h1",
  crumbs,
  children,
}: PageHeroProps) {
  const mic = homeImageSizes[homeHero.microphone];

  return (
    <section className={styles.hero} aria-labelledby="page-title">
      <div className={styles.card}>
        <span aria-hidden="true" className={cn(shared.pattern, styles.pattern)} />

        <Swoosh
          id="swoosh-page-hero"
          className={styles.swoosh}
          viewBox="0 0 1440 640"
          paths={[
            "M1478 252C1400 262 1332 216 1306 152C1284 96 1218 72 1162 106C1092 150 1086 264 1012 332C938 400 864 404 842 472C824 534 882 592 952 562",
          ]}
          from={[1478, 252]}
          to={[952, 562]}
          color="#f79d00"
          opacity={0.6}
        />

        <Image
          src={homeHero.microphone}
          alt=""
          width={mic.width}
          height={mic.height}
          priority
          sizes="(min-width: 1440px) 112px, (min-width: 768px) 8vw, 1px"
          className={styles.mic}
        />

        <div className={styles.content}>
          <TitleTag id="page-title" className={styles.title}>
            {title}
            {titleSuffix ? <span className="sr-only">{`: ${titleSuffix}`}</span> : null}
          </TitleTag>

          {crumbs && crumbs.length > 0 ? (
            <nav aria-label="Breadcrumb">
              <ol className={styles.crumbs}>
                {crumbs.map((crumb, index) => {
                  const last = index === crumbs.length - 1;
                  return (
                    <li key={`${crumb.label}-${index}`} className={styles.crumb}>
                      {crumb.href && !last ? (
                        <Link href={crumb.href} className={styles.crumbLink}>
                          {crumb.label}
                        </Link>
                      ) : (
                        <span aria-current={last ? "page" : undefined}>{crumb.label}</span>
                      )}
                      {!last ? (
                        <ChevronRight aria-hidden="true" className={styles.sep} strokeWidth={2.4} />
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </nav>
          ) : null}

          {children ? <div className={styles.extra}>{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
