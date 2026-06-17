import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mapmyjourney.vercel.app';
  const now = new Date();

  // 核心 SEO 页面
  const pages = [
    { path: '/', priority: 1.0, changeFreq: 'weekly' as const },
    { path: '/maps/countries-visited-map', priority: 0.9, changeFreq: 'monthly' as const },
    { path: '/maps/usa-travel-map', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/maps/push-pin-travel-map', priority: 0.8, changeFreq: 'monthly' as const },
    { path: '/success', priority: 0.3, changeFreq: 'yearly' as const },
  ];

  return pages.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFreq,
    priority: p.priority,
  }));
}
