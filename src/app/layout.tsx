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
  title: "MapMyJourney — Beautiful Travel Map Maker",
  description:
    "Turn the countries you've visited into a beautiful, shareable map in 60 seconds. Free, no login, no app download. Perfect for Instagram, Pinterest, and TikTok.",
  keywords: [
    "travel map",
    "countries visited",
    "world map maker",
    "travel tracker",
    "visited countries map",
    "travel map generator",
  ],
  openGraph: {
    title: "MapMyJourney — Beautiful Travel Map Maker",
    description:
      "Turn the countries you've visited into a beautiful, shareable map in 60 seconds.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MapMyJourney — Beautiful Travel Map Maker",
    description:
      "Turn the countries you've visited into a beautiful, shareable map in 60 seconds.",
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
