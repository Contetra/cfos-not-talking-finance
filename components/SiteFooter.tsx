import Image from "next/image";
import Link from "next/link";

import { routes, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { CONTAINER, TRANSITION } from "@/lib/ui";
import { SocialMark } from "./SocialMarks";

/**
 * Light footer on surface, with a 2px accent rule along the top edge.
 * The year is computed at render — never hardcoded.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-accent border-t-2">
      <div className={cn(CONTAINER, "py-16 md:py-20")}>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <Link href={routes.home} className="inline-block">
              <Image
                src={site.logo}
                alt={site.name}
                width={43}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="font-body text-copy text-body mt-5 max-w-[34ch] text-pretty">
              {site.blurb}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="col-span-6 lg:col-span-3 lg:col-start-7"
          >
            <ul className="space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "font-body text-label text-body hover:text-primary",
                      TRANSITION,
                    )}
                  >
                    {item.label}
                    {item.comingSoon ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="bg-accent ml-2 inline-block size-[5px] rounded-full align-middle"
                        />
                        <span className="sr-only"> (coming soon)</span>
                      </>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 lg:col-span-3">
            <ul className="space-y-3">
              {site.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "font-body text-label text-body hover:text-primary group inline-flex items-center gap-2.5",
                      TRANSITION,
                    )}
                  >
                    <SocialMark
                      platform={social.platform}
                      className={cn(
                        "text-muted group-hover:text-primary size-[18px] shrink-0",
                        TRANSITION,
                      )}
                    />
                    <span>
                      {social.name}
                      <span className="text-muted"> @{social.handle}</span>
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-line mt-14 border-t pt-6">
          <p className="font-body text-muted max-w-[64ch] text-[13px] text-pretty">
            © {year} {site.producer}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
