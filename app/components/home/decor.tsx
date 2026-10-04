/**
 * Decorative SVG pieces for the homepage. All geometry is lifted from the
 * landing design's vector paths, in design pixels (1440-wide frame), so each
 * shape can be dropped into a viewBox and scaled with the page.
 *
 * Every piece is aria-hidden: none of them carry meaning.
 */

/**
 * The brand's quote bracket — the same mark the logo uses, enlarged. Drawn
 * once as the opening "‘" form; `flip` mirrors it for the other corners.
 *   none -> hook rises to the upper right (hero, top left)
 *   x    -> mirrored left-right          (hero, bottom right)
 *   y    -> mirrored top-bottom          (host bubble)
 */
const BRACKET_D =
  "M58.3 78.5V136.9H0V78.5C0 43.8 14.2 15.9 40 0l18.6 19.4c-1.5.7-2.9 1.5-4.2 2.3C40.4 31 34.9 45.8 33.4 49.6c-2.9 7.7-3.7 17.5-4.1 28.9Z";

export function QuoteBracket({
  className,
  flip,
}: {
  className?: string;
  flip?: "x" | "y";
}) {
  const transform =
    flip === "x"
      ? "translate(58.6 0) scale(-1 1)"
      : flip === "y"
        ? "translate(0 136.9) scale(1 -1)"
        : undefined;
  return (
    <svg
      viewBox="0 0 58.6 136.9"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={BRACKET_D} fill="currentColor" transform={transform} />
    </svg>
  );
}

type Point = readonly [number, number];

/**
 * A loose ribbon of colour that fades out along its length, as the design's
 * swooshes do. `paths` share one gradient (the bottom swoosh is two strokes).
 */
export function Swoosh({
  id,
  viewBox,
  paths,
  from,
  to,
  color,
  opacity = 0.45,
  width = 12.5,
  className,
}: {
  /** Unique per page — names the gradient. */
  id: string;
  viewBox: string;
  paths: readonly string[];
  /** Strong end and faded end, in viewBox units. */
  from: Point;
  to: Point;
  color: string;
  opacity?: number;
  width?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={from[0]}
          y1={from[1]}
          x2={to[0]}
          y2={to[1]}
        >
          <stop offset="0" stopColor={color} stopOpacity={opacity} />
          <stop offset="0.55" stopColor={color} stopOpacity={opacity * 0.62} />
          <stop offset="1" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      {paths.map((d) => (
        <path
          key={d}
          d={d}
          stroke={`url(#${id})`}
          strokeWidth={width}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export type ArrowSpec = {
  /** The dotted run. */
  d: string;
  /** The open "V" at its end. */
  head: string;
};

/**
 * Hand-drawn dotted arrows, in navy. Draw several into one overlay that shares
 * the coordinate system of the block it decorates.
 */
export function DottedArrows({
  viewBox,
  arrows,
  strokeWidth = 1.77,
  dash = "3.54 1.77",
  className,
}: {
  viewBox: string;
  arrows: readonly ArrowSpec[];
  strokeWidth?: number;
  dash?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      overflow="visible"
    >
      {arrows.map((a) => (
        <g key={a.d}>
          <path d={a.d} strokeDasharray={dash} />
          <path d={a.head} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </svg>
  );
}

/** Headphones, as drawn in the design's reach row: a heavy band and two
 *  solid earcups. */
export function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4.1 15.4v-3.2a7.9 7.9 0 0 1 15.8 0v3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.3}
      />
      <rect x="2.2" y="13" width="4.1" height="8.3" rx="1.2" fill="currentColor" />
      <rect x="17.7" y="13" width="4.1" height="8.3" rx="1.2" fill="currentColor" />
    </svg>
  );
}
