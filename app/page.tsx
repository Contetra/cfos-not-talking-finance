import type { Metadata } from "next";

import homeStyles from "./components/home/home.module.css";
import HomeAbout from "./components/home/HomeAbout";
import HomeFeatured from "./components/home/HomeFeatured";
import HomeHero from "./components/home/HomeHero";
import HomeHost from "./components/home/HomeHost";
import HomeProcess from "./components/home/HomeProcess";
import HomeTeam from "./components/home/HomeTeam";
import LatestBlogs from "@/components/LatestBlogs";
import { routes, site } from "@/data/site";
import { host } from "@/data/team";

export const metadata: Metadata = {
  // Uses the layout's title template: "… — CFOs Not Talking Finance".
  title: {
    absolute: `${site.name} — ${site.tagline}`,
  },
  description: site.description,
  alternates: { canonical: routes.home },
};

export default function HomePage() {
  const sameAs = site.socials.map((s) => s.url);

  const podcastLd = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: site.name,
    description: site.description,
    url: new URL(routes.home, site.url).toString(),
    image: site.logo,
    inLanguage: "en-IN",
    sameAs,
    webFeed: site.socials.find((s) => s.platform === "spotify")?.url,
    producer: {
      "@type": "Organization",
      name: site.producer,
    },
  };

  const hostLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: host.name,
    jobTitle: host.role,
    worksFor: {
      "@type": "Organization",
      name: host.organisation,
    },
    url: new URL(routes.home, site.url).toString(),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(podcastLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hostLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* The landing design, top to bottom. Its faces are loaded in the root
          layout, since the header, page heroes and footer use them too. */}
      <div className={homeStyles.page}>
        <HomeHero />
        <HomeProcess />
        <HomeHost />
        <HomeAbout />
        <HomeFeatured />
        <HomeTeam />
        <LatestBlogs />
      </div>
    </>
  );
}
