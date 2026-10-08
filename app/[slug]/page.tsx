import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AboutHost from "@/components/AboutHost";
import ArticleBody from "@/components/ArticleBody";
import LatestBlogs from "@/components/LatestBlogs";
import ListenCard from "@/components/ListenCard";
import PageHero from "@/components/PageHero";
import RecentPosts from "@/components/RecentPosts";
import YouTubePlayer from "@/components/YouTubePlayer";
import { episodes, getEpisode } from "@/data/episodes";
import { CRUMB_ROOT, episodePath, podcastPage, routes, site } from "@/data/site";
import { host } from "@/data/team";
import { episodeImage, resolveListenLinks, youtubeWatchUrl } from "@/lib/media";
import styles from "./page.module.css";

/**
 * THE GUEST PAGE TEMPLATE: cfosnottalkingfinance.com/<slug>.
 *
 * One page per entry in data/episodes/. Nothing here is specific to a guest;
 * to add a page, add a data file (see data/episodes/_template.ts).
 */

type EpisodePageProps = { params: Promise<{ slug: string }> };

// Only the slugs in data/episodes/ exist; anything else at the root is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return episodes.map((episode) => ({ slug: episode.slug }));
}

export async function generateMetadata({ params }: EpisodePageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) return {};

  const image = { url: episodeImage(episode), width: 1280, height: 720, alt: episode.videoTitle };
  return {
    title: { absolute: episode.pageTitle },
    description: episode.description,
    alternates: { canonical: episodePath(slug) },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_IN",
      url: episodePath(slug),
      title: episode.pageTitle,
      description: episode.description,
      publishedTime: episode.publishedAt,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: episode.pageTitle,
      description: episode.description,
      images: [image.url],
    },
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = getEpisode(slug);
  if (!episode) notFound();

  const watchUrl = youtubeWatchUrl(episode.youtubeId);
  // The YouTube button plays this episode, not the channel.
  const links = resolveListenLinks({ youtube: watchUrl, ...episode.listen });
  const pageUrl = new URL(episodePath(slug), site.url).toString();

  const episodeLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: episode.videoTitle,
    description: episode.description,
    url: pageUrl,
    datePublished: episode.publishedAt,
    partOfSeries: {
      "@type": "PodcastSeries",
      name: site.name,
      url: site.url,
    },
    associatedMedia: {
      "@type": "VideoObject",
      name: episode.videoTitle,
      description: episode.description,
      thumbnailUrl: episodeImage(episode),
      uploadDate: episode.publishedAt,
      embedUrl: `https://www.youtube.com/embed/${episode.youtubeId}`,
      url: watchUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(episodeLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        title={podcastPage.title}
        titleSuffix={`${episode.guest.name}, ${episode.guest.role}`}
        crumbs={[
          { label: CRUMB_ROOT, href: routes.home },
          { label: "Episode", href: routes.podcast },
          { label: episode.crumb },
        ]}
      />

      <div className={styles.layout}>
        <article className={styles.main}>
          <YouTubePlayer
            videoId={episode.youtubeId}
            title={episode.videoTitle}
            thumbnail={episodeImage(episode)}
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 92vw"
            priority
          />

          <ArticleBody sections={episode.body} className={styles.article} />

          <dl className={styles.credits}>
            <div>
              <dt>Hosted by:</dt>
              <dd>
                {host.name}, {host.role} at {host.organisation}
                <br />
                <a href={host.linkedin} target="_blank" rel="noopener noreferrer">
                  {host.linkedin}
                </a>
              </dd>
            </div>
            <div>
              <dt>Our Guest:</dt>
              <dd>
                {episode.guest.name}, {episode.guest.role}
                {episode.guest.linkedin ? (
                  <>
                    <br />
                    <a href={episode.guest.linkedin} target="_blank" rel="noopener noreferrer">
                      {episode.guest.linkedin}
                    </a>
                  </>
                ) : null}
              </dd>
            </div>
            <div>
              <dt>Watch now:</dt>
              <dd>
                <a href={watchUrl} target="_blank" rel="noopener noreferrer">
                  {watchUrl}
                </a>
              </dd>
            </div>
          </dl>
        </article>

        <aside className={styles.aside} aria-label="Listen and read more">
          <ListenCard links={links} />
          <RecentPosts />
        </aside>
      </div>

      <AboutHost />
      <LatestBlogs />
    </>
  );
}
