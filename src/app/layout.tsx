import type { Metadata, Viewport } from "next";

// Self-hosted via @fontsource (bundled font files, no external font CDN calls)
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";

import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import { personal } from "@/lib/data";

const siteUrl = "https://abhayraj.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} — ${personal.role}`,
    template: `%s — ${personal.name}`,
  },
  description: personal.summary,
  keywords: [
    "Abhay Raj",
    "Java Developer",
    "Spring Boot Developer",
    "REST API Developer",
    "MCA Student",
    "Software Development Engineer",
    "Technical Support Engineer",
    "Kanpur Developer Portfolio",
  ],
  authors: [{ name: personal.name, url: personal.linkedin }],
  creator: personal.name,
  openGraph: {
    type: "website",
    url: siteUrl,
    title: `${personal.name} — ${personal.role}`,
    description: personal.summary,
    siteName: `${personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — ${personal.role}`,
    description: personal.summary,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <SmoothScroll>
          <NoiseOverlay />
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
