"use client";

import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";

import { joinCta, routes, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { getLenis } from "./SmoothScrollProvider";
import { SocialMark } from "./SocialMarks";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Per-item reveal offset, in seconds. */
const STAGGER = 0.04;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DESKTOP_QUERY = "(min-width: 1024px)";

/** True on the client, false while rendering on the server. */
const noopSubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

type MobileMenuProps = {
  isActive: (href: string) => boolean;
  triggerClassName?: string;
};

/**
 * The full-screen menu below desktop widths.
 *
 * The panel is portalled to <body>. The header it is opened from is a size
 * container, and a size container is the containing block for anything
 * position: fixed inside it, so an in-place panel would be pinned to the
 * header rather than the viewport. The panel therefore carries its own logo
 * and close button.
 */
export default function MobileMenu({ isActive, triggerClassName }: MobileMenuProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const isClient = useIsClient();
  const panelId = useId();

  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Close whenever the route changes, by comparing during render rather than
  // in an effect, so the stale overlay never paints over the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Hand focus back to the trigger on close, but only if we took it away.
  useEffect(() => {
    if (wasOpen.current && !open) {
      triggerRef.current?.focus();
    }
    wasOpen.current = open;
  }, [open]);

  // Lock the page behind the overlay: both the native scroll and Lenis.
  useEffect(() => {
    if (!open) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    const lenis = getLenis();
    lenis?.stop();
    return () => {
      body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [open]);

  // Move focus into the panel once it exists.
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      closeRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  // Escape closes; Tab cycles within the panel.
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
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
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
      if (active === last || !active || !nodes.includes(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // If the viewport grows past the breakpoint the trigger disappears, so drop
  // the open state with it rather than leaving the page locked.
  useEffect(() => {
    if (!open || typeof window.matchMedia !== "function") return;
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      if (mql.matches) setOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [open]);

  const items = [...site.nav, { label: joinCta.button, href: joinCta.href }];

  const panel = (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          data-lenis-prevent
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: reducedMotion ? 1 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: EASE }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-[var(--hp-navy)] text-white"
        >
          <div className="flex items-start justify-between px-[18px] pt-[26px]">
            <Link href={routes.home} onClick={() => setOpen(false)} className="block w-[84px]">
              <Image
                src={site.logoInverse}
                alt={`${site.name}, home`}
                width={892}
                height={818}
                sizes="84px"
                className="h-auto w-full"
              />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <X className="size-6" strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Primary" className="flex flex-1 flex-col justify-center px-6 pb-10 md:px-10">
            <ul className="flex flex-col gap-2">
              {items.map((item, index) => {
                const active = isActive(item.href);
                const isCta = item.href === joinCta.href;
                return (
                  <motion.li
                    key={item.href}
                    initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.32,
                      ease: EASE,
                      delay: reducedMotion ? 0 : 0.08 + index * STAGGER,
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "inline-flex py-2 font-[family-name:var(--hp-font-hero)] text-[2.25rem] leading-tight transition-colors",
                        isCta
                          ? "mt-6 rounded-full bg-[var(--hp-orange)] px-7 py-3 text-[1.25rem] text-[var(--hp-navy)] hover:bg-[var(--hp-orange-hover)]"
                          : "text-white hover:text-[var(--hp-yellow)]",
                        active && !isCta && "underline decoration-[var(--hp-orange)] decoration-2 underline-offset-8",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-white/15 px-6 py-6 md:px-10">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {site.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.875rem] text-white/80 transition-colors hover:text-white"
                  >
                    <SocialMark platform={social.platform} className="size-5 shrink-0" />
                    {social.name}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className={cn(
          "size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10",
          triggerClassName,
        )}
      >
        <Menu className="size-6" strokeWidth={1.8} aria-hidden="true" />
      </button>
      {isClient ? createPortal(panel, document.body) : null}
    </>
  );
}
