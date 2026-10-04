"use client";

import { cn } from "@/lib/cn";

type Segment = {
  id: string;
  durationMs: number;
  label: string;
};

type GalleryProgressBarProps = {
  items: Segment[];
  activeIndex: number;
  /** 0 → 1 within the active item. */
  progress: number;
  paused: boolean;
  onSelect: (index: number) => void;
};

/**
 * A segmented scrubber whose segment widths are PROPORTIONAL to each item's
 * dwell time, so the bar is an honest map of the reel — a 20s clip occupies
 * proportionally more of it than a 3s loop.
 */
export default function GalleryProgressBar({
  items,
  activeIndex,
  progress,
  onSelect,
}: GalleryProgressBarProps) {
  const total = items.reduce((sum, item) => sum + item.durationMs, 0) || 1;

  return (
    <div className="flex w-full items-stretch gap-1.5">
      {items.map((item, index) => {
        const played = index < activeIndex;
        const isActive = index === activeIndex;
        const fill = played ? 1 : isActive ? progress : 0;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(index)}
            aria-current={isActive ? "true" : undefined}
            /* Width is a runtime proportion — no utility can express it. */
            style={{ flexGrow: item.durationMs / total }}
            className="group flex-shrink basis-0 py-2"
          >
            <span className="sr-only">
              {`Go to item ${index + 1} of ${items.length}: ${item.label}`}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "bg-line block h-[3px] w-full overflow-hidden rounded-full",
                !isActive && "group-hover:bg-muted/40",
              )}
            >
              {/* No transition: this fill is a clock driven by rAF, so easing
                  it would make the bar lie about where the reel actually is. */}
              <span
                className="bg-accent block h-full w-full origin-left"
                style={{ transform: `scaleX(${fill})` }}
              />
            </span>
          </button>
        );
      })}
    </div>
  );
}
