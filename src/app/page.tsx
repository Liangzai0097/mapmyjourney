'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import MapContainer from '@/components/map/map-container';
import Editor from '@/components/editor/editor';
import ExportPanel from '@/components/editor/export-panel';
import { useMapStore } from '@/lib/store';
import { Globe, Sparkles } from 'lucide-react';

function HomeContent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { loadFromUrl } = useMapStore();
  const searchParams = useSearchParams();

  // 从 URL 加载分享状态
  useEffect(() => {
    if (searchParams.toString()) {
      loadFromUrl(searchParams);
    }
  }, [searchParams, loadFromUrl]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* 顶部导航 */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-stone-900" />
            <span className="font-bold text-lg text-stone-900">MapMyJourney</span>
          </div>
          <div className="text-sm text-stone-500 hidden sm:block">
            Free • No login • 60 seconds
          </div>
        </div>
      </header>

      {/* Hero 标题（仅首次显示） */}
      <section className="text-center py-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-2">
          Map Your Travel Journey
        </h1>
        <p className="text-stone-600 max-w-xl mx-auto">
          Click countries you've visited, pick a style, export a beautiful map to share.
        </p>
      </section>

      {/* 主工具区 */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* 左侧：地图展示（占 3/5） */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-4 sm:p-6">
              <MapContainer ref={mapRef} />
              <div className="mt-4 flex flex-col items-center justify-center gap-1 text-sm text-stone-500">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Click countries to mark as visited</span>
                </div>
                <div className="text-xs text-stone-400">
                  Double-click a country with a bold border to mark provinces
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：编辑器 + 导出（占 2/5） */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
              <h2 className="font-semibold text-stone-900 mb-4">Customize</h2>
              <Editor />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5">
              <ExportPanel />
            </div>
          </div>
        </div>
      </main>

      {/* 底部 */}
      <footer className="border-t border-stone-200 py-6 px-4 text-center text-sm text-stone-500">
        <p>Made for travelers, by travelers. 🌍</p>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
