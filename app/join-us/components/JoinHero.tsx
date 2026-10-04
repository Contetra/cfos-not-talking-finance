"use client";

import Image from "next/image";

import { joinPage, PLACEHOLDER_IMAGE } from "@/data/site";
import { cn } from "@/lib/cn";
import { BTN_ACCENT, CONTAINER } from "@/lib/ui";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** The form's first control. The cue moves focus here, not just the scroll. */
const FIRST_FIELD_ID = "firstName";

/**
 * The photo carries no text. The heading sits in a white card overlapping the
 * image's bottom edge, so nothing has to be legible over photography and no
 * scrim is needed.
 */
export default function JoinHero() {
  const reduced = useReducedMotion();

  const goToForm = () => {
    document.getElementById("join-form")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    const field = document.getElementById(FIRST_FIELD_ID);
    if (field instanceof HTMLElement) field.focus({ preventScroll: true });
  };

  return (
    <section id="join-hero" className="bg-canvas pb-16 md:pb-24">
      <div className="relative h-[70svh] w-full overflow-hidden rounded-b-3xl">
        {/* TODO(asset): photo of the podcast room, tall crop. */}
        <Image
          src={PLACEHOLDER_IMAGE}
          alt="The podcast room set up for a recording."
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className={CONTAINER}>
        <div className="bg-canvas border-line relative -mt-16 max-w-[720px] rounded-2xl border p-8 md:-mt-20 md:p-12">
          <h1 className="font-display text-h2 text-primary max-w-[16ch] font-extrabold text-balance">
            {joinPage.title}
          </h1>
          <p className="font-body text-lead text-body mt-5 max-w-[46ch] text-pretty">
            {joinPage.line}
          </p>
          <button type="button" onClick={goToForm} className={cn(BTN_ACCENT, "mt-8")}>
            {joinPage.scrollCue}
          </button>
        </div>
      </div>
    </section>
  );
}
