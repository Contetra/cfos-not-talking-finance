"use client";

import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

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

/** The one moving thing on a placeholder page. */
export default function Waveform({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("flex h-12 w-full max-w-[520px] items-center gap-[3px]", className)}
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
  );
}
