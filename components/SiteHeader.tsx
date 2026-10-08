"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { joinCta, routes, site } from "@/data/site";
import { cn } from "@/lib/cn";
import MobileMenu from "./MobileMenu";
import styles from "./SiteHeader.module.css";
import SoundToggle from "./SoundToggle";

function isActive(pathname: string, href: string) {
  // "/" prefixes every route, so home only matches exactly.
  if (href === routes.home) return pathname === routes.home;
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * The navigation, laid over the top of whichever navy hero the page opens
 * with: logo on the left; Home, Podcast, Blog and the "Be Our Guest" button on
 * the right, as the redesign places them.
 *
 * It is positioned against the page, not inside each hero, so there is one
 * header in the markup and it stays outside <main>. Every page therefore has
 * to open with a navy hero (HomeHero or PageHero), which leaves room for it.
 */
export default function SiteHeader() {
  const pathname = usePathname() ?? "";

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href={routes.home} className={styles.logoLink}>
          <Image
            src={site.logoInverse}
            alt={`${site.name}, home`}
            width={892}
            height={818}
            priority
            sizes="(min-width: 1440px) 180px, (min-width: 1024px) 12.5vw, 84px"
            className={styles.logo}
          />
        </Link>

        <div className={styles.cluster}>
          <nav aria-label="Primary" className={styles.nav}>
            <ul className={styles.links}>
              {site.nav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(styles.link, active && styles.active)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <SoundToggle className={styles.sound} />

          <Link
            href={joinCta.href}
            aria-current={isActive(pathname, joinCta.href) ? "page" : undefined}
            className={styles.cta}
          >
            {joinCta.button}
          </Link>

          <MobileMenu
            isActive={(href) => isActive(pathname, href)}
            triggerClassName={styles.menuTrigger}
          />
        </div>
      </div>
    </header>
  );
}
