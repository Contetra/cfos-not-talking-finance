"use client";

import Link from "next/link";

import { routes } from "@/data/site";
import { cn } from "@/lib/cn";
import { BTN_OUTLINE, CONTAINER } from "@/lib/ui";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ComingSoonProps = {
  title: string;
  line: string;
};

const BAR_COUNT = 40;

/**
 * Resting heights from two summed sines rather than Math.random, so the
 * server and client agree and the bar never flickers on hydration.
 */
function restingHeight(i: number) {
  const a = Math.sin(i * 0.55);
  const b = Math.sin(i * 0.21 + 1.3);
  return 0.28 + ((a + b + 2) / 4) * 0.62;
}

export default function ComingSoon({ title, line }: ComingSoonProps) {
  const reduced = useReducedMotion();

  return (
    <section className="bg-canvas section">
      <div className={CONTAINER}>
        <h1 className="font-display text-display text-primary max-w-[16ch] font-extrabold text-balance">
          {title}
        </h1>

        {/* The one moving thing on these pages. */}
        <div
          aria-hidden="true"
          className="mt-10 flex h-12 w-full max-w-[520px] items-center gap-[3px]"
        >
          {Array.from({ length: BAR_COUNT }, (_, i) => (
            <span
              key={i}
              className={cn(
                "bg-accent/30 block h-full flex-1 origin-center rounded-full",
                reduced
                  ? "scale-y-[var(--rest)]"
                  : "animate-[waveform_1800ms_ease-in-out_infinite]",
              )}
              /* Per-bar resting height and delay are runtime values; the
                 keyframes in globals.css read --rest. */
              style={
                {
                  "--rest": restingHeight(i),
                  animationDelay: reduced ? undefined : `${i * 45}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <p className="font-body text-lead text-body mt-10 max-w-[46ch] text-pretty">
          {line}
        </p>

        <Link href={routes.home} className={cn(BTN_OUTLINE, "mt-10")}>
          Back to the show
        </Link>
      </div>
    </section>
  );
}
