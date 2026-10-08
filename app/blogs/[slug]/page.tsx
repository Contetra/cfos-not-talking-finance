import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AboutHost from "@/components/AboutHost";
import ArticleBody from "@/components/ArticleBody";
import LatestBlogs from "@/components/LatestBlogs";
import ListenIcons from "@/components/ListenIcons";
import PageHero from "@/components/PageHero";
import YouTubePlayer from "@/components/YouTubePlayer";
import { blogPosts, getBlogPost } from "@/data/blogs";
import { getEpisode } from "@/data/episodes";
import { blogPage, blogPath, CRUMB_ROOT, episodePath, routes, site } from "@/data/site";
import { host } from "@/data/team";
import { blogImage, resolveListenLinks, youtubeWatchUrl } from "@/lib/media";
import styles from "./page.module.css";

/**
 * THE BLOG POST TEMPLATE: cfosnottalkingfinance.com/blogs/<slug>.
 *
 * One page per entry in data/blogs/. Nothing here is specific to a post; to
 * add one, add a data file (see data/blogs/_template.ts).
 */

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const image = { url: blogImage(post), width: 1280, height: 720, alt: post.card.title };
  return {
    title: post.pageTitle,
    description: post.description,
    alternates: { canonical: blogPath(slug) },
    openGraph: {
      type: "article",
      siteName: site.name,
      locale: "en_IN",
      url: blogPath(slug),
      title: post.pageTitle,
      description: post.description,
      publishedTime: post.publishedAt,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.pageTitle,
      description: post.description,
      images: [image.url],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const episode = post.episodeSlug ? getEpisode(post.episodeSlug) : undefined;
  const links = resolveListenLinks({
    ...(post.youtubeId ? { youtube: youtubeWatchUrl(post.youtubeId) } : {}),
    ...post.listen,
  });

  const postLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.pageTitle,
    description: post.description,
    datePublished: post.publishedAt,
    image: blogImage(post),
    url: new URL(blogPath(slug), site.url).toString(),
    author: { "@type": "Organization", name: site.producer },
    publisher: { "@type": "Organization", name: site.producer },
    about: { "@type": "Person", name: post.guest.name, jobTitle: post.guest.role },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(postLd).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        title={blogPage.title}
        titleAs="p"
        crumbs={[
          { label: CRUMB_ROOT, href: routes.home },
          { label: blogPage.crumb, href: routes.blogs },
          { label: post.crumb },
        ]}
      />

      <article className={styles.wrap}>
        <header className={styles.intro}>
          <div className={styles.media}>
            {post.youtubeId ? (
              <YouTubePlayer
                videoId={post.youtubeId}
                title={post.videoTitle ?? post.pageTitle}
                thumbnail={blogImage(post)}
                sizes="(min-width: 1200px) 520px, (min-width: 768px) 45vw, 92vw"
                priority
              />
            ) : (
              <div className={styles.cover}>
                <Image
                  src={blogImage(post)}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1200px) 520px, (min-width: 768px) 45vw, 92vw"
                  className={styles.coverImage}
                />
              </div>
            )}
          </div>

          <div className={styles.meta}>
            <h1 className={styles.heading}>
              <span className={styles.headingLead}>{post.heading[0]}</span>{" "}
              <span className={styles.headingRest}>{post.heading[1]}</span>
            </h1>
            <p className={styles.people}>
              Guest: {post.guest.name}, {post.guest.role}
              <br />
              Host: {host.name}
            </p>
            <ListenIcons label="Watch & listen on:" links={links} />
            {episode ? (
              <Link href={episodePath(episode.slug)} className={styles.episodeLink}>
                Go to the episode page
              </Link>
            ) : null}
          </div>
        </header>

        <ArticleBody sections={post.body} className={styles.article} />
      </article>

      <AboutHost />
      <LatestBlogs />
    </>
  );
}
