import type { Metadata } from "next";

import BlogsComingSoon from "./components/BlogsComingSoon";
import { comingSoonCopy, routes } from "@/data/site";

export const metadata: Metadata = {
  title: comingSoonCopy.blogs.title,
  description: comingSoonCopy.blogs.line,
  alternates: { canonical: routes.blogs },
  // REMOVE THIS when the real blog ships — it is here only so a half-finished
  // page does not reach search results.
  robots: { index: false, follow: true },
};

export default function BlogsPage() {
  return <BlogsComingSoon />;
}
