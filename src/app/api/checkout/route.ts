import { NextRequest, NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';

/**
 * 创建 Dodo Payments checkout session
 * POST /api/checkout
 *
 * 用户点击"Unlock Now" → 调用此 API → 返回 checkout_url → 前端重定向
 */
export async function POST(_req: NextRequest) {
  try {
    // 环境变量校验
    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    const productId = process.env.DODO_PRODUCT_ID_HD; // 在 Dodo 后台创建的 HD Export 产品 ID
    const environment = (process.env.DODO_ENVIRONMENT as 'test_mode' | 'live_mode') || 'test_mode';

    if (!apiKey || !productId) {
      console.error('Missing Dodo Payments configuration');
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    const client = new DodoPayments({
      bearerToken: apiKey,
      environment,
    });

    const origin = _req.headers.get('origin') || 'http://localhost:3000';

    const checkout = await client.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: `${origin}/success`,
      cancel_url: `${origin}/`,
      metadata: {
        source: 'mapmyjourney',
        product: 'hd_export_unlock',
      },
    });

    return NextResponse.json({
      checkout_url: checkout.checkout_url,
      session_id: checkout.session_id,
    });
  } catch (error) {
    console.error('Checkout creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
