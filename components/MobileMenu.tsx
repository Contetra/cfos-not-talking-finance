"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { joinCta, routes, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { BTN_ACCENT, TRANSITION } from "@/lib/ui";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { SocialMark } from "./SocialMarks";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Per-item reveal offset, in seconds. */
const STAGGER = 0.04;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DESKTOP_QUERY = "(min-width: 1024px)";

function isActive(pathname: string, href: string) {
  // "/" prefixes every route, so home only matches exactly.
  if (href === routes.home) {
    return pathname === routes.home;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileMenu() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const panelId = useId();

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  // Close whenever the route changes — the overlay covers the page it just
  // navigated to otherwise.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Hand focus back to the trigger on close, but only if we were the ones who
  // took it away.
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  // Lock the page behind the overlay, remembering whatever was there before.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Move focus into the panel once it exists.
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      firstLinkRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  // Escape closes; Tab cycles between the trigger and everything in the panel.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const nodes: HTMLElement[] = [];
      if (triggerRef.current) nodes.push(triggerRef.current);
      nodes.push(...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      if (event.shiftKey) {
        if (!active || active === first || !nodes.includes(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }
      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // If the viewport grows past the breakpoint the overlay is hidden by CSS, so
  // drop the open state with it rather than leaving the body locked.
  useEffect(() => {
    if (!open || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (mql.matches) setOpen(false);
    };
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "text-primary hover:bg-surface relative z-50 -mr-2 inline-flex size-11 items-center justify-center rounded-full",
          TRANSITION,
        )}
      >
        {open ? (
          <X className="size-6" strokeWidth={1.6} aria-hidden="true" />
        ) : (
          <Menu className="size-6" strokeWidth={1.6} aria-hidden="true" />
        )}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={site.name}
            data-lenis-prevent
            initial={reducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: reducedMotion ? 0 : "100%" }}
            transition={{ duration: reducedMotion ? 0 : 0.42, ease: EASE }}
            className="bg-canvas fixed inset-0 z-40 flex flex-col overflow-y-auto"
          >
            <nav
              aria-label="Primary"
              className="flex flex-1 flex-col justify-center px-6 pt-28 pb-10 md:px-10"
            >
              <ul className="flex flex-col gap-1">
                {site.nav.map((item, index) => {
                  const active = isActive(pathname, item.href);

                  return (
                    <motion.li
                      key={item.href}
                      initial={reducedMotion ? false : { opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.34,
                        ease: EASE,
                        delay: reducedMotion ? 0 : 0.12 + index * STAGGER,
                      }}
                    >
                      <Link
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "font-display text-h2 inline-flex items-start gap-2 py-2 font-bold",
                          TRANSITION,
                          active ? "text-primary" : "text-body hover:text-primary",
                        )}
                      >
                        <span
                          className={cn(
                            "border-b-2 pb-1",
                            active ? "border-accent" : "border-transparent",
                          )}
                        >
                          {item.label}
                        </span>
                        {item.comingSoon ? (
                          <>
                            <span
                              aria-hidden="true"
                              className="bg-accent mt-2 block size-[5px] shrink-0 rounded-full"
                            />
                            <span className="sr-only"> (coming soon)</span>
                          </>
                        ) : null}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              {/* The header CTA is hidden on the narrowest screens, so the menu
                  carries it instead — the conversion is never more than one tap
                  away. */}
              <Link
                href={joinCta.href}
                onClick={() => setOpen(false)}
                className={cn(BTN_ACCENT, "mt-10 w-full")}
              >
                {joinCta.button}
              </Link>
            </nav>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: reducedMotion ? 0 : 0.34,
                ease: EASE,
                delay: reducedMotion ? 0 : 0.12 + site.nav.length * STAGGER,
              }}
              className="border-line border-t px-6 py-6 md:px-10"
            >
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {site.socials.map((social) => (
                  <li key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-label text-muted hover:text-primary group inline-flex items-center gap-2",
                        TRANSITION,
                      )}
                    >
                      <SocialMark
                        platform={social.platform}
                        className={cn(
                          "text-muted group-hover:text-primary size-5 shrink-0",
                          TRANSITION,
                        )}
                      />
                      {social.name}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
