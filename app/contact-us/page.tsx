import type { Metadata } from "next";

import ContactComingSoon from "./components/ContactComingSoon";
import { comingSoonCopy, routes } from "@/data/site";

export const metadata: Metadata = {
  title: comingSoonCopy["contact-us"].title,
  description: comingSoonCopy["contact-us"].line,
  alternates: { canonical: routes.contactUs },
  // REMOVE THIS when the real contact page ships — it is here only so a
  // half-finished page does not reach search results.
  robots: { index: false, follow: true },
};

export default function ContactUsPage() {
  return <ContactComingSoon />;
}
