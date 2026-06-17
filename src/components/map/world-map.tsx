'use client';

import { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useMapStore } from '@/lib/store';
import { MAP_STYLES, COLOR_PALETTES } from '@/lib/styles';
import { canDrillDown, getCountryMeta } from '@/lib/countries';
import { ZoomIn } from 'lucide-react';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// world-atlas countries-110m.json 的 id 是 ISO 3166-1 numeric，需要转 alpha-3
const NUMERIC_TO_A3: Record<string, string> = {
  '004': 'AFG', '008': 'ALB', '012': 'DZA', '024': 'AGO', '032': 'ARG',
  '036': 'AUS', '040': 'AUT', '051': 'ARM', '056': 'BEL', '064': 'BTN',
  '068': 'BOL', '076': 'BRA', '084': 'BLZ', '090': 'SLB', '096': 'BRN',
  '100': 'BGR', '104': 'MMR', '108': 'BDI', '112': 'BLR', '116': 'KHM',
  '120': 'CMR', '124': 'CAN', '140': 'CAF', '144': 'LKA', '148': 'TCD',
  '152': 'CHL', '156': 'CHN', '158': 'TWN', '170': 'COL', '178': 'COG',
  '180': 'COD', '188': 'CRI', '191': 'HRV', '192': 'CUB', '196': 'CYP',
  '203': 'CZE', '204': 'BEN', '208': 'DNK', '214': 'DOM', '218': 'ECU',
  '222': 'SLV', '226': 'GNQ', '231': 'ETH', '232': 'ERI', '233': 'EST',
  '242': 'FJI', '246': 'FIN', '250': 'FRA', '260': 'ATF', '262': 'DJI',
  '266': 'GAB', '268': 'GEO', '270': 'GMB', '275': 'PSE', '276': 'DEU',
  '288': 'GHA', '300': 'GRC', '304': 'GRL', '320': 'GTM', '324': 'GIN',
  '328': 'GUY', '332': 'HTI', '340': 'HND', '348': 'HUN', '352': 'ISL',
  '360': 'IDN', '364': 'IRN', '368': 'IRQ', '372': 'IRL', '376': 'ISR',
  '380': 'ITA', '384': 'CIV', '388': 'JAM', '392': 'JPN', '398': 'KAZ',
  '400': 'JOR', '404': 'KEN', '408': 'PRK', '410': 'KOR', '414': 'KWT',
  '417': 'KGZ', '418': 'LAO', '422': 'LBN', '426': 'LSO', '428': 'LVA',
  '430': 'LBR', '434': 'LBY', '440': 'LTU', '442': 'LUX', '450': 'MDG',
  '454': 'MWI', '458': 'MYS', '466': 'MLI', '470': 'MLT', '478': 'MRT',
  '480': 'MUS', '484': 'MEX', '496': 'MNG', '498': 'MDA', '499': 'MNE',
  '504': 'MAR', '508': 'MOZ', '512': 'OMN', '516': 'NAM', '524': 'NPL',
  '528': 'NLD', '540': 'NCL', '548': 'VUT', '554': 'NZL', '558': 'NIC',
  '562': 'NER', '566': 'NGA', '578': 'NOR', '586': 'PAK', '591': 'PAN',
  '598': 'PNG', '600': 'PRY', '604': 'PER', '608': 'PHL', '616': 'POL',
  '620': 'PRT', '624': 'GNB', '626': 'TLS', '630': 'PRI', '634': 'QAT',
  '642': 'ROU', '643': 'RUS', '646': 'RWA', '682': 'SAU', '686': 'SEN',
  '688': 'SRB', '694': 'SLE', '702': 'SGP', '703': 'SVK', '704': 'VNM',
  '705': 'SVN', '706': 'SOM', '710': 'ZAF', '716': 'ZWE', '724': 'ESP',
  '728': 'SSD', '729': 'SDN', '732': 'ESH', '740': 'SUR', '748': 'SWZ',
  '752': 'SWE', '756': 'CHE', '760': 'SYR', '762': 'TJK', '764': 'THA',
  '768': 'TGO', '780': 'TTO', '784': 'ARE', '788': 'TUN', '792': 'TUR',
  '795': 'TKM', '800': 'UGA', '804': 'UKR', '807': 'MKD', '818': 'EGY',
  '826': 'GBR', '834': 'TZA', '840': 'USA', '854': 'BFA', '858': 'URY',
  '860': 'UZB', '862': 'VEN', '882': 'WSM', '887': 'YEM', '894': 'ZMB',
};

interface GeoFeature {
  id: string;
  rsmKey: string;
  properties: { name: string };
}

export default function WorldMap() {
  const {
    selectedCountries,
    style,
    colorIndex,
    toggleCountry,
    drillInto,
    selectedProvinces,
  } = useMapStore();
  const [hovered, setHovered] = useState<string | null>(null);

  const styleConfig = MAP_STYLES[style];
  const selectedColor = COLOR_PALETTES[colorIndex].color;

  return (
    <div className="relative w-full h-full">
      <ComposableMap
        projection="geoEqualEarth"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: styleConfig.ocean,
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: GeoFeature[] }) =>
            geographies.map((geo) => {
              const numericId = geo.id;
              const countryCode = NUMERIC_TO_A3[numericId] || numericId;
              const isSelected = selectedCountries.includes(countryCode);
              const drillable = canDrillDown(countryCode);
              const provCount = (selectedProvinces[countryCode] || []).length;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => toggleCountry(countryCode)}
                  onDoubleClick={() => {
                    if (drillable) drillInto(countryCode);
                  }}
                  onMouseEnter={() => setHovered(countryCode)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    default: {
                      fill: isSelected ? selectedColor : styleConfig.unvisited,
                      stroke: styleConfig.unvisitedStroke,
                      strokeWidth: drillable ? 0.5 : 0.3,
                      strokeDasharray: drillable ? '0' : '0',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'fill 0.2s ease',
                    },
                    hover: {
                      fill: isSelected ? selectedColor : '#9CA3AF',
                      stroke: drillable ? selectedColor : '#6B7280',
                      strokeWidth: drillable ? 1.2 : 0.5,
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
      </ComposableMap>

      {/* 悬停信息浮层 */}
      {hovered && (
        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-md px-3 py-2 text-sm pointer-events-none border border-stone-200">
          <div className="font-medium text-stone-900">
            {getCountryMeta(hovered)?.name || hovered}
          </div>
          {(() => {
            const meta = getCountryMeta(hovered);
            const provCount = (selectedProvinces[hovered] || []).length;
            if (meta) {
              return (
                <div className="text-xs text-stone-500 mt-0.5 flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" />
                  Double-click to view {meta.provinces} provinces
                  {provCount > 0 && (
                    <span className="ml-1 text-green-600 font-medium">
                      ({provCount} marked)
                    </span>
                  )}
                </div>
              );
            }
            return null;
          })()}
        </div>
      )}
    </div>
  );
}
