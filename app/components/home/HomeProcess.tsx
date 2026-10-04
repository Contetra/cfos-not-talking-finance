import Image from "next/image";
import type { CSSProperties } from "react";

import Counter from "@/components/Counter";
import { SocialMark } from "@/components/SocialMarks";
import { homeImageSizes, homeIntro, homeSteps } from "@/data/home";
import { stats } from "@/data/stats";
import { cn } from "@/lib/cn";
import type { Stat } from "@/types";
import { type ArrowSpec, DottedArrows, HeadphonesIcon, Swoosh } from "./decor";
import shared from "./home.module.css";
import styles from "./HomeProcess.module.css";

/**
 * Where each step sits, in design px. A step is a small frame of its own
 * (w x h): the illustration, its number, its arrow and its caption are placed
 * inside that frame, so the five can be scattered as drawn on desktop and
 * simply stacked on a phone without re-laying anything out.
 *
 *   x, y    the frame's position in the steps area (desktop only)
 *   art     illustration: left, top, width
 *   num     number circle: left, top
 *   text    caption: left, top, rotation (deg)
 */
type StepLayout = {
  x: number;
  y: number;
  w: number;
  h: number;
  art: [number, number, number];
  num: [number, number];
  text: [number, number, number];
  arrow: ArrowSpec;
  /** Steps 4 and 5 are drawn with a finer pen. */
  fine?: boolean;
};

const STEP_LAYOUT: Record<number, StepLayout> = {
  1: {
    x: 205,
    y: 15,
    w: 280,
    h: 400,
    art: [8, 6, 238.3],
    num: [171, 221],
    text: [78, 304, 0],
    arrow: {
      d: "M226.1 172.7C258.4 177.3 275.6 253.2 222.9 275.3",
      head: "M225.9 268.5 223 275.7 231 276.4",
    },
  },
  2: {
    x: 560,
    y: 15,
    w: 340,
    h: 400,
    art: [49, 21.7, 205.7],
    num: [115, 7],
    text: [86, 290, -6],
    arrow: {
      d: "M40 191.6C8.4 212.2 20.3 284 77.4 287.1",
      head: "M72.3 281.8 77.5 287.6 70.1 290.9",
    },
  },
  3: {
    x: 900,
    y: 0,
    w: 310,
    h: 395,
    art: [52.7, 23, 208.3],
    num: [140, 11],
    text: [87, 281, 3],
    arrow: {
      d: "M56.5 195.1C19.8 203.9 7 275.6 59.7 297.6",
      head: "M56.7 290.9 59.6 298.1 51.6 298.8",
    },
  },
  4: {
    x: 440,
    y: 380,
    w: 330,
    h: 375,
    art: [8.3, 6.7, 238],
    num: [96, 11],
    text: [68, 268, 4],
    fine: true,
    arrow: {
      d: "M266 141.4C294.3 164.3 295.9 207.2 283.3 228C264.5 259.1 241.8 220.5 273.6 206.5C320.1 186.2 319.5 268.6 277.8 281",
      head: "M281.4 274.6 277.3 281.3 285.2 283.3",
    },
  },
  5: {
    x: 770,
    y: 380,
    w: 410,
    h: 375,
    art: [6, 4.3, 235.3],
    num: [106, 11],
    text: [141, 267, -1],
    fine: true,
    arrow: {
      d: "M228.1 115.5C255.1 133.5 264.3 170.1 257.5 191.3C246.5 226 215.4 193.7 243.1 172.8C283.5 142.1 302.2 222.4 264.5 244.2",
      head: "M266.5 237.1 264.1 244.6 272.2 244.7",
    },
  },
};

function StatMark({ mark }: { mark: Stat["mark"] }) {
  return mark === "episodes" ? (
    <HeadphonesIcon className={styles.statIcon} />
  ) : (
    <SocialMark platform={mark} className={styles.statIcon} />
  );
}

/**
 * Reach figures, then "One conversation. Many ways to be heard." and the five
 * steps. One section because the design runs the lettering texture behind
 * both the figures and the heading.
 */
export default function HomeProcess() {
  return (
    <section className={styles.process} aria-labelledby="process-title">
      <div className={styles.canvas}>
        <span aria-hidden="true" className={cn(shared.pattern, styles.pattern)} />

        <Swoosh
          id="swoosh-lilac"
          className={styles.swoosh}
          viewBox="1095 1160 355 370"
          paths={[
            "M1108.2 1187.4C1207.3 1169.6 1289.2 1242.5 1244.7 1337.2C1221.6 1386.4 1174.2 1376.7 1194.3 1336.9C1205.7 1314.3 1227.6 1306.2 1253.5 1300.7C1373.1 1275.5 1436.6 1427.7 1388.4 1514.6",
          ]}
          from={[1108, 1187]}
          to={[1388, 1515]}
          color="#3c2b99"
          opacity={0.47}
        />

        <ul className={styles.stats} aria-label="Reach">
          {stats.items.map((stat) => {
            const body = (
              <>
                <span className={styles.statMark}>
                  <StatMark mark={stat.mark} />
                </span>
                <span className={styles.statValue}>
                  <Counter to={stat.value} grouping={false} />
                </span>
                <span className="sr-only"> {stat.label}</span>
              </>
            );
            return (
              <li key={stat.id}>
                {stat.href ? (
                  <a
                    href={stat.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.stat}
                  >
                    {body}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <div className={styles.stat}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <h2 id="process-title" className={styles.title}>
          {homeIntro.title.map((line) => (
            <span key={line} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </h2>
        <p className={styles.lede}>{homeIntro.line}</p>

        <ol className={styles.steps}>
          {homeSteps.map((step) => {
            const l = STEP_LAYOUT[step.number];
            const size = homeImageSizes[step.image];
            const vars = {
              "--sx": l.x,
              "--sy": l.y,
              "--gw": l.w,
              "--gh": l.h,
              "--ix": l.art[0],
              "--iy": l.art[1],
              "--iw": l.art[2],
              "--cx": l.num[0],
              "--cy": l.num[1],
              "--tx": l.text[0],
              "--ty": l.text[1],
              "--rot": `${l.text[2]}deg`,
            } as CSSProperties;
            return (
              <li key={step.id} className={styles.step} style={vars}>
                <Image
                  src={step.image}
                  alt=""
                  width={size.width}
                  height={size.height}
                  sizes="(min-width: 1440px) 240px, (min-width: 1024px) 17vw, 240px"
                  className={styles.art}
                />
                <DottedArrows
                  className={styles.arrows}
                  viewBox={`0 0 ${l.w} ${l.h}`}
                  arrows={[l.arrow]}
                  strokeWidth={l.fine ? 1.56 : 1.77}
                  dash={l.fine ? "3.13 1.56" : "3.54 1.77"}
                />
                <span aria-hidden="true" className={styles.number}>
                  {step.number}
                </span>
                <p className={styles.caption}>
                  {step.caption.map((line) => (
                    <span key={line} className={styles.captionLine}>
                      {line}
                    </span>
                  ))}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
