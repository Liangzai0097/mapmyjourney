import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MapStyle = 'minimalist' | 'vintage' | 'watercolor';
export type ExportSize = 'instagram' | 'story' | 'pinterest' | 'hd';
export type ViewMode = 'world' | 'country';

interface MapState {
  // 选中的国家（ISO 3166-1 alpha-3 代码）
  selectedCountries: string[];
  // 选中的省份：按国家分组，key = ISO3，value = 省份名称数组
  selectedProvinces: Record<string, string[]>;
  // 地图样式
  style: MapStyle;
  // 颜色方案索引
  colorIndex: number;
  // 标题和副标题
  title: string;
  subtitle: string;
  // 导出尺寸
  exportSize: ExportSize;
  // 是否已付费
  hasPaid: boolean;
  // 钻取模式：当前查看的国家（null = 世界视图）
  drilledCountry: string | null;
  viewMode: ViewMode;

  // Actions
  toggleCountry: (countryCode: string) => void;
  toggleProvince: (countryIso: string, provinceName: string) => void;
  clearAll: () => void;
  setStyle: (style: MapStyle) => void;
  setColorIndex: (index: number) => void;
  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setExportSize: (size: ExportSize) => void;
  setHasPaid: (paid: boolean) => void;
  drillInto: (countryIso: string) => void;
  drillOut: () => void;
  loadFromUrl: (params: URLSearchParams) => void;
  getShareUrl: () => string;
  // 统计：某国家已选省份数
  provinceCount: (countryIso: string) => number;
}

export const useMapStore = create<MapState>()(
  persist(
    (set, get) => ({
      selectedCountries: [],
      selectedProvinces: {},
      style: 'minimalist',
      colorIndex: 0,
      title: 'My Travel Map',
      subtitle: '',
      exportSize: 'instagram',
      hasPaid: false,
      drilledCountry: null,
      viewMode: 'world',

      toggleCountry: (countryCode) =>
        set((state) => {
          const exists = state.selectedCountries.includes(countryCode);
          return {
            selectedCountries: exists
              ? state.selectedCountries.filter((c) => c !== countryCode)
              : [...state.selectedCountries, countryCode],
          };
        }),

      toggleProvince: (countryIso, provinceName) =>
        set((state) => {
          const current = state.selectedProvinces[countryIso] || [];
          const exists = current.includes(provinceName);
          const updated = exists
            ? current.filter((p) => p !== provinceName)
            : [...current, provinceName];
          return {
            selectedProvinces: {
              ...state.selectedProvinces,
              [countryIso]: updated,
            },
          };
        }),

      clearAll: () =>
        set({ selectedCountries: [], selectedProvinces: {} }),

      setStyle: (style) => set({ style }),
      setColorIndex: (colorIndex) => set({ colorIndex }),
      setTitle: (title) => set({ title }),
      setSubtitle: (subtitle) => set({ subtitle }),
      setExportSize: (exportSize) => set({ exportSize }),
      setHasPaid: (hasPaid) => set({ hasPaid }),

      drillInto: (countryIso) =>
        set({ drilledCountry: countryIso, viewMode: 'country' }),
      drillOut: () => set({ drilledCountry: null, viewMode: 'world' }),

      provinceCount: (countryIso) => (get().selectedProvinces[countryIso] || []).length,

      loadFromUrl: (params) => {
        const countries = params.get('c')?.split(',').filter(Boolean) || [];
        const style = (params.get('style') as MapStyle) || 'minimalist';
        const colorIndex = parseInt(params.get('color') || '0', 10);
        const title = params.get('title') || 'My Travel Map';
        const subtitle = params.get('sub') || '';
        // 省级数据编码格式：p=ISO3:prov1|prov2,ISO3b:prov3|prov4
        const provincesParam = params.get('p') || '';
        const selectedProvinces: Record<string, string[]> = {};
        if (provincesParam) {
          for (const chunk of provincesParam.split(',')) {
            const [iso, provs] = chunk.split(':');
            if (iso && provs) {
              selectedProvinces[iso] = provs.split('|').map(decodeURIComponent);
            }
          }
        }

        set({
          selectedCountries: countries,
          selectedProvinces,
          style: style === 'minimalist' || style === 'vintage' || style === 'watercolor' ? style : 'minimalist',
          colorIndex: isNaN(colorIndex) ? 0 : colorIndex,
          title: decodeURIComponent(title),
          subtitle: decodeURIComponent(subtitle),
        });
      },

      getShareUrl: () => {
        const state = get();
        const params = new URLSearchParams();
        if (state.selectedCountries.length > 0) {
          params.set('c', state.selectedCountries.join(','));
        }
        params.set('style', state.style);
        params.set('color', state.colorIndex.toString());
        params.set('title', encodeURIComponent(state.title));
        params.set('sub', encodeURIComponent(state.subtitle));
        // 编码省级数据
        const provEntries = Object.entries(state.selectedProvinces).filter(
          ([, provs]) => provs.length > 0
        );
        if (provEntries.length > 0) {
          params.set(
            'p',
            provEntries
              .map(([iso, provs]) => `${iso}:${provs.map(encodeURIComponent).join('|')}`)
              .join(',')
          );
        }
        return `${typeof window !== 'undefined' ? window.location.origin : ''}/?${params.toString()}`;
      },
    }),
    {
      name: 'mapmyjourney-storage',
      partialize: (state) => ({
        selectedCountries: state.selectedCountries,
        selectedProvinces: state.selectedProvinces,
        style: state.style,
        colorIndex: state.colorIndex,
        title: state.title,
        subtitle: state.subtitle,
      }),
    }
  )
);
