/**
 * 支持省级钻取的热门国家元数据
 * 数据文件位于 /public/maps/countries/{ISO}.json
 * manifest 由构建脚本生成
 */

export interface CountryMeta {
  iso: string; // ISO 3166-1 alpha-3
  name: string;
  provinces: number;
  file: string;
  sizeKb: number;
}

// 与 public/maps/countries/manifest.json 对应
export const DRILLDOWN_COUNTRIES: CountryMeta[] = [
  { iso: 'CHN', name: 'China', provinces: 32, file: 'CHN.json', sizeKb: 1184.8 },
  { iso: 'USA', name: 'United States', provinces: 51, file: 'USA.json', sizeKb: 1226.2 },
  { iso: 'JPN', name: 'Japan', provinces: 47, file: 'JPN.json', sizeKb: 291.6 },
  { iso: 'GBR', name: 'United Kingdom', provinces: 232, file: 'GBR.json', sizeKb: 477.8 },
  { iso: 'FRA', name: 'France', provinces: 101, file: 'FRA.json', sizeKb: 491.9 },
  { iso: 'DEU', name: 'Germany', provinces: 16, file: 'DEU.json', sizeKb: 304.1 },
  { iso: 'ITA', name: 'Italy', provinces: 110, file: 'ITA.json', sizeKb: 429.9 },
  { iso: 'ESP', name: 'Spain', provinces: 52, file: 'ESP.json', sizeKb: 317.0 },
  { iso: 'THA', name: 'Thailand', provinces: 77, file: 'THA.json', sizeKb: 594.2 },
  { iso: 'AUS', name: 'Australia', provinces: 11, file: 'AUS.json', sizeKb: 370.7 },
  { iso: 'CAN', name: 'Canada', provinces: 13, file: 'CAN.json', sizeKb: 1734.0 },
  { iso: 'KOR', name: 'South Korea', provinces: 17, file: 'KOR.json', sizeKb: 105.0 },
  { iso: 'IND', name: 'India', provinces: 36, file: 'IND.json', sizeKb: 705.8 },
  { iso: 'RUS', name: 'Russia', provinces: 86, file: 'RUS.json', sizeKb: 2916.7 },
  { iso: 'BRA', name: 'Brazil', provinces: 27, file: 'BRA.json', sizeKb: 785.0 },
  { iso: 'IDN', name: 'Indonesia', provinces: 33, file: 'IDN.json', sizeKb: 532.5 },
  { iso: 'VNM', name: 'Vietnam', provinces: 63, file: 'VNM.json', sizeKb: 221.1 },
  { iso: 'MEX', name: 'Mexico', provinces: 33, file: 'MEX.json', sizeKb: 494.5 },
  { iso: 'TUR', name: 'Turkey', provinces: 81, file: 'TUR.json', sizeKb: 225.0 },
  { iso: 'EGY', name: 'Egypt', provinces: 27, file: 'EGY.json', sizeKb: 106.3 },
  { iso: 'GRC', name: 'Greece', provinces: 14, file: 'GRC.json', sizeKb: 152.1 },
  { iso: 'PRT', name: 'Portugal', provinces: 20, file: 'PRT.json', sizeKb: 96.8 },
  { iso: 'NLD', name: 'Netherlands', provinces: 15, file: 'NLD.json', sizeKb: 51.2 },
  { iso: 'CHE', name: 'Switzerland', provinces: 26, file: 'CHE.json', sizeKb: 106.3 },
  { iso: 'AUT', name: 'Austria', provinces: 9, file: 'AUT.json', sizeKb: 55.4 },
];

export const DRILLDOWN_ISO_SET = new Set(DRILLDOWN_COUNTRIES.map((c) => c.iso));

export function canDrillDown(iso: string): boolean {
  return DRILLDOWN_ISO_SET.has(iso);
}

export function getCountryMeta(iso: string): CountryMeta | undefined {
  return DRILLDOWN_COUNTRIES.find((c) => c.iso === iso);
}

/**
 * 获取单国地图数据 URL（按需加载）
 */
export function getCountryMapUrl(iso: string): string {
  return `/maps/countries/${iso}.json`;
}
