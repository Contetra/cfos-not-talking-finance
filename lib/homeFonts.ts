import { Kalam, Libre_Franklin, Roboto } from "next/font/google";

/**
 * Faces used only by the homepage. They are called from the homepage's own
 * module, so Next preloads them on "/" and nowhere else.
 *
 * The landing design was drawn in CorelDRAW with desktop fonts. Where the
 * original is a Windows system face (Tahoma, Segoe UI, Corbel) the CSS names it
 * directly and lets other platforms fall back. Where it is not, a web font
 * stands in:
 *
 * - RelaxStudy (handwritten captions, labels, names) -> Kalam. Closest of ten
 *   handwriting faces compared, down to the hooked "v"; set at ~0.93x the
 *   design size, which is where its line lengths match. RelaxStudy's weight
 *   falls between Kalam's 400 and 700, so 400 is loaded and thickened with a
 *   hairline stroke (see `.hand` in home.module.css).
 * - Franklin Gothic Heavy (hero title) -> Libre Franklin Black, for every
 *   visitor, so the microphone lands on the same letter on every device. Sized
 *   to the design's line widths, not its point size: Libre Franklin runs ~15%
 *   wider.
 * - Roboto (the one subtitle the design sets in it) -> Roboto.
 */
export const handwriting = Kalam({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
});

export const heroDisplay = Libre_Franklin({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-hero",
  display: "swap",
});

export const homeRoboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto",
  display: "swap",
});
