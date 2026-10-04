"use client";

import { useSyncExternalStore } from "react";

export const AUDIO_SRC =
  "https://contetra.b-cdn.net/CFO%20Podcast/Podcast%20music%20sample%201.mp3";

/**
 * Playback gain for the ambient bed.
 *
 *   TARGET_GAIN = 10 ** (-23 / 20) = 0.0708
 *
 * -23 dBFS is the figure to retune; the constant follows from it. Changing the
 * loudness means changing the dB number in that expression and nothing else.
 */
export const TARGET_GAIN = 10 ** (-23 / 20); // 0.0708...

export const MUTE_STORAGE_KEY = "cfo-audio-muted";

/** Ramp toward the target over ~1.5s. setTargetAtTime is exponential, so it
 *  lands at ~95% after 3 time constants. */
export const START_TIME_CONSTANT = 0.5;
/** ~400ms fade when the user toggles. */
export const TOGGLE_TIME_CONSTANT = 0.133;
/** Delay after window `load` before the first playback attempt. */
export const START_DELAY_MS = 3000;

export type AudioState = {
  /** The user's choice. Persisted; defaults to muted until audio actually runs. */
  muted: boolean;
  /** True when the bed is audible right now. */
  playing: boolean;
  /** True once an <audio> element and graph exist to talk to. */
  ready: boolean;
};

export type AudioController = {
  /** Resolve once the requested state has been applied (or refused). */
  setMuted: (muted: boolean) => Promise<void>;
};

/* -------------------------------------------------------------------------
   localStorage
------------------------------------------------------------------------- */

/** `true` only if the user has explicitly turned sound off before. Any storage
 *  failure (private mode, blocked cookies) reads as "no stored preference". */
export function readStoredMuted(): boolean | null {
  try {
    const raw = window.localStorage.getItem(MUTE_STORAGE_KEY);
    if (raw === null) return null;
    return raw === "true";
  } catch {
    return null;
  }
}

export function writeStoredMuted(muted: boolean): void {
  try {
    window.localStorage.setItem(MUTE_STORAGE_KEY, String(muted));
  } catch {
    /* storage unavailable — the session still works, the choice just won't persist */
  }
}

/* -------------------------------------------------------------------------
   Store

   AmbientAudio (mounted once, in the layout) owns the AudioContext and
   registers a controller here. SoundToggle (in the header) reads state and
   calls the controller. Neither imports the other, and no provider is needed,
   so the audio graph survives every client-side navigation.
------------------------------------------------------------------------- */

let state: AudioState = { muted: true, playing: false, ready: false };
let controller: AudioController | null = null;
const listeners = new Set<() => void>();

const SERVER_SNAPSHOT: AudioState = {
  muted: true,
  playing: false,
  ready: false,
};

function emit() {
  for (const l of listeners) l();
}

export function subscribeAudio(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getAudioState(): AudioState {
  return state;
}

function getServerAudioState(): AudioState {
  return SERVER_SNAPSHOT;
}

export function setAudioState(patch: Partial<AudioState>) {
  const next = { ...state, ...patch };
  if (
    next.muted === state.muted &&
    next.playing === state.playing &&
    next.ready === state.ready
  ) {
    return;
  }
  state = next;
  emit();
}

export function registerAudioController(next: AudioController | null) {
  controller = next;
  setAudioState({ ready: next !== null });
}

/** Ask the audio graph to change state. No-op until AmbientAudio has mounted. */
export async function requestMuted(muted: boolean): Promise<void> {
  writeStoredMuted(muted);
  if (!controller) {
    setAudioState({ muted });
    return;
  }
  await controller.setMuted(muted);
}

export function useAudioState(): AudioState {
  return useSyncExternalStore(
    subscribeAudio,
    getAudioState,
    getServerAudioState,
  );
}
