import { NextRequest, NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';

/**
 * Dodo Payments webhook 处理
 * POST /api/webhook
 *
 * 支付成功后 Dodo 会回调这个 endpoint
 * 在生产环境用于：记录订单、发送邮件、解锁功能（服务端验证）
 *
 * MVP 阶段：仅记录日志，前端通过 success 页面的 URL 参数解锁
 */
export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.DODO_PAYMENTS_API_KEY;
    const webhookKey = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
    const environment =
      (process.env.DODO_ENVIRONMENT as 'test_mode' | 'live_mode') || 'test_mode';

    if (!apiKey || !webhookKey) {
      console.error('Missing Dodo Payments configuration (API key or webhook key)');
      return NextResponse.json({ error: 'Not configured' }, { status: 500 });
    }

    const body = await req.text();

    // 把 Headers 对象转成 plain record
    const headers: Record<string, string> = {};
    req.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const client = new DodoPayments({
      bearerToken: apiKey,
      environment,
    });

    // Dodo SDK 的正确方法：unwrap（验证签名 + 解析事件）
    const event = client.webhooks.unwrap(body, { headers, key: webhookKey });

    console.log(`Received Dodo webhook: ${event.type}`);

    switch (event.type) {
      case 'payment.succeeded': {
        const payment = event.data;
        console.log('Payment succeeded:', {
          payment_id: payment.payment_id,
          total_amount: payment.total_amount,
          currency: payment.currency,
          metadata: payment.metadata,
        });
        // TODO: 持久化订单到数据库（V2）
        break;
      }

      case 'payment.failed':
        console.log('Payment failed:', event.data.payment_id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }
}
