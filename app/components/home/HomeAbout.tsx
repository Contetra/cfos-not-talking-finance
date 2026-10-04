import { homeAbout } from "@/data/home";
import { cn } from "@/lib/cn";
import { Swoosh } from "./decor";
import shared from "./home.module.css";
import styles from "./HomeAbout.module.css";

/**
 * "A show for finance leaders…": the heading, two speech bubbles answering it
 * and a handwritten aside, with a swoosh trailing off each side.
 *
 * Reading order follows the argument (who they are, then why we ask), which
 * is also the order the bubbles stack in on a phone.
 */
export default function HomeAbout() {
  return (
    <section className={styles.about} aria-labelledby="about-title">
      <div className={styles.canvas}>
        <Swoosh
          id="swoosh-peach"
          className={styles.swooshStart}
          viewBox="-20 2800 525 360"
          paths={[
            "M-4.9 3143.8C80.5 3135.2 141.1 3067.3 141.1 2967.2C141.1 2878.4 67.2 2857.6 67.2 2930.5C67.2 2972 93.2 2999.9 127 3027C283.1 3151.9 488 2976.5 481.7 2814.1",
          ]}
          from={[-4.9, 3143.8]}
          to={[481.7, 2814.1]}
          color="#f79d00"
          opacity={0.43}
        />
        <Swoosh
          id="swoosh-sun"
          className={styles.swooshEnd}
          viewBox="975 3060 520 360"
          paths={[
            "M1476.4 3405.5C1391 3396.9 1330.5 3329 1330.5 3228.9C1330.5 3140.1 1404.3 3119.3 1404.3 3192.2C1404.3 3233.7 1378.4 3261.6 1344.5 3288.7C1188.5 3413.6 983.5 3238.2 989.9 3075.8",
          ]}
          from={[1476.4, 3405.5]}
          to={[989.9, 3075.8]}
          color="#fdc900"
          opacity={0.34}
        />

        <div className={styles.colStart}>
          <h2 id="about-title" className={styles.title}>
            {homeAbout.title}
          </h2>
          <div className={cn(styles.bubble, styles.sun)}>
            <svg
              className={styles.tailUp}
              viewBox="381 -44.9 69.7 46"
              aria-hidden="true"
              focusable="false"
            >
              <polygon points="401.8,1.1 381,-44.9 450.7,1.1" fill="currentColor" />
            </svg>
            <p>{homeAbout.person}</p>
          </div>
        </div>

        <div className={styles.colEnd}>
          <div className={cn(styles.bubble, styles.orange)}>
            <svg
              className={styles.tailSide}
              viewBox="-60.9 110.8 62 52.1"
              aria-hidden="true"
              focusable="false"
            >
              <polygon points="1.1,162.9 -60.9,110.8 1.1,125.2" fill="currentColor" />
            </svg>
            <p>
              {homeAbout.story.map((part) => (
                <span key={part} className={styles.storyPart}>
                  {part}{" "}
                </span>
              ))}
            </p>
          </div>
          <p className={cn(shared.hand, styles.note)}>
            {homeAbout.note.map((line) => (
              <span key={line} className={styles.noteLine}>
                {line}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
