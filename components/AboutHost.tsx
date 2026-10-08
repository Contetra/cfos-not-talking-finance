import Image from "next/image";

import { QuoteBracket } from "@/app/components/home/decor";
import shared from "@/app/components/home/home.module.css";
import { homeHost, homeImageSizes } from "@/data/home";
import { host } from "@/data/team";
import { cn } from "@/lib/cn";
import styles from "./AboutHost.module.css";

/**
 * "About Host" on episode and blog pages: the host's cut-out in the indigo
 * capsule with her orange name tags, and a dotted speech bubble opening
 * toward her. The same pieces as the homepage's "Our Host", at a smaller
 * scale.
 */
export default function AboutHost() {
  const img = homeImageSizes[homeHost.image];

  return (
    <section className={styles.section} aria-labelledby="about-host-title">
      <div className={styles.inner}>
        <div className={styles.portrait}>
          <div className={styles.capsule}>
            <span aria-hidden="true" className={cn(shared.pattern, styles.pattern)} />
            <Image
              src={homeHost.image}
              alt={`${host.name}, ${host.role} at ${host.organisation}`}
              width={img.width}
              height={img.height}
              sizes="(min-width: 768px) 260px, 220px"
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
          <h2 id="about-host-title" className={styles.title}>
            About Host
          </h2>
          <p className={styles.text}>{host.about}</p>
          <a
            href={host.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.hello}
          >
            Say Hello!
            <span className="sr-only"> to {host.name} on LinkedIn (opens in a new tab)</span>
          </a>
          <QuoteBracket className={styles.quote} flip="x" />
          <svg
            className={styles.tail}
            viewBox="0 0 120 70"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M118 2 4 66 64 2"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="0 10"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
