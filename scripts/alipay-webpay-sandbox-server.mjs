import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import {
  formatAlipayAmount,
  getAlipayClient,
  isAlipayTradePaid,
  validateAlipayOrderResult
} from '../api/_lib/alipay.js';

const host = '127.0.0.1';
const port = Number(process.env.ALIPAY_SANDBOX_PORT || 4174);
const origin = `http://${host}:${port}`;
const amountCents = 990;
const orders = new Map();
const checkoutToken = randomUUID();

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function send(res, status, body, contentType = 'text/html; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store, max-age=0',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer'
  });
  res.end(body);
}

function layout(title, content, script = '') {
  return `<!doctype html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    :root { color-scheme: light; font-family: Pretendard, "Noto Sans KR", "Malgun Gothic", Inter, ui-sans-serif, system-ui, sans-serif; }
    * { box-sizing: border-box; }
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; color: #18211d; background: radial-gradient(circle at top, #e8fff3, #f7f5ee 55%); }
    main { width: min(92vw, 680px); padding: 38px; border: 1px solid #d9ded9; border-radius: 28px; background: rgba(255,255,255,.94); box-shadow: 0 24px 70px rgba(28,50,38,.12); }
    .eyebrow { color: #087443; font-weight: 750; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 10px 0 12px; font-size: clamp(32px, 6vw, 54px); line-height: 1.03; }
    p { line-height: 1.75; color: #526059; }
    .price { margin: 30px 0; font-size: 46px; font-weight: 850; }
    .price small { font-size: 15px; font-weight: 650; color: #66736c; }
    button, a.button { display: inline-flex; align-items: center; justify-content: center; width: 100%; min-height: 52px; border: 0; border-radius: 14px; color: white; background: #0b7b49; font: inherit; font-weight: 760; cursor: pointer; text-decoration: none; }
    .notice { margin-top: 22px; padding: 16px; border-radius: 14px; background: #fff7dc; color: #6b5413; font-size: 14px; }
    .status { margin: 24px 0; padding: 18px; border-radius: 14px; background: #eef7f1; font-weight: 720; }
    code { overflow-wrap: anywhere; }
  </style>
</head>
<body><main>${content}</main>${script}</body>
</html>`;
}

function paymentPage() {
  return layout('알리페이 웹 결제 샌드박스 체험', `
    <div class="eyebrow">로컬 샌드박스 전용</div>
    <h1>알리페이 웹 결제</h1>
    <p>프로젝트의 로컬 샌드박스 체험 진입점입니다. 클릭하면 알리페이 샌드박스 결제 양식을 만들며, 실제 자금이 청구되거나 운영 Supabase에 기록되지 않습니다.</p>
    <div class="price">¥9.90 <small>일회성 샌드박스 주문</small></div>
    <form method="post" action="/checkout">
      <input type="hidden" name="checkout_token" value="${escapeHtml(checkoutToken)}">
      <button type="submit">알리페이 샌드박스 결제로 이동</button>
    </form>
    <div class="notice">웹 결제 연동 확인 전용입니다. 운영 환경에서는 기존 로그인, 주문, 비동기 알림, 이용권 부여 흐름을 계속 사용합니다.</div>
  `);
}

async function readForm(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (Buffer.byteLength(body) > 8 * 1024) {
      throw new Error('REQUEST_BODY_TOO_LARGE');
    }
  }
  return new URLSearchParams(body);
}

function resultPage(orderId) {
  const safeId = escapeHtml(orderId);
  return layout('결제 결과 확인 중', `
    <div class="eyebrow">서버 측 조회</div>
    <h1>결제 결과 확인 중</h1>
    <p>이 페이지는 리디렉션 매개변수만으로 성공을 판정하지 않습니다. 로컬에 보관한 주문을 사용해 서버가 알리페이에 직접 조회합니다.</p>
    <div id="status" class="status">알리페이 주문 상태를 조회하고 있습니다…</div>
    <p><code>${safeId}</code></p>
    <a class="button" href="/">샌드박스 결제 페이지로 돌아가기</a>
  `, `<script>
    const statusNode = document.getElementById('status');
    const orderId = ${JSON.stringify(orderId)};
    async function refresh() {
      try {
        const response = await fetch('/api/status?order_id=' + encodeURIComponent(orderId), { cache: 'no-store' });
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || 'QUERY_FAILED');
        statusNode.textContent = payload.message;
        if (payload.state === 'PENDING') setTimeout(refresh, 2500);
      } catch {
        statusNode.textContent = '지금은 확인할 수 없습니다. 잠시 후 페이지를 새로고침해 다시 시도하세요.';
      }
    }
    refresh();
  </script>`);
}

