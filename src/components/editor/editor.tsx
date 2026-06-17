'use client';

import { useMapStore } from '@/lib/store';
import { MAP_STYLES, COLOR_PALETTES } from '@/lib/styles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

export default function Editor() {
  const {
    style,
    colorIndex,
    title,
    subtitle,
    setStyle,
    setColorIndex,
    setTitle,
    setSubtitle,
    clearAll,
    selectedCountries,
  } = useMapStore();

  return (
    <div className="space-y-6">
      {/* 样式选择 */}
      <div>
        <label className="text-sm font-medium mb-2 block">Map Style</label>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(MAP_STYLES).map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`px-3 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                style === s.id
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
              }`}
            >
              <div
                className="w-full h-6 rounded mb-1"
                style={{ backgroundColor: s.ocean }}
              />
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* 颜色选择 */}
      <div>
        <label className="text-sm font-medium mb-2 block">Color</label>
        <div className="grid grid-cols-8 gap-2">
          {COLOR_PALETTES.map((palette, index) => (
            <button
              key={palette.name}
              onClick={() => setColorIndex(index)}
              title={palette.name}
              className={`aspect-square rounded-full border-2 transition-all ${
                colorIndex === index
                  ? 'border-stone-900 scale-110 ring-2 ring-stone-900 ring-offset-2'
                  : 'border-stone-200 hover:scale-105'
              }`}
              style={{ backgroundColor: palette.color }}
            />
          ))}
        </div>
      </div>

      {/* 文本输入 */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium mb-2 block">Title</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Travel Map"
            maxLength={50}
            className="font-medium"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Subtitle (optional)</label>
          <Input
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="2020 - 2026 Adventures"
            maxLength={80}
          />
        </div>
      </div>

      {/* 重置 */}
      <div className="flex items-center justify-between pt-2 border-t border-stone-200">
        <span className="text-sm text-stone-600">
          {selectedCountries.length} countries selected
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAll}
          disabled={selectedCountries.length === 0}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear All
        </Button>
      </div>
    </div>
  );
}
