"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * `true` when the user has asked for reduced motion.
 *
 * Deliberately returns `false` on the server so the first paint matches the
 * markup; the real value arrives on hydration, before any animation is allowed
 * to start. Every autoplaying thing on this site gates on this — sliders fall
 * back to manual advance, video falls back to posters, and the ambient audio
 * never starts at all.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