async function queryOrder(order) {
  if (order.status === 'PAID') {
    return { state: 'PAID', message: '알리페이가 결제 성공을 확인했습니다(샌드박스).' };
  }

  const { sdk } = getAlipayClient();
  const result = await sdk.exec('alipay.trade.query', {
    bizContent: { out_trade_no: order.id }
  }, { validateSign: true });

  if (String(result?.code || '') !== '10000') {
    const code = String(result?.sub_code || result?.code || '');
    if (code.includes('TRADE_NOT_EXIST')) {
      return { state: 'PENDING', message: '주문이 아직 생성되지 않았거나 알리페이가 처리 중입니다. 잠시 기다려 주세요…' };
    }
    throw new Error('ALIPAY_SANDBOX_QUERY_FAILED');
  }
  if (!validateAlipayOrderResult(order, result)) {
    throw new Error('ALIPAY_SANDBOX_RESULT_MISMATCH');
  }
  if (isAlipayTradePaid(result.trade_status)) {
    order.status = 'PAID';
    return { state: 'PAID', message: '알리페이가 결제 성공을 확인했습니다(샌드박스).' };
  }
  if (result.trade_status === 'TRADE_CLOSED') {
    order.status = 'CLOSED';
    return { state: 'CLOSED', message: '주문이 종료되었습니다.' };
  }
  return { state: 'PENDING', message: '결제를 기다리는 주문입니다. 샌드박스 결제창에서 결제를 완료하세요…' };
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', origin);
  try {
    if (req.method === 'GET' && url.pathname === '/') {
      return send(res, 200, paymentPage());
    }

    if (req.method === 'GET' && url.pathname === '/checkout') {
      res.writeHead(303, {
        Location: '/',
        'Cache-Control': 'no-store, max-age=0',
        'X-Content-Type-Options': 'nosniff'
      });
      return res.end();
    }

    if (req.method === 'POST' && url.pathname === '/checkout') {
      const form = await readForm(req);
      if (form.get('checkout_token') !== checkoutToken) {
        return send(res, 403, 'forbidden', 'text/plain; charset=utf-8');
      }
      const id = randomUUID();
      const order = {
        id,
        amount_cents: amountCents,
        currency: 'CNY',
        status: 'PENDING',
        created_at: new Date().toISOString()
      };
      orders.set(id, order);

      const { sdk } = getAlipayClient();
      const paymentHtml = sdk.pageExec('alipay.trade.page.pay', 'POST', {
        returnUrl: `${origin}/result?order_id=${encodeURIComponent(id)}`,
        bizContent: {
          out_trade_no: id,
          total_amount: formatAlipayAmount(amountCents),
          subject: 'GPT-Image2 유료 커뮤니티 샌드박스 체험',
          product_code: 'FAST_INSTANT_TRADE_PAY',
          timeout_express: '30m'
        }
      });
      if (typeof paymentHtml !== 'string' || !paymentHtml.includes('<form')) {
        throw new Error('ALIPAY_PAYMENT_FORM_INVALID');
      }
      return send(res, 200, paymentHtml);
    }

    if (req.method === 'GET' && url.pathname === '/result') {
      const orderId = String(url.searchParams.get('order_id') || '');
      if (!orders.has(orderId)) {
        return send(res, 200, layout('로컬 주문을 찾을 수 없음', `
          <div class="eyebrow">안전한 대체 화면</div>
          <h1>로컬 주문을 찾을 수 없습니다</h1>
          <p>이 페이지는 리디렉션 매개변수만으로 결제 성공을 표시하지 않습니다. 결제 페이지로 돌아가 샌드박스 주문을 다시 만들어 주세요.</p>
          <a class="button" href="/">샌드박스 결제 페이지로 돌아가기</a>
        `));
      }
      return send(res, 200, resultPage(orderId));
    }

    if (req.method === 'GET' && url.pathname === '/api/status') {
      const orderId = String(url.searchParams.get('order_id') || '');
      const order = orders.get(orderId);
      if (!order) {
        return send(res, 404, JSON.stringify({ ok: false, error: 'ORDER_NOT_FOUND' }), 'application/json; charset=utf-8');
      }
      const status = await queryOrder(order);
      return send(res, 200, JSON.stringify({ ok: true, ...status }), 'application/json; charset=utf-8');
    }

    return send(res, 404, 'not found', 'text/plain; charset=utf-8');
  } catch (error) {
    console.warn('Alipay sandbox experience request failed', {
      path: url.pathname,
      message: String(error?.message || 'unknown').slice(0, 160)
    });
    return send(res, 500, layout('샌드박스 요청 실패', `
      <div class="eyebrow">요청 실패</div>
      <h1>샌드박스 요청에 실패했습니다</h1>
      <p>결제 페이지로 돌아가 다시 시도하세요. 터미널 로그에는 민감정보를 제거한 오류 유형만 기록됩니다.</p>
      <a class="button" href="/">샌드박스 결제 페이지로 돌아가기</a>
    `));
  }
});

server.listen(port, host, () => {
  console.log(`Alipay web payment sandbox: ${origin}/`);
});
