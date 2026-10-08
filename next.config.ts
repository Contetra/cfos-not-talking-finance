import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "contetra.b-cdn.net",
        pathname: "/**",
      },
      // Episode thumbnails: the YouTube "eyeframe" and every episode card.
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],

    // Next 16 defaults images.qualities to [75]; anything else is coerced to
    // the nearest allowed value. 80 is listed so the Bunny loader's default
    // quality survives if that loader is ever switched on.
    qualities: [75, 80],

    // --- Bunny Optimizer -----------------------------------------------------
    // Uncomment BOTH lines only after confirming Bunny Optimizer is enabled on
    // the contetra.b-cdn.net pull zone. If it is not, every optimised request
    // 404s. See lib/bunnyLoader.ts.
    //
    // loader: "custom",
    // loaderFile: "./lib/bunnyLoader.ts",
  },

  async redirects() {
    return [
      // The guest archive was planned as /special-guests; it shipped as /podcast.
      { source: "/special-guests", destination: "/podcast", permanent: true },
    ];
  },
};

export default nextConfig;
