import Image from "next/image";
import type { CSSProperties } from "react";

import { homeImageSizes, homeTeam, homeTeamHeading } from "@/data/home";
import { cn } from "@/lib/cn";
import type { HomeTeamGroup } from "@/types";
import { type ArrowSpec, DottedArrows, Swoosh } from "./decor";
import shared from "./home.module.css";
import styles from "./HomeTeam.module.css";

type MemberLayout = {
  /** Capsule: left, top, width, height (group px). */
  capsule: [number, number, number, number];
  tone: "yellow" | "orange";
  /** Photo: left offset and width; it is bottom-aligned in the capsule. */
  photo: [number, number];
  /** Name: centre x, centre y, rotation (deg). */
  name: [number, number, number];
  /** Paint order where capsules overlap. */
  z: number;
};

type GroupLayout = {
  /** Frame in the 1440 design: left, top (from y = 3420), width, height. */
  frame: [number, number, number, number];
  /** Label: centre x, top. */
  label: [number, number];
  arrows: ArrowSpec[];
  members: Record<string, MemberLayout>;
};

/**
 * Lifted from the design, in px relative to each group's frame, so a group
 * can sit where drawn on desktop and stack on a phone unchanged.
 */
const LAYOUT: Record<HomeTeamGroup["id"], GroupLayout> = {
  curated: {
    frame: [120, 20, 490, 605],
    label: [310, 14],
    arrows: [
      {
        d: "M355.3 73.4C396.3 101.9 380.5 184.9 353.8 204.6",
        head: "M352.8 194.6 353.5 205 363.3 203.1",
      },
      {
        d: "M321.6 83.7C304.5 129.4 248.7 141 207.9 141",
        head: "M216.3 135.7 206.9 140.3 212.4 148.7",
      },
    ],
    members: {
      "palak-kedia": {
        capsule: [41.8, 77.2, 219.9, 388.3],
        tone: "yellow",
        photo: [-0.8, 220],
        name: [53.5, 433.5, 53],
        z: 1,
      },
      "kashish-rajpal": {
        capsule: [250, 167, 220, 387],
        tone: "orange",
        photo: [0, 221],
        name: [402, 554, -24],
        z: 2,
      },
    },
  },
  production: {
    frame: [640, 20, 680, 670],
    label: [380, 29],
    arrows: [
      {
        d: "M363.6 92.4C404.6 120.8 388.8 203.8 362.1 223.5",
        head: "M361.1 213.5 361.8 224 371.6 222.1",
      },
      {
        d: "M329.9 102.6C312.8 148.3 257 159.9 216.2 159.9",
        head: "M224.6 154.7 215.2 159.2 220.7 167.6",
      },
      {
        d: "M414.9 104.8C423.9 120.2 470.4 177.8 515.3 166.4",
        head: "M506.9 162 516.8 165.4 512.4 174.4",
      },
    ],
    members: {
      "pankaj-sakpal": {
        capsule: [42, 84, 220, 387],
        tone: "orange",
        photo: [0, 221],
        name: [81, 458.5, 36],
        z: 1,
      },
      "denal-radadia": {
        capsule: [242, 185, 220, 434],
        tone: "yellow",
        photo: [-1, 222],
        name: [305, 616, 24],
        z: 3,
      },
      "rui-manjrekar": {
        capsule: [431, 142, 220, 429],
        tone: "orange",
        photo: [-1, 222],
        name: [598, 572, -31],
        z: 2,
      },
    },
  },
};

/** The people behind the show, as the design groups them, under the orange
 *  speech bubble that names them. */
export default function HomeTeam() {
  return (
    <section className={styles.team} aria-labelledby="team-title">
      <div className={styles.heading}>
        <svg
          className={styles.bubble}
          viewBox="0 0 650 236"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M325 8C472 4 614 32 637 100C656 158 602 198 522 208L566 232L468 212C420 216 372 218 325 218C168 220 22 198 12 122C2 48 160 12 325 8Z"
            fill="currentColor"
          />
        </svg>
        <svg
          className={styles.flourish}
          viewBox="0 0 760 250"
          aria-hidden="true"
          focusable="false"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        >
          <path d="M40 214C14 190 22 152 58 150C90 148 92 186 66 196" />
          <path d="M704 40C732 58 730 98 696 104C664 110 656 74 682 62" />
        </svg>
        <h2 id="team-title" className={cn(shared.hand, styles.headingText)}>
          {homeTeamHeading.map((line) => (
            <span key={line} className={styles.headingLine}>
              {line}{" "}
            </span>
          ))}
        </h2>
      </div>

      <div className={styles.canvas}>
        <Swoosh
          id="swoosh-team"
          className={styles.swoosh}
          viewBox="-95 3870 1705 360"
          paths={[
            "M-55 3881.7C-83.3 4091 143.6 4219.5 299.6 4094.6C333.5 4067.5 359.4 4039.6 359.4 3998.1C359.4 3925.2 285.6 3946 285.6 4034.8C285.6 4092.3 378.7 4336.6 629 4198.2C1081.9 3947.9 1273.5 4476.5 1594.8 3979.6",
            "M-61.8 3889.8C-90 4099.1 136.8 4227.7 292.9 4102.8C326.7 4075.7 352.7 4047.7 352.7 4006.2C352.7 3933.3 278.8 3954.1 278.8 4043C278.8 4100.4 372 4344.8 622.3 4206.4C1075.2 3956 1266.8 4484.6 1588 3987.8",
          ]}
          from={[-55, 3881.7]}
          to={[1594.8, 3979.6]}
          color="#fdc900"
          opacity={0.42}
        />

        {homeTeam.map((group) => {
          const g = LAYOUT[group.id];
          const groupVars = {
            "--gx": g.frame[0],
            "--gy": g.frame[1],
            "--gw": g.frame[2],
            "--gh": g.frame[3],
            "--lx": g.label[0],
            "--ly": g.label[1],
          } as CSSProperties;

          return (
            <div key={group.id} className={styles.group} style={groupVars}>
              <h3 className={cn(shared.hand, styles.label)}>{group.label}</h3>
              <DottedArrows
                className={styles.arrows}
                viewBox={`0 0 ${g.frame[2]} ${g.frame[3]}`}
                arrows={g.arrows}
                dash="1.77 1.77"
              />
              <ul className={styles.members}>
                {group.members.map((member) => {
                  const m = g.members[member.id];
                  const size = homeImageSizes[member.image];
                  const vars = {
                    "--px": m.capsule[0],
                    "--py": m.capsule[1],
                    "--pw": m.capsule[2],
                    "--ph": m.capsule[3],
                    "--fx": m.photo[0],
                    "--fw": m.photo[1],
                    "--nx": m.name[0],
                    "--ny": m.name[1],
                    "--nr": `${m.name[2]}deg`,
                    "--z": m.z,
                  } as CSSProperties;
                  return (
                    <li key={member.id} className={styles.member} style={vars}>
                      <div className={cn(styles.capsule, styles[m.tone])}>
                        <Image
                          src={member.image}
                          alt=""
                          width={size.width}
                          height={size.height}
                          sizes="(min-width: 1440px) 222px, (min-width: 1024px) 16vw, 200px"
                          className={styles.photo}
                        />
                      </div>
                      <p className={cn(shared.hand, styles.name)}>{member.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
