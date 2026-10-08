"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { getAudioState, requestMuted } from "@/lib/audio";
import { cn } from "@/lib/cn";
import { youtubeEmbedUrl } from "@/lib/media";
import styles from "./YouTubePlayer.module.css";

type YouTubePlayerProps = {
  videoId: string;
  /** The video's title: names the play button and the player frame. */
  title: string;
  thumbnail: string;
  /** next/image `sizes` for the thumbnail at this placement. */
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * The YouTube "eyeframe": the video's thumbnail with a play button, swapped
 * for the real player on click. Nothing from YouTube loads until then, so the
 * page stays light and sets no third-party cookies on arrival.
 */
export default function YouTubePlayer({
  videoId,
  title,
  thumbnail,
  sizes,
  priority = false,
  className,
}: YouTubePlayerProps) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  // The button that had focus is gone; hand focus to the player instead.
  useEffect(() => {
    if (playing) frameRef.current?.focus();
  }, [playing]);

  const play = () => {
    // The site's ambient music would play over the conversation. Fade it out.
    const audio = getAudioState();
    if (audio.playing && !audio.muted) void requestMuted(true);
    setPlaying(true);
  };

  return (
    <div className={cn(styles.player, className)}>
      {playing ? (
        <iframe
          ref={frameRef}
          src={youtubeEmbedUrl(videoId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={styles.frame}
        />
      ) : (
        <button type="button" onClick={play} className={styles.poster}>
          <Image
            src={thumbnail}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            className={styles.image}
          />
          <span aria-hidden="true" className={styles.play}>
            <svg viewBox="0 0 68 48" focusable="false">
              <path
                d="M66.5 7.7a8.6 8.6 0 0 0-6-6C55.2.3 34 .3 34 .3s-21.2 0-26.5 1.4a8.6 8.6 0 0 0-6 6C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.6 8.6 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.6 8.6 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3Z"
                className={styles.playBadge}
              />
              <path d="M27 34.3 44.6 24 27 13.7Z" fill="#fff" />
            </svg>
          </span>
          <span className={styles.watchOn} aria-hidden="true">
            Watch on YouTube
          </span>
          <span className="sr-only">Play video: {title}</span>
        </button>
      )}
    </div>
  );
}
