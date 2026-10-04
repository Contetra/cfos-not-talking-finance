import { journey, journeyIntro } from "@/data/journey";
import { cn } from "@/lib/cn";
import { CONTAINER, MEASURE } from "@/lib/ui";
import JourneyStage from "./JourneyStage";

/**
 * Five stages, read left to right on desktop and top to bottom on mobile.
 *
 * The pinned horizontal scroll this replaced was heavy and fought the page —
 * it reserved five viewports of document height to show five short sentences.
 * A plain row says the same thing in one screen and costs nothing.
 */
export default function PodcastJourney() {
  return (
    <section id="journey" className="bg-canvas section">
      <div className={CONTAINER}>
        <h2 className={cn("font-display text-h2 text-primary font-bold text-balance", MEASURE.h2)}>
          {journeyIntro.title}
        </h2>
        <p className={cn("font-body text-lead text-body mt-6 text-pretty", MEASURE.lead)}>
          {journeyIntro.line}
        </p>

        {/* Desktop: one row of five. Each tile draws the rule back to the one
            before it, so the line always lands on the tiles' true centre. */}
        <div className="mt-12 hidden lg:mt-16 lg:block">
          <ol className="grid list-none grid-cols-5 gap-6">
            {journey.map((stage, i) => (
              <JourneyStage
                key={stage.id}
                stage={stage}
                variant="column"
                connector={i > 0}
              />
            ))}
          </ol>
        </div>

        {/* Mobile: a vertical run with the rule down the left. */}
        <div className="relative mt-12 lg:hidden">
          <span
            aria-hidden="true"
            className="bg-line absolute top-4 bottom-10 left-8 w-px"
          />
          <ol className="relative list-none">
            {journey.map((stage) => (
              <JourneyStage key={stage.id} stage={stage} variant="row" />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
