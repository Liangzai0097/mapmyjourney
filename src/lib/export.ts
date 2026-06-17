import { toPng } from 'html-to-image';
import { EXPORT_SIZES, MAP_STYLES, COLOR_PALETTES } from './styles';
import { MapStyle } from './store';

/**
 * 将地图容器导出为 PNG
 * 通过创建一个离屏的临时容器实现指定尺寸导出
 */
export async function exportMap(
  exportSizeKey: keyof typeof EXPORT_SIZES,
  options: { hasPaid: boolean; style: MapStyle; colorIndex: number }
): Promise<string> {
  const targetSize = EXPORT_SIZES[exportSizeKey];
  const sourceNode = document.getElementById('map-export-container');

  if (!sourceNode) {
    throw new Error('Map container not found');
  }

  // 计算放大倍数（基于源容器的实际宽度）
  const sourceWidth = sourceNode.offsetWidth;
  const pixelRatio = Math.max(1, targetSize.width / sourceWidth);

  // 免费版强制加入水印覆盖层
  const dataUrl = await toPng(sourceNode, {
    quality: 1,
    pixelRatio,
    width: sourceNode.offsetWidth,
    height: sourceNode.offsetHeight,
    cacheBust: true,
    backgroundColor: MAP_STYLES[options.style].ocean,
  });

  // 免费版：在 canvas 上添加更大的水印
  if (!options.hasPaid) {
    return addWatermark(dataUrl, targetSize.width, targetSize.height);
  }

  return dataUrl;
}

/**
 * 给图片添加水印
 */
function addWatermark(
  dataUrl: string,
  targetWidth: number,
  _targetHeight: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetWidth; // 保持正方形
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 水印
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.font = `${Math.floor(targetWidth * 0.022)}px Inter, sans-serif`;
      ctx.textAlign = 'right';
      ctx.fillText('MapMyJourney.com', canvas.width - 20, canvas.height - 20);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * 触发下载
 */
export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * 从国家代码生成文件名
 */
export function generateFilename(countryCount: number, style: MapStyle): string {
  const styleName = MAP_STYLES[style].name.toLowerCase();
  return `my-travel-map-${countryCount}-countries-${styleName}.png`;
}
