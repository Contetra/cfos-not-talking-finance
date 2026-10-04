import localFont from "next/font/local";

/**
 * Self-hosted from Fontshare.
 *
 * Cabinet Grotesk carries every heading — slightly condensed, high-contrast
 * weights, which reads as broadcast rather than as a SaaS landing page.
 * Switzer carries body and UI.
 */

export const cabinetGrotesk = localFont({
  variable: "--font-cabinet-grotesk",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
  src: [
    {
      path: "../public/fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

export const switzer = localFont({
  variable: "--font-switzer",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
  src: [
    { path: "../public/fonts/Switzer-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Switzer-Italic.woff2", weight: "400", style: "italic" },
    { path: "../public/fonts/Switzer-Medium.woff2", weight: "500", style: "normal" },
    {
      path: "../public/fonts/Switzer-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    { path: "../public/fonts/Switzer-Semibold.woff2", weight: "600", style: "normal" },
  ],
});
