import type { Metadata } from "next";

import grid from "@/components/CardGrid.module.css";
import ContentCard from "@/components/ContentCard";
import LatestBlogs from "@/components/LatestBlogs";
import PageHero from "@/components/PageHero";
import { listedEpisodes } from "@/data/episodes";
import { CRUMB_ROOT, episodePath, podcastPage, routes } from "@/data/site";
import { episodeImage } from "@/lib/media";

export const metadata: Metadata = {
  title: "Podcast",
  description: podcastPage.description,
  alternates: { canonical: routes.podcast },
};

/**
 * Every listed episode, newest first, each card opening that guest's page.
 * Episodes marked `listed: false` keep their page but are left off this grid.
 */
export default function PodcastPage() {
  return (
    <>
      <PageHero
        title={podcastPage.title}
        crumbs={[{ label: CRUMB_ROOT, href: routes.home }, { label: podcastPage.crumb }]}
      />

      {listedEpisodes.length > 0 ? (
        <ul className={grid.grid}>
          {listedEpisodes.map((episode, index) => (
            <li key={episode.slug}>
              <ContentCard
                href={episodePath(episode.slug)}
                image={episodeImage(episode)}
                title={episode.card.title}
                excerpt={episode.card.excerpt}
                priority={index < 3}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={grid.empty}>{podcastPage.empty}</p>
      )}

      <LatestBlogs />
    </>
  );
}
