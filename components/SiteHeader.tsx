"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { joinCta, routes, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { BTN_ACCENT, CONTAINER, TRANSITION } from "@/lib/ui";
import MobileMenu from "./MobileMenu";
import SoundToggle from "./SoundToggle";

/** The colour logo is 263x242; 40px tall keeps that ratio exactly. */
const LOGO_HEIGHT = 40;
const LOGO_WIDTH = 43;

function isActive(pathname: string, href: string) {
  // "/" prefixes every route, so home only matches exactly.
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * White, sticky, hairline bottom border. The conversion lives here — a guest
 * can apply from any page without scrolling to find the way in.
 */
export default function SiteHeader() {
  const pathname = usePathname() ?? "";

  return (
    <header className="bg-canvas border-line sticky top-0 z-50 border-b">
      <div
        className={cn(
          CONTAINER,
          "flex h-16 items-center justify-between gap-6 lg:h-[76px]",
        )}
      >
        <Link href={routes.home} className="shrink-0">
          <Image
            src={site.logo}
            alt={site.name}
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-8 lg:flex"
        >
          {site.nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-body text-label relative py-1",
                  TRANSITION,
                  active ? "text-primary" : "text-body hover:text-primary",
                )}
              >
                {item.label}
                {item.comingSoon ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="bg-accent ml-1.5 inline-block size-[5px] rounded-full align-middle"
                    />
                    <span className="sr-only"> (coming soon)</span>
                  </>
                ) : null}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="bg-accent absolute -bottom-0.5 left-0 h-0.5 w-full"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <SoundToggle />
          <Link href={joinCta.href} className={cn(BTN_ACCENT, "hidden sm:inline-flex")}>
            {joinCta.button}
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
