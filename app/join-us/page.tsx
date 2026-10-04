import type { Metadata } from "next";

import GuestApplicationForm from "./components/GuestApplicationForm";
import JoinHero from "./components/JoinHero";
import { routes } from "@/data/site";

export const metadata: Metadata = {
  title: "Join us",
  description:
    "Apply to be a guest on CFOs Not Talking Finance. Tell us when you are free and whether you can get to the Mumbai studio, and we will take it from there.",
  alternates: { canonical: routes.joinUs },
};

export default function JoinUsPage() {
  return (
    <>
      <JoinHero />
      <GuestApplicationForm />
    </>
  );
}
