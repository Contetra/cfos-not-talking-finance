import { comingSoonCopy } from "@/data/site";
import ComingSoon from "@/components/ComingSoon";

export default function SpecialGuestsComingSoon() {
  const copy = comingSoonCopy["special-guests"];
  return <ComingSoon title={copy.title} line={copy.line} />;
}
