import type { Metadata } from "next";

import SpecialGuestsComingSoon from "./components/SpecialGuestsComingSoon";
import { comingSoonCopy, routes } from "@/data/site";

export const metadata: Metadata = {
  title: comingSoonCopy["special-guests"].title,
  description: comingSoonCopy["special-guests"].line,
  alternates: { canonical: routes.specialGuests },
  // REMOVE THIS when the real guest archive ships — it is here only so a
  // half-finished page does not reach search results.
  robots: { index: false, follow: true },
};

export default function SpecialGuestsPage() {
  return <SpecialGuestsComingSoon />;
}
