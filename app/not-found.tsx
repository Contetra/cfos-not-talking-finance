import type { Metadata } from "next";
import Link from "next/link";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { routes } from "@/data/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-ink flex min-h-[80svh] items-center text-white">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:pr-14 lg:pl-28">
            <div className="max-w-2xl">
              <p className="text-amber font-display text-h2">404</p>
              <h1 className="text-display font-display mt-4 text-white">
                Nothing here
              </h1>
              <p className="prose-measure text-body mt-6 text-white/70">
                That page has either moved or never existed. The show, and
                everything else, is back on the home page.
              </p>
              <Link
                href={routes.home}
                className="bg-amber text-ink hover:bg-amber-2 font-display text-h3 mt-10 inline-block px-8 py-4 transition-colors duration-200"
              >
                Back to the show
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
