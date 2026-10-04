"use client";

import { useEffect, useRef } from "react";

import {
  AUDIO_SRC,
  readStoredMuted,
  registerAudioController,
  setAudioState,
  START_DELAY_MS,
  START_TIME_CONSTANT,
  TARGET_GAIN,
  TOGGLE_TIME_CONSTANT,
} from "@/lib/audio";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** setTargetAtTime is exponential and lands at ~95% after three time
 *  constants. Pausing the element before then would clip the tail, so the pause
 *  waits this long — derived from the constant rather than guessed. */
const TOGGLE_FADE_MS = Math.round(TOGGLE_TIME_CONSTANT * 3 * 1000) + 50;

type LegacyWindow = Window & { webkitAudioContext?: typeof AudioContext };

/**
 * Builds the audio graph around an existing <audio> element, registers a
 * controller for the header's toggle, and returns the teardown.
 *
 * Kept out of the component so the element arrives as a non-null parameter and
 * the whole thing runs in one effect with no dependencies — the AudioContext and
 * its MediaElementSource can each only be created once per element, so this must
 * never be torn down and rebuilt on a re-render.
 *
 * @param isReduced read at the moment of each decision, not captured once: the
 *   media query result can land after this has already been set up.
 */
function createAmbientBed(
  el: HTMLAudioElement,
  isReduced: () => boolean,
): () => void {
  let ctx: AudioContext | null = null;
  let gain: GainNode | null = null;
  let source: MediaElementAudioSourceNode | null = null;
  let startTimer: number | undefined;
  let pauseTimer: number | undefined;
  let releaseGesture: (() => void) | null = null;
  /** The state the graph is trying to hold, not what it managed to do. */
  let wantsSound = false;
  let pausedByVisibility = false;
  let disposed = false;

  function buildGraph(): { context: AudioContext; gainNode: GainNode } | null {
    if (ctx && gain) return { context: ctx, gainNode: gain };

    const Ctor =
      window.AudioContext ?? (window as LegacyWindow).webkitAudioContext;
    if (!Ctor) return null;

    const context = new Ctor();
    const gainNode = context.createGain();
    // The one and only direct assignment, made before any audio has run. Every
    // change after this point is a ramp, because steps click.
    gainNode.gain.value = 0;
    const mediaSource = context.createMediaElementSource(el);
    mediaSource.connect(gainNode);
    gainNode.connect(context.destination);

    ctx = context;
    gain = gainNode;
    source = mediaSource;
    return { context, gainNode };
  }

  function rampTo(target: number, timeConstant: number) {
    if (!ctx || !gain) return;
    const param = gain.gain;
    const now = ctx.currentTime;
    param.cancelScheduledValues(now);
    // Anchor at wherever the ramp currently is, then glide from there.
    param.setValueAtTime(param.value, now);
    param.setTargetAtTime(target, now, timeConstant);
  }

  function clearPauseTimer() {
    if (pauseTimer !== undefined) {
      window.clearTimeout(pauseTimer);
      pauseTimer = undefined;
    }
  }

  async function startPlayback(timeConstant: number): Promise<boolean> {
    if (disposed) return false;

    const graph = buildGraph();
    if (!graph) return false;
    const { context } = graph;

    clearPauseTimer();

    try {
      await el.play();
    } catch {
      // Blocked. Expected, and not an error worth reporting.
      return false;
    }
    if (disposed) return false;

    if (context.state !== "running") {
      try {
        await context.resume();
      } catch {
        /* still blocked — the state check below handles it */
      }
    }
    if (disposed) return false;

    if (context.state !== "running") {
      el.pause();
      return false;
    }

    rampTo(TARGET_GAIN, timeConstant);
    wantsSound = true;
    setAudioState({ muted: false, playing: true });
    return true;
  }

  /** One-shot: the first pointer or key event anywhere starts the bed, then
   *  both listeners remove themselves. */
  function armFirstGesture() {
    if (releaseGesture || disposed) return;

    const release = () => {
      document.removeEventListener("pointerdown", onGesture);
      document.removeEventListener("keydown", onGesture);
      releaseGesture = null;
    };

    const onGesture = () => {
      release();
      if (disposed || isReduced()) return;
      if (readStoredMuted() === true) return;
      void startPlayback(START_TIME_CONSTANT);
    };

    releaseGesture = release;
    document.addEventListener("pointerdown", onGesture, { once: true });
    document.addEventListener("keydown", onGesture, { once: true });
  }

  async function attemptAutoStart() {
    if (disposed) return;
    // Never under reduced motion, and never against a stored preference.
    if (isReduced()) return;
    if (readStoredMuted() === true) return;

    const started = await startPlayback(START_TIME_CONSTANT);
    if (!started && !disposed) armFirstGesture();
  }

  async function setMuted(muted: boolean): Promise<void> {
    if (disposed) return;

    if (muted) {
      wantsSound = false;
      // A pending "start on the first click" is no longer wanted.
      releaseGesture?.();

      if (!ctx || !gain) {
        setAudioState({ muted: true, playing: false });
        return;
      }

      rampTo(0, TOGGLE_TIME_CONSTANT);
      setAudioState({ muted: true });
      clearPauseTimer();
      pauseTimer = window.setTimeout(() => {
        pauseTimer = undefined;
        if (disposed || wantsSound) return;
        el.pause();
        setAudioState({ playing: false });
      }, TOGGLE_FADE_MS);
      return;
    }

    // Pressing the toggle is an explicit request, so this path ignores reduced
    // motion — it is the visitor asking, not the site deciding.
    const started = await startPlayback(TOGGLE_TIME_CONSTANT);
    if (!started && !disposed) setAudioState({ muted: true, playing: false });
  }

  function onVisibilityChange() {
    if (disposed) return;

    if (document.visibilityState === "hidden") {
      if (el.paused) return;
      pausedByVisibility = true;
      rampTo(0, TOGGLE_TIME_CONSTANT);
      el.pause();
      setAudioState({ playing: false });
      return;
    }

    // Resume only if it was actually running when the tab went away.
    if (!pausedByVisibility) return;
    pausedByVisibility = false;
    if (!wantsSound) return;

    void el
      .play()
      .then(() => {
        if (disposed) return;
        rampTo(TARGET_GAIN, TOGGLE_TIME_CONSTANT);
        setAudioState({ playing: true });
      })
      .catch(() => {
        if (!disposed) setAudioState({ playing: false });
      });
  }

  function scheduleAutoStart() {
    startTimer = window.setTimeout(() => {
      startTimer = undefined;
      void attemptAutoStart();
    }, START_DELAY_MS);
  }

  const onLoad = () => scheduleAutoStart();

  registerAudioController({ setMuted });
  document.addEventListener("visibilitychange", onVisibilityChange);

  if (!isReduced() && readStoredMuted() !== true) {
    if (document.readyState === "complete") scheduleAutoStart();
    else window.addEventListener("load", onLoad, { once: true });
  }

  return () => {
    disposed = true;
    registerAudioController(null);
    window.removeEventListener("load", onLoad);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    releaseGesture?.();
    if (startTimer !== undefined) window.clearTimeout(startTimer);
    clearPauseTimer();
    el.pause();
    setAudioState({ playing: false });
    source?.disconnect();
    gain?.disconnect();
    if (ctx) void ctx.close().catch(() => {});
    ctx = null;
    gain = null;
    source = null;
  };
}

/**
 * The ambient bed. Mounted once in the layout, it owns the AudioContext and
 * hands a controller to lib/audio so the header's SoundToggle can drive it
 * across client-side navigations.
 *
 * It asks for nothing: no modal, no overlay, no "enable sound?" prompt. It tries
 * once, very quietly, three seconds after the page has finished loading. If the
 * browser refuses — the normal outcome, not an error — it waits for the first
 * real interaction instead. It never tries at all under reduced motion, or if
 * the visitor has turned sound off on a previous visit.
 */
export default function AmbientAudio() {
  const reduced = useReducedMotion();
  const reducedRef = useRef(reduced);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // The setup effect reads this ref rather than a captured value, so a media
  // query result that only lands at hydration still gates the first playback
  // attempt three seconds later.
  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    return createAmbientBed(el, () => reducedRef.current);
  }, []);

  return (
    <audio
      ref={audioRef}
      src={AUDIO_SRC}
      crossOrigin="anonymous"
      loop
      preload="none"
      aria-hidden="true"
      className="sr-only"
    />
  );
}
