import Image from "next/image";

import { homeHost, homeImageSizes } from "@/data/home";
import { host } from "@/data/team";
import { cn } from "@/lib/cn";
import { QuoteBracket } from "./decor";
import shared from "./home.module.css";
import styles from "./HomeHost.module.css";

/**
 * "Our Host": Chitra's words in a dotted speech bubble, her cut-out in an
 * indigo capsule beside it. The portrait comes first in the markup so a
 * screen reader meets the heading and her name before her words.
 */
export default function HomeHost() {
  const img = homeImageSizes[homeHost.image];

  return (
    <section className={styles.host} aria-labelledby="host-title">
      <div className={styles.canvas}>
        <div className={styles.portrait}>
          <h2 id="host-title" className={cn(shared.hand, styles.label)}>
            {homeHost.label}
          </h2>
          <div className={styles.capsule}>
            <span aria-hidden="true" className={cn(shared.pattern, styles.pattern)} />
            <Image
              src={homeHost.image}
              alt={`${host.name}, ${host.role} at ${host.organisation}`}
              width={img.width}
              height={img.height}
              sizes="(min-width: 1440px) 314px, (min-width: 1024px) 22vw, 300px"
              className={styles.photo}
            />
          </div>
          <p className={styles.tags}>
            {homeHost.nameLines.map((line) => (
              <span key={line} className={styles.tag}>
                {line}{" "}
              </span>
            ))}
          </p>
        </div>

        <div className={styles.bubble}>
          <QuoteBracket className={styles.quoteMark} flip="y" />
          <p className={styles.role}>
            {host.role}, {host.organisation}
          </p>
          <blockquote className={styles.words}>
            {host.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </blockquote>

          {/* The bubble's tail, toward the portrait. The white bar lifts the
              stretch of border the tail opens out of. */}
          <svg
            className={styles.tail}
            viewBox="815 2660 150 80"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="824" y="2662.5" width="104.5" height="9.5" fill="#fff" />
            <path
              d="M930.8 2667 957 2731.7 821.7 2667"
              fill="none"
              stroke="currentColor"
              strokeWidth="5.3"
              strokeLinecap="round"
              strokeDasharray="0 10.6"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
