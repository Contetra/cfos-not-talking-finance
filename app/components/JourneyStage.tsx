"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";
import type { JourneyStageItem } from "@/types";

type JourneyStageProps = {
  stage: JourneyStageItem;
  /** "column" is the desktop row of five; "row" is the mobile stack. */
  variant: "column" | "row";
  /** Draw the rule running back to the previous tile. False for the first. */
  connector?: boolean;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * The stage's looping animation.
 *
 * Video is lazy (`preload="none"`) and only plays while it is actually on
 * screen — five clips autoplaying above the fold would cost more than the rest
 * of the page put together.
 */
function StageMedia({ stage }: { stage: JourneyStageItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { media } = stage;

  useEffect(() => {
    const el = ref.current;
    if (!el || media.type !== "video") return;

    // Belt and braces: never trust the data file to have set this.
    el.muted = true;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void el.play().catch(() => {
              /* a refused play is not fatal — the poster frame stands in */
            });
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [media.type]);

  if (media.type === "video") {
    return (
      <video
        ref={ref}
        src={media.src}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="h-full w-full object-cover"
      />
    );
  }

  // "lottie" has no player installed yet, so its JSON is not renderable here.
  // It falls through to the still, which is the correct placeholder behaviour
  // until a player is added or the asset is swapped for a video.
  return (
    <Image
      src={media.src}
      alt=""
      fill
      sizes="(min-width: 1024px) 200px, 64px"
      loading="lazy"
      unoptimized={media.type === "gif"}
      className="object-cover"
    />
  );
}

export default function JourneyStage({
  stage,
  variant,
  connector = false,
}: JourneyStageProps) {
  const isColumn = variant === "column";

  return (
    <li
      className={cn(
        isColumn ? "relative flex flex-col" : "relative flex gap-5 pb-10",
      )}
    >
      {/* Wrapper is not clipped, so the dot can sit on the tile's edge. */}
      <div className={cn("relative", isColumn ? "w-full" : "shrink-0")}>
        <div
          className={cn(
            "bg-surface border-line relative overflow-hidden rounded-xl border",
            isColumn ? "aspect-square w-full" : "size-16",
          )}
        >
          <StageMedia stage={stage} />
        </div>

        {/* The rule back to the previous tile, drawn from this one so it always
            lands on the tile's true vertical centre whatever the column width,
            and the accent dot where the two meet. */}
        {isColumn && connector ? (
          <span
            aria-hidden="true"
            className="bg-line absolute top-1/2 right-full h-px w-6 -translate-y-1/2"
          />
        ) : null}
        {isColumn ? (
          <span
            aria-hidden="true"
            className="bg-accent absolute top-1/2 left-0 z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
        ) : null}
      </div>

      <div className={cn(isColumn && "mt-5")}>
        {/* Muted rather than accent: accent type on a light ground is 2.2:1 and
            fails AA at any size. The accent stays on the connector dot. */}
        <p className="font-body text-label text-muted tabular-nums">
          {pad(stage.number)}
        </p>
        <h3 className="font-display text-h3 text-primary mt-1 font-bold text-balance">
          {stage.title}
        </h3>
        <p className="font-body text-copy text-body mt-2 max-w-[24ch] text-pretty">
          {stage.copy}
        </p>
      </div>
    </li>
  );
}
