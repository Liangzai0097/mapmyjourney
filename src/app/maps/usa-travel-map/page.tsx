import type { Metadata } from 'next';
import LandingPage from '@/components/seo/landing-page';

export const metadata: Metadata = {
  title: "USA Travel Map — Mark States You've Visited Free | MapMyJourney",
  description:
    "Create a beautiful USA travel map showing the states you've visited. Free online map maker — click to color states, choose from 3 styles, and download for Instagram & Pinterest. No login required.",
  keywords: [
    "usa travel map",
    "us travel map",
    "united states travel map",
    "states visited map",
    "map of states I've been to",
    "usa states visited tracker",
  ],
  openGraph: {
    title: "USA Travel Map — Mark States You've Visited Free",
    description: "Create a beautiful USA travel map showing the states you've visited. Free, no login.",
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: '/maps/usa-travel-map',
  },
};

export default function Page() {
  return (
    <LandingPage
      h1="USA Travel Map"
      subtitle="Mark the US states you've visited and create a stunning map to share your American travels."
      primaryKeyword="usa travel map"
      features={[
        { title: 'All 50 States + DC', desc: 'Double-click the USA on the world map to drill into all 50 states plus Washington DC. Click each state to mark it as visited.' },
        { title: 'Zoom & Pan Freely', desc: 'Zoom in to see small East Coast states clearly. Drag to pan around and click precisely on the state you want to mark.' },
        { title: '3 Beautiful Styles', desc: 'Minimalist for a clean look, Vintage for an old-atlas feel, or Watercolor for a dreamy starry-night aesthetic.' },
        { title: 'Export for Social Media', desc: 'Download your USA travel map in Instagram Post, Story, Pinterest, and HD sizes — perfectly cropped for each platform.' },
        { title: 'Count Your States', desc: 'See exactly how many of the 50 states you\'ve visited with an automatic counter badge on your map.' },
        { title: '100% Free', desc: 'Create and download your first map today for free. No account, no credit card, no app to install.' },
      ]}
      faqs={[
        { q: 'How do I make a USA travel map?', a: 'Go to our map tool, double-click on the United States to zoom into the state-level map, then click each state you\'ve visited to color it in. Pick a style and download.' },
        { q: 'Can I track all 50 states?', a: 'Yes! Double-clicking the USA reveals all 50 states plus Washington DC. Each one can be individually marked as visited.' },
        { q: 'Is it free to create a USA travel map?', a: 'Yes, you can create and download one map per day for free. Unlimited downloads are just $2 one-time payment.' },
        { q: 'Can I also mark countries I\'ve visited?', a: 'Absolutely. The same tool lets you click any country on the world map to mark it as visited, and 25 countries support province-level tracking.' },
      ]}
    />
  );
}
