'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMapStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setHasPaid } = useMapStore();

  useEffect(() => {
    // 简单的客户端解锁逻辑
    // 生产环境应该通过 webhook + 数据库做服务端验证
    // 但对 $5 客单价的 MVP，这是可接受的风险
    setHasPaid(true);
  }, [setHasPaid]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-2xl font-bold text-stone-900 mb-2">Payment Successful!</h1>
        <p className="text-stone-600 mb-6">
          HD Export is now unlocked. All sizes and watermark-free downloads are available.
        </p>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
          <div className="text-sm font-medium text-green-900 mb-2">✓ You now have access to:</div>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Watermark-free exports</li>
            <li>• Instagram Story size (1080×1920)</li>
            <li>• Pinterest size (1000×1500)</li>
            <li>• HD Square (2048×2048)</li>
          </ul>
        </div>

        <Link href="/">
          <Button className="w-full" size="lg">
            Back to My Map
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        <p className="text-xs text-stone-400 mt-4">
          A receipt has been sent to your email.
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
