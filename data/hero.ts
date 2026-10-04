import type { HeroImage } from "@/types";

/**
 * Hero banner slides — full-bleed 1920x1080 artwork with the show's title,
 * guest name and pull quote already designed into the image. The component
 * only handles the sliding; it renders nothing of its own on top.
 *
 * Order here is display order. To add, remove or rearrange slides, edit only
 * this array — the slider adapts to however many entries it finds.
 */
export const heroSlides: HeroImage[] = [
  {
    id: "hero-01",
    src: "https://contetra.b-cdn.net/CFO%20Podcast/Hero%2001.png",
    alt: 'CFOs Not Talking Finance, with CA Chitra Parameswaran: "My job? Get CFOs to forget the camera is on."',
  },
  {
    id: "hero-02",
    src: "https://contetra.b-cdn.net/CFO%20Podcast/Hero%2002.png",
    alt: 'CFOs Not Talking Finance, with CA Akash Binoy Sengupta, Head of Finance, HR & IT at Blue Tribe Foods: "Jitna mila hai utani meri Aukat nahi hai!"',
  },
];

/** Auto-advance interval, in ms. */
export const HERO_SLIDE_DURATION_MS = 6000;
