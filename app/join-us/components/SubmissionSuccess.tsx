import Link from "next/link";

import { joinPage, routes } from "@/data/site";

type SubmissionSuccessProps = {
  firstName?: string;
};

/**
 * Replaces the form outright — not a toast. Says what happens next and roughly
 * when, so nobody is left wondering whether it sent.
 */
export default function SubmissionSuccess({
  firstName,
}: SubmissionSuccessProps) {
  return (
    <div role="status" className="border-accent border-l-[3px] pl-5">
      <h2 className="font-display text-h2 text-primary max-w-[22ch] font-bold text-balance">
        {firstName
          ? `Thank you, ${firstName}.`
          : joinPage.success.title}
      </h2>
      <p className="font-body text-copy text-body mt-4 max-w-[46ch] text-pretty">
        {joinPage.success.line}
      </p>
      <Link
        href={routes.home}
        className="font-body text-label text-primary hover:border-accent border-line mt-8 inline-block border-b pb-1 transition-[color,border-color] duration-200"
      >
        Back to the show
      </Link>
    </div>
  );
}
