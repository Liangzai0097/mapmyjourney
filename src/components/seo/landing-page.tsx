'use client';

import Link from 'next/link';
import { Check, Globe, Download, Sparkles, Share2, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Feature {
  title: string;
  desc: string;
}

interface FAQ {
  q: string;
  a: string;
}

interface LandingPageProps {
  h1: string;
  subtitle: string;
  primaryKeyword: string;
  features: Feature[];
  faqs: FAQ[];
}

export default function LandingPage({
  h1,
  subtitle,
  primaryKeyword,
  features,
  faqs,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* 顶部导航 */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-stone-900" />
            <span className="font-bold text-lg text-stone-900">MapMyJourney</span>
          </Link>
          <Link href="/">
            <Button size="sm">Make Your Map →</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 max-w-3xl mx-auto">
          {h1}
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">{subtitle}</p>
        <Link href="/">
          <Button size="lg" className="text-base">
            <Sparkles className="w-5 h-5 mr-2" />
            Create Your {primaryKeyword.split(' ').slice(-2).join(' ')} — Free
          </Button>
        </Link>
        <p className="text-sm text-stone-400 mt-3">No login · No app download · 60 seconds</p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
              <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center mb-3">
                {i % 5 === 0 && <Globe className="w-5 h-5 text-stone-700" />}
                {i % 5 === 1 && <ZoomIn className="w-5 h-5 text-stone-700" />}
                {i % 5 === 2 && <Sparkles className="w-5 h-5 text-stone-700" />}
                {i % 5 === 3 && <Download className="w-5 h-5 text-stone-700" />}
                {i % 5 === 4 && <Share2 className="w-5 h-5 text-stone-700" />}
              </div>
              <h3 className="font-semibold text-stone-900 mb-1">{f.title}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-stone-900 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-3">Ready to Map Your Journey?</h2>
        <p className="text-stone-300 max-w-xl mx-auto mb-6">
          Join thousands of travelers creating beautiful maps of the countries they&apos;ve visited.
        </p>
        <Link href="/">
          <Button size="lg" variant="secondary" className="text-base">
            Start Making Your Map — Free
          </Button>
        </Link>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-5 border border-stone-200">
                <h3 className="font-semibold text-stone-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-stone-200 py-6 px-4 text-center text-sm text-stone-500">
        <p>
          <Link href="/" className="hover:text-stone-700">MapMyJourney</Link> · Free travel map maker ·{' '}
          <Link href="/maps/countries-visited-map" className="hover:text-stone-700">Countries Visited Map</Link> ·{' '}
          <Link href="/maps/usa-travel-map" className="hover:text-stone-700">USA Travel Map</Link> ·{' '}
          <Link href="/maps/push-pin-travel-map" className="hover:text-stone-700">Push Pin Travel Map</Link>
        </p>
      </footer>
    </div>
  );
}
