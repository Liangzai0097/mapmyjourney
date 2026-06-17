import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Countries Visited Map — Make & Share Your Travel Map | MapMyJourney",
  description:
    "Create a beautiful map of countries you've visited in 60 seconds. Free travel map maker — no login, no app download. Color your world map, track provinces, and export stunning images for Instagram, Pinterest & TikTok.",
  keywords: [
    "countries visited map",
    "travel map maker",
    "map of countries I've visited",
    "make a travel map",
    "world travel map",
    "visited countries tracker",
    "free travel map generator",
    "countries visited tracker",
  ],
  openGraph: {
    title: "Countries Visited Map — Make & Share Your Travel Map",
    description:
      "Create a beautiful map of countries you've visited in 60 seconds. Free, no login required.",
    type: "website",
    locale: "en_US",
    siteName: "MapMyJourney",
  },
  twitter: {
    card: "summary_large_image",
    title: "Countries Visited Map — Make & Share Your Travel Map",
    description:
      "Create a beautiful map of countries you've visited in 60 seconds. Free, no login required.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
