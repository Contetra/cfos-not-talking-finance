import Image from "next/image";

import {
  supportedBy,
  supportedByCoda,
  supportedByIntro,
} from "@/data/team";
import { cn } from "@/lib/cn";
import { CONTAINER, MEASURE, TRANSITION } from "@/lib/ui";

/**
 * Seven items on one row — six people and the text-only coda, which sits in the
 * same rhythm so it reads as part of the group rather than a footnote.
 */
export default function SupportedBy() {
  return (
    <section id="supported-by" className="bg-canvas section">
      <div className={CONTAINER}>
        <h2 className="font-display text-h2 text-primary max-w-[22ch] font-bold text-balance">
          {supportedByIntro.title}
        </h2>
        <p
          className={cn(
            "font-body text-lead text-body mt-6 text-pretty",
            MEASURE.lead,
          )}
        >
          {supportedByIntro.line}
        </p>

        <ul className="mt-12 grid list-none grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-7">
          {supportedBy.map((person) => (
            <li key={person.id} className="group flex flex-col items-center text-center">
              <Image
                src={person.image}
                alt={person.name}
                width={120}
                height={120}
                className={cn(
                  "size-[120px] rounded-full object-cover opacity-90 grayscale",
                  "group-hover:opacity-100 group-hover:grayscale-0",
                  "group-focus-within:opacity-100 group-focus-within:grayscale-0",
                  "transition-[opacity,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                )}
              />
              <p className="font-body text-primary mt-4 text-[15px] leading-tight">
                {person.name}
              </p>
              <p className="font-body text-muted mt-1 text-[13px]">
                {person.role}
              </p>
            </li>
          ))}

          {/* No photo by design. Centred to the portraits so the row rhythm
              holds rather than collapsing to the top. */}
          <li className="flex flex-col items-center justify-center text-center">
            <p
              className={cn(
                "font-body text-primary flex h-[120px] items-center text-[15px] leading-tight text-balance italic",
                TRANSITION,
              )}
            >
              {supportedByCoda}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}
