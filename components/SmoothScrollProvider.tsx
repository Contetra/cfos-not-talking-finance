"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

import { useReducedMotion } from "@/lib/useReducedMotion";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/**
 * The live instance, kept at module scope rather than in context so anything on
 * the page can reach it without being wrapped in a provider — the playhead rail
 * uses it to scroll to a chapter. `null` whenever smoothing is not running,
 * which is the whole of the reduced-motion case.
 */
let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

/**
 * Lenis owns the scroll position for the site. It still drives the real window
 * scroll, so native `scroll` listeners, IntersectionObserver and anchor offsets
 * all keep working — nothing else has to know this is here.
 *
 * The two CSS rules Lenis needs are already in globals.css; its stylesheet is
 * deliberately not imported.
 */
export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const reduced = useReducedMotion();

  useEffect(() => {
    // Under reduced motion there is no instance at all: no interpolation, no
    // rAF loop, and getLenis() returns null so callers fall back to native
    // instant scrolling.
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.09 });
    instance = lenis;

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      instance = null;
    };
  }, [reduced]);

  return <>{children}</>;
}
