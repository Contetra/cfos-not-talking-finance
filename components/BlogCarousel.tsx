"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./BlogCarousel.module.css";

export type BlogCarouselItem = {
  slug: string;
  href: string;
  title: string;
  image: string;
};

type BlogCarouselProps = {
  title: string;
  items: BlogCarouselItem[];
};

/**
 * A row of blog covers that scrolls sideways, with the design's round amber
 * arrows on either side. The row is a native scroller (swipe, trackpad and
 * keyboard all work); the arrows page it by one card and disappear when
 * everything already fits.
 */
export default function BlogCarousel({ title, items }: BlogCarouselProps) {
  const reduced = useReducedMotion();
  const headingId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ prev: false, next: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdges({ prev: track.scrollLeft > 2, next: track.scrollLeft < max - 2 });
    };

    // ResizeObserver reports once as soon as it starts observing, which takes
    // the first measurement too.
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    track.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", measure);
    };
  }, []);

  const page = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !(card instanceof HTMLElement)) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const scrollable = edges.prev || edges.next;

  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.inner}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>

        <div className={styles.rail}>
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={!edges.prev}
            hidden={!scrollable}
            aria-label="Previous posts"
            className={`${styles.arrow} ${styles.arrowPrev}`}
          >
            <ChevronLeft aria-hidden="true" strokeWidth={2.6} />
          </button>

          <ul ref={trackRef} className={styles.track}>
            {items.map((item) => (
              <li key={item.slug} className={styles.item}>
                <Link href={item.href} className={styles.card}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1200px) 370px, (min-width: 640px) 45vw, 80vw"
                    className={styles.image}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => page(1)}
            disabled={!edges.next}
            hidden={!scrollable}
            aria-label="Next posts"
            className={`${styles.arrow} ${styles.arrowNext}`}
          >
            <ChevronRight aria-hidden="true" strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </section>
  );
}
