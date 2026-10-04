"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { memo, useCallback, useEffect, useRef, useState } from "react";

import {
  DEFAULT_GALLERY_DURATION_MS,
  gallery,
  galleryIntro,
} from "@/data/gallery";
import { cn } from "@/lib/cn";
import { CONTAINER, TRANSITION } from "@/lib/ui";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { GalleryItem } from "@/types";
import GalleryProgressBar from "./GalleryProgressBar";

/** How long to wait for a video's metadata before giving up and falling back
 *  to the item's own durationMs. */
const METADATA_TIMEOUT_MS = 2500;
const SWIPE_THRESHOLD = 48;

function dwell(item: GalleryItem) {
  return item.durationMs || DEFAULT_GALLERY_DURATION_MS;
}

/* -------------------------------------------------------------------------
   Media layer

   Memoised so the 60fps progress clock in the parent cannot re-render the
   <video>/<Image> tree on every frame.
------------------------------------------------------------------------- */

type MediaLayerProps = {
  item: GalleryItem;
  visible: boolean;
  /** Play the real video, or show the poster instead. */
  asPoster: boolean;
  videoRef?: React.Ref<HTMLVideoElement>;
  onEnded?: () => void;
  onTimeUpdate?: (fraction: number) => void;
  onMetadata?: () => void;
  onFailed?: () => void;
};

const MediaLayer = memo(function MediaLayer({
  item,
  visible,
  asPoster,
  videoRef,
  onEnded,
  onTimeUpdate,
  onMetadata,
  onFailed,
}: MediaLayerProps) {
  const isVideo = item.type === "video" && !asPoster;

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "absolute inset-0 transition-opacity duration-500",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          /* Never audible: the site already carries a background track. The
             attribute is belt, the imperative assignment in the parent is
             braces — the data file is not trusted for this. */
          muted
          playsInline
          preload="metadata"
          controls={false}
          onEnded={onEnded}
          onLoadedMetadata={onMetadata}
          onError={onFailed}
          onTimeUpdate={(event) => {
            const el = event.currentTarget;
            if (el.duration > 0 && Number.isFinite(el.duration)) {
              onTimeUpdate?.(el.currentTime / el.duration);
            }
          }}
          className="h-full w-full object-cover"
          aria-label={item.alt}
        />
      ) : (
        <Image
          src={item.type === "video" ? (item.poster ?? item.src) : item.src}
          alt={visible ? item.alt : ""}
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          unoptimized={item.type === "gif"}
          className="object-cover"
        />
      )}
    </div>
  );
});

/* -------------------------------------------------------------------------
   Gallery
------------------------------------------------------------------------- */

