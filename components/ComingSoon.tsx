import Link from "next/link";

import { CRUMB_ROOT, routes } from "@/data/site";
import { cn } from "@/lib/cn";
import { BTN_OUTLINE, CONTAINER } from "@/lib/ui";
import PageHero from "./PageHero";
import Waveform from "./Waveform";

type ComingSoonProps = {
  title: string;
  line: string;
};

/** A route that exists but whose page has not shipped yet. */
export default function ComingSoon({ title, line }: ComingSoonProps) {
  return (
    <>
      <PageHero
        title={title}
        crumbs={[{ label: CRUMB_ROOT, href: routes.home }, { label: title }]}
      />
      <section className="bg-canvas py-16 md:py-24">
        <div className={CONTAINER}>
          <Waveform />
          <p className="font-body text-lead text-body mt-10 max-w-[46ch] text-pretty">
            {line}
          </p>
          <Link href={routes.home} className={cn(BTN_OUTLINE, "mt-10")}>
            Back to the show
          </Link>
        </div>
      </section>
    </>
  );
}
