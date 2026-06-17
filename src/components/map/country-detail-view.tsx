'use client';

import { useState, useEffect, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { geoMercator, geoCentroid } from 'd3-geo';
import { useMapStore } from '@/lib/store';
import { MAP_STYLES, COLOR_PALETTES } from '@/lib/styles';
import { getCountryMeta, getCountryMapUrl } from '@/lib/countries';
import { ArrowLeft, Loader2, Check, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeoFeature {
  type: 'Feature';
  properties: { name: string; name_local?: string };
  geometry: { type: string; coordinates: number[] | number[][] | number[][][] };
}

interface GeoFeatureCollection {
  type: 'FeatureCollection';
  features: GeoFeature[];
}

// 正方形 viewBox，与正方形容器 1:1 对齐，消除信箱偏移
const MAP_SIZE = 800;
// fitExtent 适配框留白，给缩放留空间
const PADDING = 60;
const MIN_ZOOM = 1;
const MAX_ZOOM = 8;

export default function CountryDetailView() {
  const {
    drilledCountry,
    drillOut,
    toggleProvince,
    selectedProvinces,
    style,
    colorIndex,
  } = useMapStore();

  const [geoData, setGeoData] = useState<GeoFeatureCollection | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  // 鼠标视口坐标，用于跟随鼠标的省份名 tooltip 浮层
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  // 缩放/平移状态（组件本地，不入全局 store）
  const [zoom, setZoom] = useState(1);

  const meta = drilledCountry ? getCountryMeta(drilledCountry) : null;
  const styleConfig = MAP_STYLES[style];
  const selectedColor = COLOR_PALETTES[colorIndex].color;
  const selectedProvList = drilledCountry
    ? selectedProvinces[drilledCountry] || []
    : [];

  // 按需加载该国地图数据
  useEffect(() => {
    if (!drilledCountry) return;
    setLoading(true);
    setGeoData(undefined);
    fetch(getCountryMapUrl(drilledCountry))
      .then((res) => res.json())
      .then((data: GeoFeatureCollection) => {
        setGeoData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load country map:', err);
        setLoading(false);
      });
  }, [drilledCountry]);

  // 切换国家时重置缩放
  useEffect(() => {
    setZoom(1);
  }, [drilledCountry]);

  // 用 d3-geo 的 fitExtent 精确居中 + 自适应缩放
  // d3 projection 对象本身是 function，react-simple-maps 的 makeProjection
  // 检测到 function 会直接返回它，用它构造 geoPath
  const fittedProjection = useMemo(() => {
    if (!geoData) return null;
    return geoMercator().fitExtent(
      [
        [PADDING, PADDING],
        [MAP_SIZE - PADDING, MAP_SIZE - PADDING],
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geoData as any
    );
  }, [geoData]);

  // 计算国家中心经纬度，用于 ZoomableGroup 的 center prop
  const countryCenter = useMemo<[number, number]>(() => {
    if (!geoData) return [0, 0];
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const c = geoCentroid(geoData as any);
      return [c[0], c[1]];
    } catch {
      return [0, 0];
    }
  }, [geoData]);

  if (!drilledCountry || !meta) {
    return null;
  }

  if (loading || !geoData || !fittedProjection) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* 顶部：返回按钮 + 国家名 + 进度 */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          onClick={drillOut}
          className="flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          World Map
        </button>
        <div className="text-right">
          <div className="text-sm font-semibold text-stone-900">{meta.name}</div>
          <div className="text-xs text-stone-500">
            {selectedProvList.length} / {meta.provinces} provinces
          </div>
        </div>
      </div>

      {/* 地图 + 缩放控件 */}
      <div className="flex-1 flex items-center justify-center min-h-0 relative">
        <ComposableMap
          width={MAP_SIZE}
          height={MAP_SIZE}
          projection={fittedProjection as unknown as string}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <ZoomableGroup
            center={countryCenter}
            zoom={zoom}
            minZoom={MIN_ZOOM}
            maxZoom={MAX_ZOOM}
            translateExtent={[
              [-MAP_SIZE, -MAP_SIZE],
              [MAP_SIZE * 2, MAP_SIZE * 2],
            ]}
          >
            <Geographies geography={geoData}>
              {({ geographies }: { geographies: GeoFeature[] }) =>
                geographies.map((geo) => {
                  const provName = geo.properties.name;
                  const isSelected = selectedProvList.includes(provName);
                  const isHovered = hovered === provName;

                  return (
                    <Geography
                      key={provName}
                      geography={geo}
                      onClick={() => toggleProvince(drilledCountry, provName)}
                      onMouseEnter={() => setHovered(provName)}
                      onMouseMove={(e: React.MouseEvent) =>
                        setMousePos({ x: e.clientX, y: e.clientY })
                      }
                      onMouseLeave={() => {
                        setHovered(null);
                        setMousePos(null);
                      }}
                      style={{
                        default: {
                          fill: isSelected
                            ? selectedColor
                            : isHovered
                              ? styleConfig.unvisitedStroke
                              : styleConfig.unvisited,
                          stroke: styleConfig.unvisitedStroke,
                          strokeWidth: 0.5,
                          outline: 'none',
                          transition: 'fill 150ms',
                        },
                        hover: {
                          fill: isSelected
                            ? selectedColor
                            : styleConfig.unvisitedStroke,
                          stroke: styleConfig.unvisitedStroke,
                          strokeWidth: 0.8,
                          outline: 'none',
                          cursor: 'pointer',
                        },
                        pressed: {
                          fill: selectedColor,
                          outline: 'none',
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* 缩放控件浮层 */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-1 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setZoom((z) => Math.min(MAX_ZOOM, +(z + 1).toFixed(1)))}
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setZoom((z) => Math.max(MIN_ZOOM, +(z - 1).toFixed(1)))}
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setZoom(1)}
            title="Reset view"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 跟随鼠标的省份名 tooltip 浮层 */}
      {hovered && mousePos && (
        <div
          className="fixed pointer-events-none z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-md px-3 py-1.5 text-sm border border-stone-200"
          style={{
            left: mousePos.x + 14,
            top: mousePos.y + 14,
          }}
        >
          <span className="font-medium text-stone-900">{hovered}</span>
          {selectedProvList.includes(hovered) && (
            <Check className="inline w-3 h-3 ml-1.5 text-green-600" />
          )}
        </div>
      )}

      {/* 操作提示 */}
      <div className="text-center text-xs text-stone-500 h-5 mt-2">
        <span>Click to mark · Scroll to zoom · Drag to pan</span>
      </div>
    </div>
  );
}
