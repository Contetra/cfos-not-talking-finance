import Image from "next/image";

import type { Guest } from "@/types";

type HeroSlideProps = {
  guest: Guest;
  /** Only the slide on screen at first paint gets priority. */
  priority?: boolean;
};

/**
 * One guest's portrait. No scrim, no duotone, no logo behind it — on a white
 * canvas the photograph is the only thing carrying colour in this section, so
 * it is shown plainly.
 */
export default function HeroSlide({ guest, priority = false }: HeroSlideProps) {
  return (
    <Image
      src={guest.image}
      alt={`${guest.name}, ${guest.designation} at ${guest.organisation}`}
      fill
      sizes="(min-width: 1024px) 40vw, 100vw"
      priority={priority}
      className="object-cover"
    />
  );
}
