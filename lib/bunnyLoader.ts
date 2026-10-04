/**
 * Custom next/image loader for Bunny CDN's optimiser.
 *
 * ⚠️ REGISTERED BUT COMMENTED OUT in next.config.ts on purpose.
 *
 * Bunny only answers these query parameters when **Bunny Optimizer is enabled
 * on the pull zone**. If it is not, `?width=…&quality=…` comes back as a 404
 * and every image on the site breaks at once. Check the pull zone first
 * (Bunny dashboard → Pull Zone → Optimizer), then uncomment the two
 * `images.loader` lines in next.config.ts.
 *
 * Note the trade-off: setting a custom loader turns OFF Next's own optimiser
 * for every image in the app, including any local ones.
 */

type BunnyLoaderArgs = {
  src: string;
  width: number;
  quality?: number;
};

export default function bunnyLoader({
  src,
  width,
  quality,
}: BunnyLoaderArgs): string {
  // Leave anything not on the Bunny zone untouched (local /public assets, etc.).
  if (!src.startsWith("http")) return src;

  const url = new URL(src);
  url.searchParams.set("width", String(width));
  url.searchParams.set("quality", String(quality ?? 80));
  url.searchParams.set("format", "auto");
  return url.toString();
}
