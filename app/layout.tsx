import type { Metadata } from "next";
import { Geist } from "next/font/google";

import AmbientAudio from "@/components/AmbientAudio";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { site } from "@/data/site";
import { cabinetGrotesk, switzer } from "@/lib/fonts";
import { handwriting, heroDisplay, homeRoboto } from "@/lib/homeFonts";
import { cn } from "@/lib/utils";

import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.producer }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.name,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.ogImage],
  },
  icons: {
    icon: site.logo,
    apple: site.logo,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        cabinetGrotesk.variable,
        switzer.variable,
        handwriting.variable,
        heroDisplay.variable,
        homeRoboto.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="font-body bg-canvas text-body min-h-full antialiased">
        {/* `relative`: the header is laid over the top of each page's hero. */}
        <div className="relative flex min-h-screen flex-col">
          <a
            href="#main"
            className="focus:bg-accent focus:text-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:font-medium"
          >
            Skip to content
          </a>

          <SmoothScrollProvider>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </SmoothScrollProvider>
        </div>
        <AmbientAudio />
      </body> 
    </html>
  );
}
