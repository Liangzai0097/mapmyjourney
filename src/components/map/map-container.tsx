'use client';

import { forwardRef } from 'react';
import WorldMap from './world-map';
import CountryDetailView from './country-detail-view';
import { useMapStore } from '@/lib/store';
import { MAP_STYLES, COLOR_PALETTES } from '@/lib/styles';
import { getCountryMeta } from '@/lib/countries';
import { Globe } from 'lucide-react';

/**
 * 导出目标容器：包含标题 + 副标题 + 地图 + 成就徽章
 * 这个 ref 会被 html-to-image 捕获生成图片
 */
const MapContainer = forwardRef<HTMLDivElement>((_, ref) => {
  const {
    selectedCountries,
    selectedProvinces,
    style,
    colorIndex,
    title,
    subtitle,
    viewMode,
    drilledCountry,
  } = useMapStore();
  const styleConfig = MAP_STYLES[style];

  // 统计总省份数
  const totalProvinces = Object.values(selectedProvinces).reduce(
    (sum, provs) => sum + provs.length,
    0
  );
  const drilledMeta = drilledCountry ? getCountryMeta(drilledCountry) : null;
  const drilledProvCount = drilledCountry
    ? (selectedProvinces[drilledCountry] || []).length
    : 0;

  // 背景层叠：渐变 > 星空 > 噪点纹理 > 纯色兜底
  const backgroundLayers: string[] = [];
  if (styleConfig.starfield) backgroundLayers.push(styleConfig.starfield);
  if (styleConfig.texture) backgroundLayers.push(styleConfig.texture);
  if (styleConfig.gradientBg) {
    backgroundLayers.push(styleConfig.gradientBg);
  } else {
    backgroundLayers.push(styleConfig.ocean);
  }

  return (
    <div
      ref={ref}
      id="map-export-container"
      className="relative flex flex-col items-center justify-center mx-auto overflow-hidden"
      style={{
        width: '100%',
        maxWidth: '1024px',
        aspectRatio: '1 / 1',
        background: backgroundLayers.join(', '),
        borderRadius: styleConfig.borderRadius,
        boxShadow: styleConfig.shadow,
        padding: '5%',
        fontFamily: styleConfig.fontFamily,
      }}
    >
      {/* 标题区：渐变填充 + 发光 */}
      <div className="relative text-center mb-4 w-full" style={{ zIndex: 20 }}>
        <h1
          className="font-bold leading-tight"
          style={{
            position: 'relative',
            fontSize: '2.6rem',
            marginBottom: '0.4rem',
            letterSpacing: '0.02em',
            // 渐变文字填充：用 backgroundImage（非简写）避免与 backgroundClip 冲突
            ...(styleConfig.titleGradient
              ? {
                  backgroundImage: styleConfig.titleGradient,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              : { color: styleConfig.titleColor }),
            textShadow: styleConfig.titleGlow || 'none',
          }}
        >
          {title || 'My Travel Map'}
        </h1>
        {subtitle && (
          <p
            style={{
              position: 'relative',
              color: styleConfig.subtitleColor,
              fontSize: '1.1rem',
              opacity: 0.9,
              letterSpacing: '0.05em',
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* 地图区：根据视图模式切换 */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-0" style={{ zIndex: 15 }}>
        {viewMode === 'country' ? <CountryDetailView /> : <WorldMap />}
      </div>

      {/* 底部：成就徽章仪表盘 */}
      <div className="relative w-full flex items-center justify-center gap-3 mt-4" style={{ zIndex: 20 }}>
        {/* 国家徽章 */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-full"
          style={{
            background: styleConfig.badgeBg || 'rgba(0,0,0,0.05)',
          }}
        >
          <Globe
            className="w-4 h-4"
            style={{ color: styleConfig.badgeAccent || styleConfig.titleColor }}
          />
          <span
            className="font-bold text-lg leading-none"
            style={{ color: styleConfig.badgeAccent || styleConfig.titleColor }}
          >
            {selectedCountries.length}
          </span>
          <span
            className="text-xs uppercase tracking-wider"
            style={{ color: styleConfig.badgeColor || styleConfig.subtitleColor }}
          >
            {selectedCountries.length === 1 ? 'country' : 'countries'}
          </span>
        </div>

        {/* 省份徽章（仅当有省份数据时显示） */}
        {totalProvinces > 0 && (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: styleConfig.badgeBg || 'rgba(0,0,0,0.05)',
            }}
          >
            <span
              className="font-bold text-lg leading-none"
              style={{ color: styleConfig.badgeAccent || styleConfig.titleColor }}
            >
              {totalProvinces}
            </span>
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: styleConfig.badgeColor || styleConfig.subtitleColor }}
            >
              {totalProvinces === 1 ? 'province' : 'provinces'}
            </span>
          </div>
        )}
      </div>

      {/* 水印（免费版） */}
      {!useMapStore.getState().hasPaid && (
        <div
          className="absolute bottom-2 right-3"
          style={{
            color: styleConfig.subtitleColor,
            fontSize: '0.7rem',
            opacity: 0.5,
            zIndex: 5,
          }}
        >
          MapMyJourney.com
        </div>
      )}
    </div>
  );
});

MapContainer.displayName = 'MapContainer';
export default MapContainer;
