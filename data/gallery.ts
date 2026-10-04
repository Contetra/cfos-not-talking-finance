import type { GalleryItem } from "@/types";
import { PLACEHOLDER_IMAGE } from "./site";

/** Heading for the gallery section. */
export const galleryIntro = {
  title: "From the room",
  line: "Stills and offcuts from the shoots.",
};

/**
 * Mixed-media reel. Each item advances after its OWN durationMs, so a 3s GIF
 * and a 20s clip can sit in the same reel and the progress bar stays an honest
 * map of it.
 *
 * Five seed entries covering all three types. The two video entries point at
 * URLs that do not exist yet, which exercises the metadata-failure path: the
 * reel falls back to durationMs and keeps advancing. Replace the src values
 * and the mechanics switch to the real media duration.
 */
export const gallery: GalleryItem[] = [
  {
    id: "studio-wide",
    type: "image",
    // TODO(asset): wide shot of the Mumbai studio mid-record, 16:9.
    src: PLACEHOLDER_IMAGE,
    alt: "The Mumbai studio during a recording, three cameras set around the table.",
    durationMs: 5000,
  },
  {
    id: "guest-answer",
    type: "video",
    // TODO(asset): 20s clip of a guest answering — plays to its own end.
    src: "https://contetra.b-cdn.net/CFO%20Podcast/gallery/guest-answer.mp4",
    poster: PLACEHOLDER_IMAGE,
    alt: "A guest mid-answer, leaning forward at the table.",
    durationMs: 20000,
    useMediaDuration: true,
  },
  {
    id: "headphones-loop",
    type: "gif",
    // TODO(asset): 3s loop — headphones being handed across the table.
    src: "https://contetra.b-cdn.net/CFO%20Podcast/gallery/headphones.gif",
    alt: "Headphones passed across the table before a take.",
    durationMs: 3000,
  },
  {
    id: "control-desk",
    type: "image",
    // TODO(asset): detail of the control desk / audio interface, 16:9.
    src: PLACEHOLDER_IMAGE,
    alt: "The control desk, levels up, during a take.",
    durationMs: 4000,
  },
  {
    id: "off-camera",
    type: "video",
    // TODO(asset): 8s off-camera clip — fixed dwell, not media duration.
    src: "https://contetra.b-cdn.net/CFO%20Podcast/gallery/off-camera.mp4",
    poster: PLACEHOLDER_IMAGE,
    alt: "Host and guest talking after the mics come down.",
    durationMs: 8000,
  },
];

/** Used when an item omits durationMs. */
export const DEFAULT_GALLERY_DURATION_MS = 5000;
