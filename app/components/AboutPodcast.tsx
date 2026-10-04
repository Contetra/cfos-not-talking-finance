import { about } from "@/data/site";
import { cn } from "@/lib/cn";
import { CONTAINER } from "@/lib/ui";

/**
 * The premise, set as a pull-quote against an accent rule, with the supporting
 * text in two columns beneath. Nothing is boxed and nothing is centred.
 */
export default function AboutPodcast() {
  return (
    <section id="about" className="bg-canvas section">
      <div className={CONTAINER}>
        <h2 className="sr-only">About the show</h2>

        <blockquote className="border-accent border-l-[3px] pl-4">
          <p className="font-display text-quote text-primary max-w-[20ch] font-bold text-balance">
            {about.lead}
          </p>
        </blockquote>

        <div className="mt-12 grid gap-x-8 gap-y-4 md:grid-cols-2">
          {about.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className={cn(
                "font-body text-copy text-body max-w-[58ch] text-pretty",
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
