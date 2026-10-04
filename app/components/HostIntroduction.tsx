import Image from "next/image";

import { host } from "@/data/team";
import { cn } from "@/lib/cn";
import { CONTAINER } from "@/lib/ui";

/**
 * Photo in columns 1–5, text in 7–12, one empty column between. The accent
 * block behind the portrait is a single flat shape offset down and left — no
 * shadow, no gradient, no border.
 */
export default function HostIntroduction() {
  return (
    <section id="host" className="bg-surface section">
      <div className={cn(CONTAINER, "grid grid-cols-12 gap-x-8 gap-y-12")}>
        <div className="col-span-12 lg:col-span-5">
          <div className="relative w-full max-w-[420px] lg:max-w-none">
            <div
              aria-hidden="true"
              className="bg-accent absolute -bottom-5 -left-5 hidden h-full w-full rounded-2xl lg:block"
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src={host.image}
                alt={`${host.name}, ${host.role} at ${host.organisation}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <h2 className="font-display text-h2 text-primary max-w-[22ch] font-bold text-balance">
            {host.name}
          </h2>
          {/* Hardcoded, not text-muted: a leftover shadcn `--color-muted`
              declaration in globals.css shadows the design system's own
              #6e6b88 with a near-white value, which made this line render
              invisible on the surface ground. Scoped here rather than fixed
              at the token, which would touch every other `text-muted` use
              on the site. */}
          <p className="font-body text-label mt-3 max-w-[46ch] text-[#6e6b88] text-pretty">
            {host.role}, {host.organisation}
          </p>

          {/* DRAFT COPY — Chitra to approve */}
          <div className="mt-8 space-y-4">
            {host.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="font-body text-copy text-body max-w-[46ch] text-pretty"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
