import type { Metadata } from 'next';
import LandingPage from '@/components/seo/landing-page';

export const metadata: Metadata = {
  title: "Push Pin Travel Map — Digital Alternative (Free) | MapMyJourney",
  description:
    "Love push pin travel maps but don't want to buy a physical one? Create a digital push pin travel map for free. Color countries you've visited, pick beautiful styles, and download for social media. No login.",
  keywords: [
    "push pin travel map",
    "push pin travel maps",
    "pin travel map",
    "travel map with pins",
    "where to buy push pin travel map",
    "digital push pin map",
  ],
  openGraph: {
    title: "Push Pin Travel Map — Free Digital Alternative",
    description: "Create a digital push pin travel map for free. Color countries, pick styles, download for social media.",
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/maps/push-pin-travel-map',
  },
};

export default function Page() {
  return (
    <LandingPage
      h1="Push Pin Travel Map — Digital Alternative"
      subtitle="The free digital version of a push pin travel map. No physical board, no pins to lose — just beautiful, shareable maps of where you've been."
      primaryKeyword="push pin travel map"
      features={[
        { title: 'No Physical Board Needed', desc: 'A push pin travel map typically costs $40-100 for the board and pins. Our digital version is free — mark countries with a click instead of a pin.' },
        { title: 'Instantly Shareable', desc: 'Unlike a physical push pin map on your wall, our digital maps are ready to post on Instagram, Pinterest, and TikTok in seconds.' },
        { title: 'Track Countries & Provinces', desc: 'Pin countries on the world map, or double-click to drill into 25 countries and pin individual states and provinces.' },
        { title: '3 Stunning Visual Styles', desc: 'Minimalist, Vintage (old-world atlas), or Watercolor (starry night) — far more beautiful than a standard cork board.' },
        { title: 'Never Lose Your Pins', desc: 'Your map is saved automatically in your browser. No pins falling off, no map getting damaged — your travel record stays perfect.' },
        { title: 'Free to Start', desc: 'Create and download your first digital push pin travel map today, completely free. No credit card needed.' },
      ]}
      faqs={[
        { q: 'What is a push pin travel map?', a: 'A push pin travel map is a physical world map mounted on a board (usually cork or foam) where you stick pins into countries you\'ve visited. Our tool is a free digital alternative — you click countries instead of pinning them.' },
        { q: 'How is this different from a physical push pin map?', a: 'A physical push pin map costs $40-100+, takes up wall space, and can\'t be shared online. Our digital version is free, takes 60 seconds to make, and exports directly to Instagram, Pinterest, and TikTok sizes.' },
        { q: 'Can I still mark individual states?', a: 'Yes. While a physical push pin map usually only shows countries, our digital version lets you double-click 25 popular countries to mark individual states and provinces — more detailed than any physical map.' },
        { q: 'Is the digital push pin travel map really free?', a: 'Yes, you can create and download one map per day for free. If you want unlimited downloads and watermark-free exports, it\'s just $2 one-time — far cheaper than any physical push pin map.' },
      ]}
    />
  );
}
