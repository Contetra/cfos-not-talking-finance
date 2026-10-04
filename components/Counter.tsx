"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/lib/useReducedMotion";

const DURATION_MS = 1800;
const THRESHOLD = 0.4;

/** Ease-out cubic. Fast at the start, settling into the final figure. */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

const FORMAT = new Intl.NumberFormat("en-IN");
const FORMAT_PLAIN = new Intl.NumberFormat("en-IN", { useGrouping: false });

type CounterProps = {
  to: number;
  className?: string;
  /** Thousands separators ("1,840"). Off for "1840". Defaults to on. */
  grouping?: boolean;
};

/**
 * Counts from 0 to `to` once, the first time it is 40% visible, and never
 * again.
 *
 * The displayed value genuinely starts at 0 — it is not the final number
 * faded in. Under reduced motion the final value is rendered immediately with
 * no observer and no animation frame.
 */
export default function Counter({ to, className, grouping = true }: CounterProps) {
  const format = grouping ? FORMAT : FORMAT_PLAIN;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  /** Guards against a second run if the element re-enters the viewport. */
  const hasRun = useRef(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reduced motion shows `to` directly (see `shown`); nothing to animate.
    if (reduced) return;

    const el = ref.current;
    if (!el || hasRun.current) return;

    let frame = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / DURATION_MS, 1);
      setValue(Math.round(easeOutCubic(t) * to));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || hasRun.current) continue;
          hasRun.current = true;
          observer.disconnect();
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: THRESHOLD },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, reduced]);

  const shown = reduced ? to : value;

  return (
    <span ref={ref} className={className}>
      {/* Announced once as a settled fact — a mid-flight figure read aloud
          would be wrong, and would change under the reader. */}
      <span aria-hidden="true">{format.format(shown)}</span>
      <span className="sr-only">{format.format(to)}</span>
    </span>
  );
}
