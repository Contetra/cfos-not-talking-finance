import type { Guest } from "@/types";
import { PLACEHOLDER_IMAGE } from "./site";

/**
 * Hero slider guests. The show title and the word "with" are fixed across all
 * three slides — only the name and designation change.
 */
export const guests: Guest[] = [
  {
    id: "akash-binoy-sengupta",
    name: "CA Akash Binoy Sengupta",
    designation: "Head of Finance",
    organisation: "Blue Tribe Foods & Klaw Snacks",
    // TODO(asset): portrait of CA Akash Binoy Sengupta — landscape crop, subject
    // to the right of frame so the left-hand scrim does not cover the face.
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: "poomesh-mathew",
    name: "CA Poomesh Mathew",
    designation: "Head of Finance",
    organisation: "DP World Trade Finance",
    // TODO(asset): portrait of CA Poomesh Mathew — landscape crop, subject right.
    image: PLACEHOLDER_IMAGE,
  },
  {
    id: "sumit-jain",
    name: "CA Sumit Jain",
    designation: "CFO",
    organisation: "Kalki Fashion",
    // TODO(asset): portrait of CA Sumit Jain — landscape crop, subject right.
    image: PLACEHOLDER_IMAGE,
  },
];

/** Auto-advance interval, in ms. */
export const HERO_SLIDE_DURATION_MS = 6000;
