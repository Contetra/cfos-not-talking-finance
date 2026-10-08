import type { Metadata } from "next";

import GuestApplicationForm from "./components/GuestApplicationForm";
import PageHero from "@/components/PageHero";
import { CRUMB_ROOT, joinCta, joinPage, routes } from "@/data/site";

export const metadata: Metadata = {
  title: joinCta.button,
  description:
    "Apply to be a guest on CFOs Not Talking Finance. Tell us about yourself and whether you can get to the Mumbai studio, and we will take it from there.",
  alternates: { canonical: routes.joinUs },
};

export default function JoinUsPage() {
  return (
    <>
      <PageHero
        title={joinPage.title}
        crumbs={[{ label: CRUMB_ROOT, href: routes.home }, { label: joinCta.button }]}
      >
        <p>{joinPage.line}</p>
      </PageHero>
      <GuestApplicationForm />
    </>
  );
}
