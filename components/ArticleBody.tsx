import { Fragment } from "react";

import { cn } from "@/lib/cn";
import type { ArticleSection } from "@/types";
import styles from "./ArticleBody.module.css";

/** An episode or blog write-up: optional headings, then paragraphs. */
export default function ArticleBody({
  sections,
  className,
}: {
  sections: ArticleSection[];
  className?: string;
}) {
  return (
    <div className={cn(styles.article, className)}>
      {sections.map((section, index) => (
        <Fragment key={section.heading ?? `section-${index}`}>
          {section.heading ? <h2 className={styles.heading}>{section.heading}</h2> : null}
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </Fragment>
      ))}
    </div>
  );
}
