"use client";

import { stats } from "@/data/stats";
import { cn } from "@/lib/cn";
import { CONTAINER, TRANSITION } from "@/lib/ui";
import type { Stat } from "@/types";
import Counter from "@/components/Counter";
import { SocialMark } from "@/components/SocialMarks";

/**
 * The reach moment, on a surface band.
 *
 * Each figure gets a 96px white ring with a 44px mark inside it — the marks are
 * the section's structure, so they are set at a size you can actually read,
 * not shrunk to sit beside the type.
 */
function Unit({ stat }: { stat: Stat }) {
  const body = (
    <>
      <span
        className={cn(
          "border-line bg-canvas text-primary flex size-24 items-center justify-center rounded-full border-[1.5px]",
          // Hover fills the ring with accent and keeps the mark in primary.
          // An accent-coloured mark would be 2.2:1 against white and fail the
          // 3:1 floor for non-text; accent as a FILL with primary on top is
          // 7.2:1 and is the sanctioned way to use it.
          "group-hover:border-accent group-hover:bg-accent",
          "group-focus-visible:border-accent group-focus-visible:bg-accent",
          TRANSITION,
        )}
      >
        <SocialMark platform={stat.mark} className="size-11" />
      </span>

      <span className="font-display text-figure text-primary mt-6 block font-extrabold tabular-nums">
        <Counter to={stat.value} />
      </span>

      <span className="font-body text-label text-muted mt-2 block text-pretty">
        {stat.label}
      </span>
    </>
  );

  const shell = "group flex flex-col items-center px-4 text-center";

  return stat.href ? (
    <a
      href={stat.href}
      target="_blank"
      rel="noopener noreferrer"
      className={shell}
    >
      {body}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
}

export default function SocialReachBand() {
  return (
    <section id="reach" className="bg-surface section" aria-label="Reach">
      <div className={CONTAINER}>
        <ul className="grid grid-cols-2 gap-y-14 lg:grid-cols-4 lg:gap-y-0">
          {stats.items.map((stat, i) => (
            <li
              key={stat.id}
              className={cn(
                // Hairline verticals between units, never a box around them.
                // Two columns on mobile, four on desktop, so the divider sits
                // in a different place at each breakpoint.
                "border-line",
                i % 2 === 1 && "border-l",
                i === 0 ? "lg:border-l-0" : "lg:border-l",
              )}
            >
              <Unit stat={stat} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
