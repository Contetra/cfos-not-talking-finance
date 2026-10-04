import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scale. Our type sizes live in the
 * same `text-*` namespace as our colours, so out of the box it treats
 * `text-h2` as a colour, decides `text-primary` supersedes it, and silently
 * drops the size — every heading passed through cn() came out at body size.
 *
 * Teaching it both groups fixes that. Keep these lists in step with the
 * @theme block in app/globals.css.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h2",
            "h3",
            "quote",
            "figure",
            "lead",
            "copy",
            "label",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "canvas",
            "surface",
            "line",
            "primary",
            "body",
            "muted",
            "accent",
            "accent-2",
            "error",
          ],
        },
      ],
    },
  },
});

/** Merge Tailwind classes, last-wins on genuine conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
