import type { Metadata } from 'next';
import LandingPage from '@/components/seo/landing-page';

export const metadata: Metadata = {
  title: "Countries Visited Map — Create & Share Your Travel Map Free | MapMyJourney",
  description:
    "Make a map of countries you've visited in 60 seconds. Free countries visited map maker — color the world, track provinces, and download beautiful images for Instagram, Pinterest & TikTok. No login required.",
  keywords: [
    "countries visited map",
    "map of countries I've visited",
    "countries ive visited map",
    "map with visited countries",
    "countries i have visited map",
    "how many countries have i visited map",
  ],
  openGraph: {
    title: "Countries Visited Map — Create & Share Your Travel Map Free",
    description: "Make a beautiful map of countries you've visited. Free, no login required.",
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/maps/countries-visited-map',
  },
};

export default function Page() {
  return (
    <LandingPage
      h1="Countries Visited Map"
      subtitle="Color the countries you've been to and create a stunning map to share with friends."
      primaryKeyword="countries visited map"
      features={[
        { title: 'Click to Mark Countries', desc: 'Simply click any country on the world map to mark it as visited. No sign-up, no app to install.' },
        { title: 'Track Provinces Too', desc: 'Double-click 25 popular countries (USA, China, Japan, UK, and more) to mark individual states and provinces you\'ve visited.' },
        { title: '3 Beautiful Styles', desc: 'Choose from Minimalist, Vintage, and Watercolor (starry night) styles. Each one designed for social sharing.' },
        { title: 'Export for Instagram & Pinterest', desc: 'Download your map in Instagram Post, Story, Pinterest, and HD sizes — ready to post in seconds.' },
        { title: '100% Free to Start', desc: 'Create and download your first map today, completely free. No credit card, no account needed.' },
        { title: 'Share with a Link', desc: 'Generate a shareable link that recreates your exact map. Send it to friends or post it anywhere.' },
      ]}
      faqs={[
        { q: 'How do I make a countries visited map?', a: 'Just click on any country in the world map above to mark it as visited. Once you\'re done, pick a style and click Download. The whole process takes about 60 seconds.' },
        { q: 'Is it free to create a countries visited map?', a: 'Yes! You can create and download one map per day for free. If you want unlimited downloads and watermark-free exports, it\'s just $2 one-time.' },
        { q: 'Can I track provinces and states too?', a: 'Yes. Double-click on any of the 25 supported countries (including USA, China, Japan, UK, France, Germany, and more) to drill down and mark individual provinces you\'ve visited.' },
        { q: 'Do I need to create an account?', a: 'No. There\'s no login or sign-up required. Your map is saved in your browser, and you can share it via a link.' },
        { q: 'What sizes can I export?', a: 'You can export your map in Instagram Post (1080×1080), Instagram Story (1080×1920), Pinterest (1000×1500), and HD (2048×2048) sizes.' },
      ]}
    />
  );
}
