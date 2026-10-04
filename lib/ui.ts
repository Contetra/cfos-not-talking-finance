/**
 * Shared layout and control classes.
 *
 * These exist so the grid and the buttons are defined once. A container width
 * or a button treatment that is retyped in fifteen files drifts in fifteen
 * directions; this is the one place to change either.
 */

/** 1200px, 12-column grid, 32px gutters. Every section uses this. */
export const CONTAINER = "mx-auto w-full max-w-[1200px] px-6 md:px-10";

/** 12 columns, 32px gutter. Pair with CONTAINER. */
export const GRID = "grid grid-cols-12 gap-x-8";

/**
 * Interactive transition. Only colour, background, border and opacity —
 * never `all`, and never layout properties.
 */
export const TRANSITION =
  "transition-[color,background-color,border-color,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]";

const BUTTON_BASE =
  "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-display text-[0.9375rem] font-bold whitespace-nowrap";

/** Primary action: accent fill, primary type on top. Accent is never the type
 *  colour here — at this size on white it would fail contrast. */
export const BTN_ACCENT = `${BUTTON_BASE} bg-accent text-primary hover:bg-accent-2 ${TRANSITION}`;

/** Secondary action: 1.5px primary outline, transparent fill. */
export const BTN_OUTLINE = `${BUTTON_BASE} border-[1.5px] border-primary text-primary hover:bg-primary hover:text-canvas ${TRANSITION}`;

/** Measure caps. No paragraph runs the full container width. */
export const MEASURE = {
  display: "max-w-[16ch]",
  h2: "max-w-[22ch]",
  lead: "max-w-[46ch]",
  body: "max-w-[64ch]",
} as const;
