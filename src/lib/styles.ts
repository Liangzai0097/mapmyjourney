import { MapStyle } from './store';

export interface MapStyleConfig {
  id: MapStyle;
  name: string;
  description: string;
  ocean: string;
  unvisited: string;
  unvisitedStroke: string;
  graticule: string;
  fontFamily: string;
  titleColor: string;
  subtitleColor: string;
  borderRadius: string;
  shadow: string;
  texture?: string;
  // —— 炫酷增强配置 ——
  gradientBg?: string;
  starfield?: string;
  titleGradient?: string;
  titleGlow?: string;
  badgeBg?: string;
  badgeColor?: string;
  badgeAccent?: string;
}

export const COLOR_PALETTES = [
  { name: 'Ocean Blue', color: '#2563EB' },
  { name: 'Coral Red', color: '#DC2626' },
  { name: 'Emerald Green', color: '#059669' },
  { name: 'Royal Purple', color: '#7C3AED' },
  { name: 'Sunset Orange', color: '#EA580C' },
  { name: 'Teal', color: '#0D9488' },
  { name: 'Rose Pink', color: '#E11D48' },
  { name: 'Gold', color: '#D97706' },
];

export const MAP_STYLES: Record<MapStyle, MapStyleConfig> = {
  minimalist: {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, modern, Scandinavian design',
    ocean: '#FAFAFA',
    unvisited: '#E5E7EB',
    unvisitedStroke: '#D1D5DB',
    graticule: 'none',
    fontFamily: 'Inter, system-ui, sans-serif',
    titleColor: '#111827',
    subtitleColor: '#6B7280',
    borderRadius: '0px',
    shadow: 'none',
    gradientBg: 'linear-gradient(135deg, #FAFAFA 0%, #F0F4F8 50%, #E8EEF5 100%)',
    titleGradient: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
    badgeBg: '#F3F4F6',
    badgeColor: '#374151',
    badgeAccent: '#2563EB',
  },
  vintage: {
    id: 'vintage',
    name: 'Vintage',
    description: 'Old atlas, parchment, 1920s exploration',
    ocean: '#F5E6D3',
    unvisited: '#D4C5B0',
    unvisitedStroke: '#A0937D',
    graticule: '#C4B49A',
    fontFamily: 'Georgia, serif',
    titleColor: '#3E2723',
    subtitleColor: '#6D4C41',
    borderRadius: '4px',
    shadow: '0 4px 20px rgba(62, 39, 35, 0.15)',
    texture: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
    gradientBg: 'linear-gradient(135deg, #F5E6D3 0%, #EDE0CC 40%, #E8D8BE 100%)',
    titleGradient: 'linear-gradient(135deg, #3E2723 0%, #795548 50%, #8D6E63 100%)',
    titleGlow: '0 1px 2px rgba(62, 39, 35, 0.2)',
    badgeBg: '#EFEBE9',
    badgeColor: '#5D4037',
    badgeAccent: '#8D6E63',
  },
  watercolor: {
    id: 'watercolor',
    name: 'Watercolor',
    description: 'Artistic, soft, dreamy, hand-painted',
    ocean: '#E0F2FE',
    unvisited: '#334155',
    unvisitedStroke: '#475569',
    graticule: 'none',
    fontFamily: 'Caveat, cursive',
    titleColor: '#38BDF8',
    subtitleColor: '#94A3B8',
    borderRadius: '8px',
    shadow: '0 8px 32px rgba(3, 105, 161, 0.12)',
    gradientBg: 'linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #1E1B4B 100%)',
    starfield: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.5\'%3E%3Ccircle cx=\'20\' cy=\'30\' r=\'0.8\'/%3E%3Ccircle cx=\'60\' cy=\'80\' r=\'1.2\'/%3E%3Ccircle cx=\'110\' cy=\'40\' r=\'0.6\'/%3E%3Ccircle cx=\'150\' cy=\'110\' r=\'1\'/%3E%3Ccircle cx=\'180\' cy=\'60\' r=\'0.7\'/%3E%3Ccircle cx=\'40\' cy=\'160\' r=\'0.9\'/%3E%3Ccircle cx=\'90\' cy=\'180\' r=\'0.5\'/%3E%3Ccircle cx=\'130\' cy=\'150\' r=\'1.1\'/%3E%3Ccircle cx=\'170\' cy=\'180\' r=\'0.6\'/%3E%3Ccircle cx=\'10\' cy=\'100\' r=\'0.8\'/%3E%3Ccircle cx=\'70\' cy=\'20\' r=\'0.5\'/%3E%3C/g%3E%3C/svg%3E")',
    titleGradient: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #C084FC 100%)',
    titleGlow: '0 0 24px rgba(129, 140, 248, 0.5)',
    badgeBg: 'rgba(30, 41, 59, 0.7)',
    badgeColor: '#E2E8F0',
    badgeAccent: '#38BDF8',
  },
};

export const EXPORT_SIZES = {
  instagram: { width: 1080, height: 1080, label: 'Instagram Post' },
  story: { width: 1080, height: 1920, label: 'Instagram Story' },
  pinterest: { width: 1000, height: 1500, label: 'Pinterest' },
  hd: { width: 2048, height: 2048, label: 'HD Square' },
};