export default function MediaGallery() {
  const reduced = useReducedMotion();
  const items = gallery;
  const count = items.length;

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  /** True once this item's video has proved it can report a duration. */
  const [mediaReady, setMediaReady] = useState(false);
  /** True when metadata never arrived — the clock takes over. */
  const [mediaFailed, setMediaFailed] = useState(false);

  const videoEl = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef(0);
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);

  const item = items[index];
  const nextIndex = (index + 1) % count;

  // Reduced motion means manual advance only, and posters instead of video.
  const paused = reduced || hovered || focusWithin || tabHidden;

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setProgress(0);
    progressRef.current = 0;
    setMediaReady(false);
    setMediaFailed(false);
  }, []);

  const advance = useCallback(
    () => goTo((index + 1) % count),
    [goTo, index, count],
  );
  const back = useCallback(
    () => goTo((index - 1 + count) % count),
    [goTo, index, count],
  );

  /** This item plays to its own end rather than to a fixed dwell time. */
  const usingMediaDuration =
    item.type === "video" &&
    item.useMediaDuration === true &&
    !reduced &&
    mediaReady &&
    !mediaFailed;

  /* Assert muted imperatively. The attribute alone can be defeated by a stale
     DOM node being reused across items. */
  useEffect(() => {
    if (videoEl.current) videoEl.current.muted = true;
  }, [index]);

  /* Give a video a bounded window to report metadata. If it never does — a dead
     URL, a codec the browser will not touch — fall back to durationMs so a
     broken asset cannot stall the whole reel. */
  useEffect(() => {
    if (item.type !== "video" || !item.useMediaDuration || reduced) return;
    if (mediaReady || mediaFailed) return;
    const timer = window.setTimeout(
      () => setMediaFailed(true),
      METADATA_TIMEOUT_MS,
    );
    return () => window.clearTimeout(timer);
  }, [item, index, reduced, mediaReady, mediaFailed]);

  /* Play/pause the real video in step with the reel. */
  useEffect(() => {
    const el = videoEl.current;
    if (!el || item.type !== "video" || reduced) return;
    if (paused) {
      el.pause();
    } else {
      void el.play().catch(() => {
        /* A refused play is not fatal — the clock still advances the reel. */
      });
    }
  }, [paused, index, item.type, reduced]);

  /* The clock. One rAF loop owns both the progress fill and the advance, so the
     two can never disagree, and pausing simply tears it down — freezing the
     fill exactly where it stands. */
  useEffect(() => {
    if (paused || usingMediaDuration) return;

    const duration = dwell(item);
    let frame = 0;
    const start = performance.now() - progressRef.current * duration;

    const step = (now: number) => {
      const value = Math.min((now - start) / duration, 1);
      progressRef.current = value;
      setProgress(value);
      if (value >= 1) {
        advance();
        return;
      }
      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [paused, usingMediaDuration, item, index, advance]);

  useEffect(() => {
    const read = () => setTabHidden(document.hidden);
    read();
    document.addEventListener("visibilitychange", read);
    return () => document.removeEventListener("visibilitychange", read);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      advance();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      back();
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLElement>) => {
    const receiving = event.relatedTarget;
    if (receiving instanceof Node && event.currentTarget.contains(receiving))
      return;
    setFocusWithin(false);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const started = gesture.current;
    gesture.current = null;
    if (!started || started.id !== event.pointerId) return;
    const dx = event.clientX - started.x;
    const dy = event.clientY - started.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) advance();
    else back();
  };

  const segments = items.map((entry) => ({
    id: entry.id,
    durationMs: dwell(entry),
    label: entry.alt,
  }));

  return (
    <section
      id="gallery"
      role="region"
      aria-roledescription="carousel"
      aria-label={galleryIntro.title}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocusWithin(true)}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        gesture.current = null;
      }}
      className="bg-surface section"
    >
      <div className={CONTAINER}>
        <h2 className="font-display text-h2 text-primary max-w-[22ch] font-bold text-balance">
          {galleryIntro.title}
        </h2>
        <p className="font-body text-lead text-body mt-6 max-w-[46ch] text-pretty">
          {galleryIntro.line}
        </p>

        <div className="mx-auto mt-12 w-full max-w-[1000px]">
          {/* The scrubber sits above the frame, not floating over the media. */}
          <GalleryProgressBar
            items={segments}
            activeIndex={index}
            progress={progress}
            paused={paused}
            onSelect={goTo}
          />

        {/* aspect-ratio reserves the box before anything loads — zero shift. */}
        <div className="border-line bg-surface relative mt-3 aspect-[16/9] w-full overflow-hidden rounded-2xl border">
          <MediaLayer
            key={item.id}
            item={item}
            visible
            asPoster={reduced}
            videoRef={videoEl}
            onEnded={usingMediaDuration ? advance : undefined}
            onMetadata={() => setMediaReady(true)}
            onFailed={() => setMediaFailed(true)}
            onTimeUpdate={
              usingMediaDuration
                ? (fraction) => {
                    progressRef.current = fraction;
                    setProgress(fraction);
                  }
                : undefined
            }
          />

          {/* Only the NEXT item is preloaded — never the whole reel. */}
          {count > 1 ? (
            <MediaLayer
              key={`preload-${items[nextIndex].id}`}
              item={items[nextIndex]}
              visible={false}
              asPoster
            />
          ) : null}
          </div>

          {/* Controls sit below the frame rather than floating over the media. */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={back}
              aria-label="Previous item"
              className={cn(
                "border-line text-primary hover:border-primary flex size-12 items-center justify-center rounded-full border",
                TRANSITION,
              )}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={advance}
              aria-label="Next item"
              className={cn(
                "border-line text-primary hover:border-primary flex size-12 items-center justify-center rounded-full border",
                TRANSITION,
              )}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>

        <p aria-live="polite" className="sr-only">
          {`Item ${index + 1} of ${count}: ${item.alt}`}
        </p>
      </div>
    </section>
  );
}
