import Image from "next/image";
import Link from "next/link";

import { joinCta, joinPage, PLACEHOLDER_IMAGE } from "@/data/site";
import { cn } from "@/lib/cn";
import { BTN_ACCENT, CONTAINER } from "@/lib/ui";

/**
 * The conversion teaser: photo left, the ask right. No full-bleed image, no
 * scrim, no centred stack — the photograph is a contained object on the page
 * like everything else.
 */
export default function JoinUsCta() {
  return (
    <section id="join" className="bg-canvas section">
      <div className={cn(CONTAINER, "grid grid-cols-12 items-center gap-x-8 gap-y-10")}>
        <div className="col-span-12 lg:col-span-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
            {/* TODO(asset): photo of the podcast room, 16:10 crop. */}
            <Image
              src={PLACEHOLDER_IMAGE}
              alt="The podcast room set up for a recording."
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <h2 className="font-display text-h2 text-primary max-w-[22ch] font-bold text-balance">
            {joinPage.title}
          </h2>
          <p className="font-body text-copy text-body mt-6 max-w-[42ch] text-pretty">
            {joinCta.line}
          </p>
          <Link href={joinCta.href} className={cn(BTN_ACCENT, "mt-8")}>
            {joinCta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
