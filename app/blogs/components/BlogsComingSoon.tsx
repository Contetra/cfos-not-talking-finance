import { comingSoonCopy } from "@/data/site";
import ComingSoon from "@/components/ComingSoon";

export default function BlogsComingSoon() {
  const copy = comingSoonCopy.blogs;
  return <ComingSoon title={copy.title} line={copy.line} />;
}
