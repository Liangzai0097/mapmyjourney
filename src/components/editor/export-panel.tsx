'use client';

import { useState, useEffect } from 'react';
import { useMapStore } from '@/lib/store';
import { EXPORT_SIZES } from '@/lib/styles';
import { exportMap, downloadDataUrl, generateFilename } from '@/lib/export';
import {
  canDownload,
  getRemainingDownloads,
  recordDownload,
  FREE_DAILY_LIMIT,
} from '@/lib/download-quota';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Download, Lock, Loader2, Share2, Check, Infinity as InfinityIcon } from 'lucide-react';

type ExportSizeKey = keyof typeof EXPORT_SIZES;
const ALL_SIZES: ExportSizeKey[] = ['instagram', 'story', 'pinterest', 'hd'];

export default function ExportPanel() {
  const { selectedCountries, style, colorIndex, hasPaid } = useMapStore();
  const [isExporting, setIsExporting] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [remaining, setRemaining] = useState<number>(FREE_DAILY_LIMIT);

  // 每次打开/状态变化时刷新剩余次数
  useEffect(() => {
    setRemaining(getRemainingDownloads(hasPaid));
  }, [hasPaid]);

  const handleExport = async (size: ExportSizeKey) => {
    if (selectedCountries.length === 0) return;

    // 免费版检查次数
    if (!hasPaid && !canDownload(hasPaid)) {
      setShowPaywall(true);
      return;
    }

    setIsExporting(true);
    try {
      const dataUrl = await exportMap(size, { hasPaid, style, colorIndex });
      downloadDataUrl(dataUrl, generateFilename(selectedCountries.length, style));
      // 记录下载
      recordDownload(hasPaid);
      // 更新剩余次数
      setRemaining(getRemainingDownloads(hasPaid));
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    const url = useMapStore.getState().getShareUrl();
    try {
      await navigator.clipboard.writeText(url);
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  const disabled = selectedCountries.length === 0;
  const noQuotaLeft = !hasPaid && remaining === 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Export & Share</div>
        {/* 剩余次数提示 */}
        {!hasPaid ? (
          <span className={`text-xs ${noQuotaLeft ? 'text-red-500 font-medium' : 'text-stone-500'}`}>
            {noQuotaLeft ? 'Daily limit reached' : `${remaining}/${FREE_DAILY_LIMIT} free today`}
          </span>
        ) : (
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <InfinityIcon className="w-3 h-3" />
            Unlimited
          </span>
        )}
      </div>

      {/* 导出尺寸列表 */}
      <div className="space-y-2">
        {ALL_SIZES.map((size) => (
          <Button
            key={size}
            onClick={() => handleExport(size)}
            disabled={disabled || isExporting || noQuotaLeft}
            variant={noQuotaLeft ? 'outline' : 'default'}
            className="w-full justify-between"
          >
            <span className="flex items-center">
              {isExporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : noQuotaLeft ? (
                <Lock className="w-4 h-4 mr-2" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {EXPORT_SIZES[size].label}
            </span>
            <span className="text-xs opacity-70">
              {EXPORT_SIZES[size].width}×{EXPORT_SIZES[size].height}
            </span>
          </Button>
        ))}
      </div>

      {/* 分享链接 */}
      <Button onClick={handleShare} variant="outline" className="w-full" disabled={disabled}>
        {showShareSuccess ? (
          <>
            <Check className="w-4 h-4 mr-2 text-green-600" />
            Copied!
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 mr-2" />
            Copy Share Link
          </>
        )}
      </Button>

      {/* 付费解锁 / 已付费状态 */}
      {!hasPaid && (
        <Button
          onClick={() => setShowPaywall(true)}
          className="w-full justify-between border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100"
          variant="outline"
        >
          <span className="flex items-center">
            <Lock className="w-4 h-4 mr-2" />
            {noQuotaLeft ? 'Get unlimited downloads' : 'Unlock unlimited + no watermark'}
          </span>
          <span className="font-bold">$2</span>
        </Button>
      )}

      {/* 免费版水印提示 */}
      {!hasPaid && (
        <p className="text-xs text-stone-400 text-center">
          Free downloads include a small watermark
        </p>
      )}

      {/* 付费墙弹窗 */}
      <PaywallDialog open={showPaywall} onOpenChange={setShowPaywall} />
    </div>
  );
}

function PaywallDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCheckout = async () => {
    setIsRedirecting(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Payment setup failed. Please try again.');
      setIsRedirecting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unlock Unlimited Downloads</DialogTitle>
          <DialogDescription>
            Download as many maps as you want, in every size, with no watermark.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <FeatureRow text="Unlimited downloads (no daily limit)" />
          <FeatureRow text="No watermark on any export" />
          <FeatureRow text="All 4 sizes: Instagram, Story, Pinterest, HD" />
          <FeatureRow text="High resolution up to 2048×2048" />
          <FeatureRow text="One-time payment, lifetime access" />
        </div>

        <div className="flex items-baseline justify-between pt-2 border-t">
          <div>
            <div className="text-3xl font-bold">$2</div>
            <div className="text-xs text-stone-500">one-time payment</div>
          </div>
          <Button onClick={handleCheckout} disabled={isRedirecting} size="lg">
            {isRedirecting ? 'Redirecting...' : 'Unlock Now'}
          </Button>
        </div>

        <p className="text-xs text-stone-400 text-center">
          Secure payment via Dodo Payments. Instant access.
        </p>
      </DialogContent>
    </Dialog>
  );
}

function FeatureRow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
      <span className="text-sm text-stone-700">{text}</span>
    </div>
  );
}
