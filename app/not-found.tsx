import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/PageHero";
import { CRUMB_ROOT, routes } from "@/data/site";
import { BTN_ACCENT, BTN_OUTLINE, CONTAINER } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/** Rendered inside the root layout, so the header and footer come from there. */
export default function NotFound() {
  return (
    <>
      <PageHero
        title="Nothing here"
        crumbs={[{ label: CRUMB_ROOT, href: routes.home }, { label: "404" }]}
      />
      <section className="bg-canvas py-16 md:py-24">
        <div className={CONTAINER}>
          <p className="font-body text-lead text-body max-w-[46ch] text-pretty">
            That page has either moved or never existed. The show, and every
            episode, is a click away.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={routes.home} className={BTN_ACCENT}>
              Back to the show
            </Link>
            <Link href={routes.podcast} className={BTN_OUTLINE}>
              Browse episodes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
