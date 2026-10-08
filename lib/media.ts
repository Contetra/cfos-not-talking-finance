import { listenLinks, PLACEHOLDER_IMAGE } from "@/data/site";
import type { BlogPost, Episode, ListenLink, ListenPlatform } from "@/types";

/** 1280x720. Every public video has one; next.config.ts allows the host. */
export const youtubeThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

export const youtubeWatchUrl = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;

/** The privacy-enhanced host: YouTube sets no cookies until the visitor
 *  actually presses play. */
export const youtubeEmbedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

export const episodeImage = (episode: Episode) =>
  episode.thumbnail ?? youtubeThumbnail(episode.youtubeId);

export const blogImage = (post: BlogPost) =>
  post.cover ??
  (post.youtubeId ? youtubeThumbnail(post.youtubeId) : PLACEHOLDER_IMAGE);

export type ResolvedListenLink = ListenLink & { url: string };

/**
 * The show's listening links, with any per-page overrides applied, minus every
 * platform that has no URL yet.
 */
export function resolveListenLinks(
  overrides: Partial<Record<ListenPlatform, string>> = {},
): ResolvedListenLink[] {
  return listenLinks
    .map((link) => ({ ...link, url: overrides[link.platform] ?? link.url }))
    .filter((link): link is ResolvedListenLink => Boolean(link.url));
}

/** Newest first. ISO dates sort correctly as strings. */
export const byNewest = (
  a: { publishedAt: string },
  b: { publishedAt: string },
) => b.publishedAt.localeCompare(a.publishedAt);

/** Lowercase words joined by single hyphens: "ca-vinit-bandi". */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
