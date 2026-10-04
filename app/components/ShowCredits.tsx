import { credits } from "@/data/team";
import { CONTAINER } from "@/lib/ui";

/**
 * Closing credits, not cards: role on the left, names on the right, one
 * hairline per row and a shared baseline down the page.
 *
 * A <dl> carries the relationship — each role is the term, its people the
 * description.
 */
export default function ShowCredits() {
  return (
    <section id="credits" className="bg-surface section">
      <div className={CONTAINER}>
        <h2 className="font-display text-h2 text-primary max-w-[22ch] font-bold text-balance">
          Credits
        </h2>

        <dl className="mt-12 max-w-[900px]">
          {credits.map((credit) => (
            <div
              key={credit.id}
              className="border-line grid grid-cols-1 gap-1 border-t py-5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8"
            >
              <dt className="font-body text-label text-muted max-w-[22ch] text-pretty">
                {credit.role}
              </dt>
              <dd className="font-body text-copy text-primary">
                {credit.names.map((name) => (
                  <span key={name} className="block">
                    {name}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
