"use client";

import { Volume2, VolumeX } from "lucide-react";

import { requestMuted, useAudioState } from "@/lib/audio";
import { cn } from "@/lib/cn";
import { TRANSITION } from "@/lib/ui";

type SoundToggleProps = {
  className?: string;
};

/**
 * The stop control for the ambient bed.
 *
 * This is an accessibility requirement rather than a feature: audio that can run
 * for more than three seconds needs a visible, always-operable way to stop it.
 * So the button renders unconditionally — including under reduced motion, where
 * the bed never starts on its own and pressing this is an explicit request for
 * sound.
 */
export default function SoundToggle({ className }: SoundToggleProps) {
  const { muted, playing } = useAudioState();
  /** Audible right now — the label has to describe the audio, not the intent. */
  const on = playing && !muted;

  return (
    <button
      type="button"
      onClick={() => {
        void requestMuted(on);
      }}
      aria-pressed={on}
      aria-label={on ? "Turn sound off" : "Turn sound on"}
      className={cn(
        // An accent-coloured glyph on white is 2.0:1 and fails the 3:1
        // non-text floor, so the accent arrives as a fill with the glyph
        // knocked out in primary instead.
        "text-primary hover:bg-accent hover:text-primary focus-visible:bg-accent inline-flex size-10 items-center justify-center rounded-full",
        TRANSITION,
        className,
      )}
    >
      {on ? (
        <Volume2 aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
      ) : (
        <VolumeX aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
      )}
    </button>
  );
}
