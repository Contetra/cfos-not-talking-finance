import { comingSoonCopy } from "@/data/site";
import ComingSoon from "@/components/ComingSoon";

export default function ContactComingSoon() {
  const copy = comingSoonCopy["contact-us"];
  return <ComingSoon title={copy.title} line={copy.line} />;
}
