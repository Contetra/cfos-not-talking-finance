"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { HERO_SLIDE_DURATION_MS, heroSlides } from "@/data/hero";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FADE_S = 0.6;
const SWIPE_THRESHOLD = 48;

/**
 * Full-bleed hero image carousel. Every slide is one piece of 1920x1080
 * artwork — title, guest and quote are already part of the image, so this
 * component only handles the sliding and adds nothing of its own on top.
 *
 * Slide count is read from `data/hero.ts`, not hardcoded: autoplay, the
 * pager dots and keyboard/swipe nav all fall away cleanly if that list ever
 * drops to a single image, and just as cleanly pick up a third or fourth.
 */
export default function HeroSlider() {
  const reduced = useReducedMotion();
  const count = heroSlides.length;

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const gesture = useRef<{ id: number; x: number; y: number } | null>(null);

  const autoplay = !reduced && count > 1;
  const paused = hovered || focusWithin || tabHidden;

  const next = useCallback(
    () => setIndex((current) => (current + 1) % count),
    [count],
  );
  const previous = useCallback(
    () => setIndex((current) => (current - 1 + count) % count),
    [count],
  );

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = window.setTimeout(next, HERO_SLIDE_DURATION_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, paused, index, next]);

  useEffect(() => {
    const read = () => setTabHidden(document.hidden);
    read();
    document.addEventListener("visibilitychange", read);
    return () => document.removeEventListener("visibilitychange", read);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (count < 2) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLElement>) => {
    const receiving = event.relatedTarget;
    if (receiving instanceof Node && event.currentTarget.contains(receiving))
      return;
    setFocusWithin(false);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" || count < 2) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const started = gesture.current;
    gesture.current = null;
    if (!started || started.id !== event.pointerId) return;
    const dx = event.clientX - started.x;
    const dy = event.clientY - started.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
    if (dx < 0) next();
    else previous();
  };

  const active = heroSlides[index];

  return (
    <section
      id="hero"
      role="region"
      aria-roledescription="carousel"
      aria-label={site.name}
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
      // Flat white ground — the canvas token, not a section-specific colour,
      // so any letterboxing around an odd-ratio slide disappears into it.
      className="bg-canvas"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.24, ease: "linear" },
            }}
            transition={{ duration: FADE_S, ease: EASE }}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              // contain, not cover: a 1920x1080 slide fills an aspect-video
              // box exactly, and contain keeps future slides whole (letting
              // white show through) instead of cropping them if one ever
              // ships at a different ratio.
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {count > 1 ? (
        <div className="flex items-center justify-center gap-3 py-6">
          {heroSlides.map((slide, i) => {
            const isActive = i === index;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-current={isActive ? "true" : undefined}
                className="group p-2"
              >
                <span className="sr-only">{`Go to slide ${i + 1} of ${count}`}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-1.5 w-6 rounded-full transition-colors duration-200",
                    isActive ? "bg-accent" : "bg-line group-hover:bg-muted/50",
                  )}
                />
              </button>
            );
          })}
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {`Slide ${index + 1} of ${count}`}
      </p>
    </section>
  );
}
