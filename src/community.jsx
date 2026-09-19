import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  CircleAlert,
  Clock3,
  CreditCard,
  ImageUp,
  LoaderCircle,
  LockKeyhole,
  LogIn,
  LogOut,
  MessageCircle,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench
} from 'lucide-react';
import officialAccountQr from './assets/canghe-official-account.png';
import './community.css';

const TERMS_VERSION = '2026-07-22';

const communityCopy = {
  ko: {
    brand: 'GPT-Image2 유료 커뮤니티',
    back: '사례 라이브러리로 돌아가기',
    admin: '관리자',
    signIn: '로그인',
    signOut: '로그아웃',
    eyebrow: '한 번 결제 · 장기 이용',
    title: '실제로 이미지를 만드는 사람들과 프롬프트, 사례, 워크플로를 함께 분석하세요.',
    subtitle: '알리페이로 ¥9.90을 한 번 결제합니다. 이용권은 현재 계정에 연결되며, 다른 기기에서도 로그인해 입장 QR 코드를 다시 볼 수 있습니다.',
    priceSuffix: '일회성',
    benefitsTitle: '커뮤니티에서 다루는 내용',
    benefits: ['GPT-Image2 프롬프트와 사례 분석', '이미지 도구, 모델 특성, 실전 워크플로', '창작자 간의 실제 문제와 경험 공유'],
    audienceTitle: '이런 분께 잘 맞습니다',
    audience: ['AI로 이미지나 콘텐츠를 만드는 분', '흩어진 프롬프트를 안정적인 흐름으로 만들고 싶은 분', '실제 시도를 공유하고 서로의 대화를 존중하는 분'],
    boundaryTitle: '서비스 범위',
    boundaries: ['1:1 서비스나 정해진 답변 횟수를 약속하지 않습니다', '독점 자료, 수익 결과, 영구적인 커뮤니티 활동을 약속하지 않습니다', '불법 행위, 광고성 방해, 대화 질서 훼손 계정은 이용권이 취소될 수 있습니다'],
    checking: '계정과 결제 이용권을 확인하고 있습니다…',
    loginTitle: '구매하거나 이용권을 복구하려면 로그인하세요',
    loginText: 'QR 코드가 공개적으로 퍼지는 것을 막고 기기 간 복구를 지원하기 위해 이용권은 현재 Supabase 계정에 연결됩니다.',
    availableTitle: '준비되면 결제할 수 있습니다',
    availableText: '금액은 서버에서 ¥9.90으로 고정하며 브라우저에서 바꿀 수 없습니다. 결제 후 서버가 알리페이에 주문을 조회해 확인합니다.',
    terms: '읽고 동의합니다. 이 커뮤니티는 실전 교류를 위한 곳이며, 1:1 서비스, 정기 답변, 독점 자료, 수익을 약속하지 않습니다. 환불은 관리자 검토가 필요합니다.',
    pay: '알리페이로 ¥9.90 결제',
    redirecting: '알리페이 결제창을 여는 중…',
    pendingTitle: '결제를 기다리거나 확인 중인 주문',
    pendingText: '중복 결제하지 마세요. 이미 결제했다면 같은 주문을 다시 조회할 수 있으며, 알리페이 알림 또는 서버 조회 중 하나가 확인되면 이용권이 복구됩니다.',
    query: '결제 결과 다시 조회',
    closeOrder: '대기 중인 주문 닫기',
    paidTitle: '결제 이용권이 확인되었습니다',
    paidText: '아래 QR 코드를 위챗(WeChat)으로 스캔해 입장하세요. QR 코드는 결제한 현재 계정에만 표시됩니다.',
    qrUpdatingTitle: '결제는 확인되었고, 커뮤니티 QR 코드를 갱신 중입니다',
    qrUpdatingText: '관리자가 현재 QR 코드를 아직 올리지 않았거나 방금 교체했습니다. 잠시 후 새로고침하세요. 결제 이용권은 유지됩니다.',
    pausedTitle: '현재 신규 주문을 일시 중지했습니다',
    pausedText: '결제한 사용자는 계속 QR 코드를 볼 수 있으며 환불과 관리자 작업도 계속 이용할 수 있습니다.',
    refundedTitle: '이 주문은 환불되었습니다',
    refundedText: '알리페이가 환불 성공을 확인하여 이 주문의 QR 코드 이용권이 더 이상 유효하지 않습니다.',
    revokedTitle: '이 이용권은 취소되었습니다',
    revokedText: '문의가 있으면 페이지 아래의 지원 채널로 관리자에게 연락하세요.',
    failedTitle: '지금은 작업을 완료할 수 없습니다',
    retry: '다시 시도',
    support: '공식 계정 및 지원',
    supportText: '창허(苍何) 공식 위챗(WeChat) 계정을 팔로우하거나 위챗에서 「창허(苍何)」를 검색하세요. 결제, 입장, 환불, 사용 문의는 공식 계정 메시지로 남길 수 있으며, 환불은 관리자 검토 후 원래 결제 수단으로 처리됩니다.',
    supportQrAlt: '창허(苍何) 공식 위챗 계정 QR 코드와 검색 안내',
    resultEyebrow: '알리페이 결제 결과',
    resultTitle: '서버가 이 주문을 확인하고 있습니다.',
    resultText: '이 페이지는 URL 매개변수만으로 결제 성공을 신뢰하지 않습니다. 서버 조회 또는 서명 검증 알림으로 확인된 상태만 표시합니다.',
    qrAlt: 'GPT-Image2 유료 커뮤니티 QR 코드',
    noOrder: '현재 계정에는 조회할 유료 커뮤니티 주문이 없습니다.',
    statusLabels: {
      PENDING: '결제 대기', PAID: '결제 완료', CLOSED: '종료됨', REFUNDED: '환불됨', REVOKED: '취소됨'
    }
  },
  en: {
    brand: 'GPT-Image2 Paid Community',
    back: 'Back to gallery',
    admin: 'Admin',
    signIn: 'Sign in',
    signOut: 'Sign out',
    eyebrow: 'One payment · Long-term access',
    title: 'Discuss prompts, real cases, tools, and practical image workflows.',
    subtitle: 'A one-time Alipay payment of ¥9.90. Access is tied to your account and can be restored on another device.',
    priceSuffix: 'one time',
    benefitsTitle: 'What the group covers',
    benefits: ['GPT-Image2 prompt and case breakdowns', 'Image tools, model behavior, and practical workflows', 'Peer discussion grounded in real attempts'],
    audienceTitle: 'A good fit for',
    audience: ['People using AI for images or content production', 'People turning scattered prompts into stable workflows', 'People willing to share and respect the community'],
    boundaryTitle: 'Service boundaries',
    boundaries: ['No promise of one-to-one service or fixed answer frequency', 'No promise of exclusive materials, income, or permanent activity', 'Spam, unlawful behavior, or disruption may lead to access revocation'],
    checking: 'Checking your account and payment access…',
    loginTitle: 'Sign in to buy or restore access',
    loginText: 'Access is tied to your existing account so the group QR stays protected and works across devices.',
    availableTitle: 'Ready when you are',
    availableText: 'The server fixes the price at ¥9.90. Payment is confirmed only by a server-side Alipay query or verified notification.',
    terms: 'I agree that this is a peer discussion group, not one-to-one support, fixed Q&A, exclusive materials, or an income guarantee. Refunds require manual review.',
    pay: 'Pay ¥9.90 with Alipay',
    redirecting: 'Opening Alipay checkout…',
    pendingTitle: 'Payment pending or being confirmed',
    pendingText: 'Do not pay twice. Query the same order after payment; access is restored after a verified notification or server-side query.',
    query: 'Query payment again',
    closeOrder: 'Close pending order',
    paidTitle: 'Payment access confirmed',
    paidText: 'Scan the protected QR below with WeChat. It is available only to the signed-in paid account.',
    qrUpdatingTitle: 'Paid — group QR is being updated',
    qrUpdatingText: 'The administrator has not uploaded the current QR yet, or is replacing it. Your paid access remains valid.',
    pausedTitle: 'New payments are paused',
    pausedText: 'Paid users still retain QR access, while refunds and administrator operations continue.',
    refundedTitle: 'This order was refunded',
    refundedText: 'Alipay confirmed the refund, so QR access from this order is no longer active.',
    revokedTitle: 'This access was revoked',
    revokedText: 'Contact the administrator through the support channel below if you need help.',
    failedTitle: 'The operation could not be completed',
    retry: 'Retry',
    support: 'Official account and support',
    supportText: 'Follow the WeChat official account 苍何, or search 苍何 in WeChat. Message the account for payment, access, refund, or product questions.',
    supportQrAlt: 'QR code and WeChat search card for the 苍何 official account',
    resultEyebrow: 'Alipay result',
    resultTitle: 'The server is confirming this order.',
    resultText: 'URL parameters are never treated as proof of payment. This page only shows server-verified status.',
    qrAlt: 'GPT-Image2 paid community QR code',
    noOrder: 'This account has no paid-community order to query.',
    statusLabels: {
      PENDING: 'Pending', PAID: 'Paid', CLOSED: 'Closed', REFUNDED: 'Refunded', REVOKED: 'Revoked'
    }
  }
};

function authHeaders(session) {
  return session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {};
}

function submitPaymentForm(paymentHtml) {
  const container = document.createElement('div');
  container.className = 'communityPaymentHandoff';
  container.innerHTML = paymentHtml;
  document.body.appendChild(container);
  const form = container.querySelector('form');
  if (!form) {
    container.remove();
    throw new Error('PAYMENT_FORM_INVALID');
  }
  form.submit();
}

function CommunityStateCard({ icon, title, children, tone = '', actions = null }) {
  return (
    <section className={`communityStateCard ${tone}`.trim()}>
      <span className="communityStateIcon">{icon}</span>
      <div>
        <h2>{title}</h2>
        {children}
        {actions ? <div className="communityStateActions">{actions}</div> : null}
      </div>
    </section>
  );
}

export function CommunityPage({
  language,
  setLanguage,
  authReady,
  session,
  profile,
  onSignIn,
  onSignOut,
  onOpenAdmin
}) {
  const t = communityCopy[language] || communityCopy.en;
  const [config, setConfig] = useState(null);
  const [communityStatus, setCommunityStatus] = useState(null);
  const [phase, setPhase] = useState('checking');
  const [message, setMessage] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [qrUrl, setQrUrl] = useState('');
  const [qrState, setQrState] = useState('idle');
  const resultQueryRef = useRef('');
  const isResultPage = window.location.pathname.replace(/\/+$/, '') === '/community/result';
  const resultOrderId = useMemo(
    () => new URLSearchParams(window.location.search).get('order_id') || '',
    []
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = language === 'ko'
      ? 'GPT-Image2 유료 커뮤니티'
      : 'GPT-Image2 Paid Community';
    return () => { document.title = previousTitle; };
  }, [language]);

  const loadQr = useCallback(async () => {
    if (!session?.access_token) return;
    setQrState('loading');
    try {
      const response = await fetch('/api/community/qr', {
        headers: authHeaders(session),
        cache: 'no-store'
      });
      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        if (payload.error === 'COMMUNITY_QR_NOT_READY') {
          setQrState('missing');
          return;
        }
        throw new Error(payload.error || 'COMMUNITY_QR_FAILED');
      }
      const blob = await response.blob();
      const nextUrl = URL.createObjectURL(blob);
      setQrUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return nextUrl;
      });
      setQrState('ready');
    } catch (error) {
      setQrState('error');
      setMessage(String(error?.message || 'COMMUNITY_QR_FAILED'));
      throw error;
    }
  }, [session?.access_token]);

  const loadStatus = useCallback(async () => {
    const response = await fetch('/api/community/status', {
      headers: authHeaders(session),
      cache: 'no-store'
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.ok) throw new Error(payload.error || 'COMMUNITY_STATUS_FAILED');
    setCommunityStatus(payload);
    if (payload.eligible && payload.qrReady) await loadQr();
    else {
      setQrState(payload.eligible ? 'missing' : 'idle');
      setQrUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return '';
      });
    }
    return payload;
  }, [loadQr, session?.access_token]);

  useEffect(() => {
    if (!authReady) return undefined;
    let cancelled = false;
    setPhase('checking');
    setMessage('');
    Promise.all([
      fetch('/api/community/config', { cache: 'no-store' }).then((response) => response.json()),
      loadStatus()
    ])
      .then(([configPayload]) => {
        if (cancelled) return;
        if (!configPayload?.ok) throw new Error(configPayload?.error || 'COMMUNITY_CONFIG_FAILED');
        setConfig(configPayload);
        setPhase('ready');
      })
      .catch((error) => {
        if (!cancelled) {
          setMessage(String(error?.message || 'COMMUNITY_STATUS_FAILED'));
          setPhase('failed');
        }
      });
    return () => { cancelled = true; };
  }, [authReady, loadStatus, session?.access_token]);

  useEffect(() => () => {
    if (qrUrl) URL.revokeObjectURL(qrUrl);
  }, [qrUrl]);

  useEffect(() => {
    if (!authReady || !session?.access_token || !isResultPage || !resultOrderId) return undefined;
    const key = `${session.user?.id || ''}:${resultOrderId}`;
    if (resultQueryRef.current === key) return undefined;
    resultQueryRef.current = key;
    let cancelled = false;
    let timeoutId;

    async function confirmAndPoll() {
      setPhase('checking');
      try {
        const response = await fetch(`/api/community/alipay/query?orderId=${encodeURIComponent(resultOrderId)}`, {
          headers: authHeaders(session),
          cache: 'no-store'
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok && payload.error !== 'COMMUNITY_QUERY_FAILED') {
          throw new Error(payload.error || 'COMMUNITY_QUERY_FAILED');
        }

        let latest = await loadStatus();
        setPhase('ready');
        for (let attempt = 0; attempt < 6 && !cancelled && latest.order?.status === 'PENDING'; attempt += 1) {
          await new Promise((resolve) => {
            timeoutId = window.setTimeout(resolve, 2500);
          });
          if (cancelled) return;
          latest = await loadStatus();
        }
      } catch (error) {
        if (!cancelled) {
          setMessage(String(error?.message || 'COMMUNITY_QUERY_FAILED'));
          setPhase('failed');
        }
      }
    }
    confirmAndPoll();
    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [authReady, isResultPage, loadStatus, resultOrderId, session?.access_token, session?.user?.id]);

  async function handleCheckout() {
    if (!acceptedTerms || !session?.access_token) return;
    setPhase('redirecting');
    setMessage('');
    try {
      const response = await fetch('/api/community/alipay/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(session)
        },
        body: JSON.stringify({ acceptedTerms: true, termsVersion: TERMS_VERSION })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error || 'COMMUNITY_CHECKOUT_FAILED');
      if (payload.paid) {
        await loadStatus();
        setPhase('ready');
        return;
      }
      submitPaymentForm(payload.paymentHtml);
    } catch (error) {
      setMessage(String(error?.message || 'COMMUNITY_CHECKOUT_FAILED'));
      setPhase('failed');
    }
  }

  async function handleRefreshStatus() {
    setPhase('checking');
    setMessage('');
    try {
      await loadStatus();
      setPhase('ready');
    } catch (error) {
      setMessage(String(error?.message || 'COMMUNITY_STATUS_FAILED'));
      setPhase('failed');
    }
  }

  async function handleQuery() {
    const orderId = communityStatus?.order?.id;
    if (!orderId) return;
    setPhase('checking');
    setMessage('');
    try {
      const response = await fetch(`/api/community/alipay/query?orderId=${encodeURIComponent(orderId)}`, {
        headers: authHeaders(session),
        cache: 'no-store'
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error || 'COMMUNITY_QUERY_FAILED');
      await loadStatus();
      setPhase('ready');
    } catch (error) {
      setMessage(String(error?.message || 'COMMUNITY_QUERY_FAILED'));
      setPhase('failed');
    }
  }

  async function handleClose() {
    const orderId = communityStatus?.order?.id;
    if (!orderId) return;
    setPhase('checking');
    setMessage('');
    try {
      const response = await fetch('/api/community/alipay/close', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(session)
        },
        body: JSON.stringify({ orderId })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error || 'COMMUNITY_CLOSE_FAILED');
      await loadStatus();
      setPhase('ready');
    } catch (error) {
      setMessage(String(error?.message || 'COMMUNITY_CLOSE_FAILED'));
      setPhase('failed');
    }
  }

  const orderStatus = communityStatus?.order?.status || '';
  const paymentEnabled = Boolean(communityStatus?.paymentEnabled ?? config?.paymentEnabled);
  let view = 'available';
  if (!authReady || phase === 'checking') view = 'checking';
  else if (phase === 'redirecting') view = 'redirecting';
  else if (phase === 'failed') view = 'failed';
  else if (!session?.access_token) view = 'login';
  else if (orderStatus === 'REFUNDED') view = 'refunded';
  else if (orderStatus === 'REVOKED') view = 'revoked';
  else if (communityStatus?.eligible && (qrState === 'missing' || !communityStatus.qrReady)) view = 'qrUpdating';
  else if (communityStatus?.eligible) view = 'paid';
  else if (orderStatus === 'PENDING') view = 'pending';
  else if (!paymentEnabled) view = 'paused';

  return (
    <div className="communityPage">
      <header className="communityTopbar">
        <a className="communityBrand" href="/community"><Users size={20} />{t.brand}</a>
        <nav>
          <a href="/"><ArrowLeft size={16} />{t.back}</a>
          <div className="communityLanguage" aria-label={language === 'ko' ? '언어' : 'Language'}>
            <button className={language === 'ko' ? 'active' : ''} type="button" onClick={() => setLanguage('ko')}>KO</button>
            <button className={language === 'en' ? 'active' : ''} type="button" onClick={() => setLanguage('en')}>EN</button>
          </div>
          {profile?.isSuperAdmin ? <button type="button" onClick={onOpenAdmin}><Wrench size={16} />{t.admin}</button> : null}
          {session?.access_token
            ? <button type="button" onClick={onSignOut}><LogOut size={16} />{t.signOut}</button>
            : <button type="button" onClick={onSignIn}><LogIn size={16} />{t.signIn}</button>}
        </nav>
      </header>

      <main className="communityMain">
        <section className="communityHero">
          <div>
            <span className="communityEyebrow"><Sparkles size={15} />{isResultPage ? t.resultEyebrow : t.eyebrow}</span>
            <h1>{isResultPage ? t.resultTitle : t.title}</h1>
            <p>{isResultPage ? t.resultText : t.subtitle}</p>
          </div>
          <div className="communityPrice">
            <span>¥</span><strong>9.90</strong><em>{t.priceSuffix}</em>
          </div>
        </section>

        <section className="communityContentGrid">
          <div className="communityPrimary">
            {view === 'checking' ? (
              <CommunityStateCard icon={<LoaderCircle className="spinIcon" size={24} />} title={t.checking} />
            ) : null}
            {view === 'redirecting' ? (
              <CommunityStateCard icon={<LoaderCircle className="spinIcon" size={24} />} title={t.redirecting} />
            ) : null}
            {view === 'login' ? (
              <CommunityStateCard
                icon={<LockKeyhole size={24} />}
                title={t.loginTitle}
                actions={<button type="button" onClick={onSignIn}><LogIn size={17} />{t.signIn}</button>}
              ><p>{t.loginText}</p></CommunityStateCard>
            ) : null}
            {view === 'available' ? (
              <CommunityStateCard icon={<CreditCard size={24} />} title={t.availableTitle}>
                <p>{t.availableText}</p>
                <label className="communityTerms">
                  <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
                  <span>{t.terms}</span>
                </label>
                <button className="communityPayButton" type="button" disabled={!acceptedTerms} onClick={handleCheckout}>
                  <CreditCard size={18} />{t.pay}
                </button>
              </CommunityStateCard>
            ) : null}
            {view === 'pending' ? (
              <CommunityStateCard
                icon={<Clock3 size={24} />}
                title={t.pendingTitle}
                tone="pending"
                actions={<><button type="button" onClick={handleQuery}><RefreshCw size={17} />{t.query}</button><button className="secondary" type="button" onClick={handleClose}>{t.closeOrder}</button></>}
              ><p>{t.pendingText}</p></CommunityStateCard>
            ) : null}
            {view === 'paid' ? (
              <CommunityStateCard icon={<CheckCircle2 size={24} />} title={t.paidTitle} tone="success">
                <p>{t.paidText}</p>
                {qrUrl ? <img className="communityProtectedQr" src={qrUrl} alt={t.qrAlt} /> : null}
              </CommunityStateCard>
            ) : null}
            {view === 'qrUpdating' ? (
              <CommunityStateCard
                icon={<ImageUp size={24} />}
                title={t.qrUpdatingTitle}
                tone="pending"
                actions={<button type="button" onClick={handleRefreshStatus}><RefreshCw size={17} />{t.retry}</button>}
              ><p>{t.qrUpdatingText}</p></CommunityStateCard>
            ) : null}
            {view === 'paused' ? (
              <CommunityStateCard icon={<CircleAlert size={24} />} title={t.pausedTitle} tone="paused"><p>{t.pausedText}</p></CommunityStateCard>
            ) : null}
            {view === 'refunded' ? (
              <CommunityStateCard icon={<RotateCcw size={24} />} title={t.refundedTitle} tone="muted"><p>{t.refundedText}</p></CommunityStateCard>
            ) : null}
            {view === 'revoked' ? (
              <CommunityStateCard icon={<LockKeyhole size={24} />} title={t.revokedTitle} tone="muted"><p>{t.revokedText}</p></CommunityStateCard>
            ) : null}
            {view === 'failed' ? (
              <CommunityStateCard
                icon={<CircleAlert size={24} />}
                title={t.failedTitle}
                tone="error"
                actions={<button type="button" onClick={() => { setPhase('checking'); loadStatus().then(() => setPhase('ready')).catch((error) => { setMessage(String(error?.message || 'COMMUNITY_STATUS_FAILED')); setPhase('failed'); }); }}><RefreshCw size={17} />{t.retry}</button>}
              ><p>{message}</p></CommunityStateCard>
            ) : null}
            {isResultPage && authReady && session?.access_token && !resultOrderId ? (
              <p className="communityInlineNotice">{t.noOrder}</p>
            ) : null}
            {communityStatus?.order ? (
              <div className="communityOrderBadge">
                <ShieldCheck size={15} />
                <span>{t.statusLabels[communityStatus.order.status] || communityStatus.order.status}</span>
                <code>{communityStatus.order.id}</code>
              </div>
            ) : null}
          </div>

          <aside className="communitySidebar">
            <section><h2>{t.benefitsTitle}</h2><ul>{t.benefits.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></section>
            <section><h2>{t.audienceTitle}</h2><ul>{t.audience.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></section>
            <section className="boundary"><h2>{t.boundaryTitle}</h2><ul>{t.boundaries.map((item) => <li key={item}><ShieldCheck size={16} />{item}</li>)}</ul></section>
          </aside>
        </section>

        <section className="communitySupport">
          <MessageCircle size={21} />
          <div><h2>{t.support}</h2><p>{config?.support || t.supportText}</p><small>{t.supportText}</small></div>
          <img className="communitySupportQr" src={officialAccountQr} alt={t.supportQrAlt} />
        </section>
      </main>
    </div>
  );
}

export function CommunityAdminSection({ language, session }) {
  const isKorean = language === 'ko';
  const [orders, setOrders] = useState([]);
  const [qrMeta, setQrMeta] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [busyId, setBusyId] = useState('');

  const loadData = useCallback(async () => {
    if (!session?.access_token) return;
    setStatus('loading');
    setMessage('');
    try {
      const headers = authHeaders(session);
      const [ordersResponse, qrResponse] = await Promise.all([
        fetch('/api/admin/community/orders', { headers, cache: 'no-store' }),
        fetch('/api/admin/community/qr?metadata=1', { headers, cache: 'no-store' })
      ]);
      const ordersPayload = await ordersResponse.json().catch(() => ({}));
      if (!ordersResponse.ok || !ordersPayload.ok) throw new Error(ordersPayload.error || 'COMMUNITY_ADMIN_ORDERS_FAILED');
      setOrders(ordersPayload.orders || []);
      if (qrResponse.ok) {
        const qrPayload = await qrResponse.json().catch(() => ({}));
        setQrMeta(qrPayload.asset || null);
        const imageResponse = await fetch(`/api/admin/community/qr?v=${encodeURIComponent(qrPayload.asset?.id || '')}`, {
          headers,
          cache: 'no-store'
        });
        if (imageResponse.ok) {
          const nextUrl = URL.createObjectURL(await imageResponse.blob());
          setQrUrl((current) => {
            if (current) URL.revokeObjectURL(current);
            return nextUrl;
          });
        }
      } else if (qrResponse.status === 404) {
        setQrMeta(null);
        setQrUrl((current) => {
          if (current) URL.revokeObjectURL(current);
          return '';
        });
      } else {
        const qrPayload = await qrResponse.json().catch(() => ({}));
        throw new Error(qrPayload.error || 'COMMUNITY_QR_FAILED');
      }
      setStatus('ready');
    } catch (error) {
      setMessage(String(error?.message || 'COMMUNITY_ADMIN_FAILED'));
      setStatus('error');
    }
  }, [session?.access_token]);

  useEffect(() => { loadData(); }, [loadData]);
  useEffect(() => () => { if (qrUrl) URL.revokeObjectURL(qrUrl); }, [qrUrl]);

  async function uploadQr(event) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) {
      setMessage(isKorean ? '2MB 이하의 PNG, JPEG 또는 WebP 파일만 지원합니다.' : 'Use a PNG, JPEG, or WebP file under 2 MB.');
      return;
    }
    setStatus('loading');
    try {
      const response = await fetch('/api/admin/community/qr', {
        method: 'POST',
        headers: { 'Content-Type': file.type, ...authHeaders(session) },
        body: file
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error || 'COMMUNITY_QR_UPLOAD_FAILED');
      await loadData();
      setMessage(isKorean ? '커뮤니티 QR 코드를 안전하게 교체했습니다.' : 'The group QR was replaced atomically.');
    } catch (error) {
      setMessage(String(error?.message || 'COMMUNITY_QR_UPLOAD_FAILED'));
      setStatus('error');
    }
  }

  async function orderAction(order, action) {
    const destructive = action === 'refund' || action === 'revoke';
    if (destructive && !window.confirm(isKorean ? '이 주문에 이 작업을 수행하시겠습니까?' : 'Confirm this order action?')) return;
    setBusyId(`${action}:${order.id}`);
    setMessage('');
    try {
      const isQuery = action === 'refund-query';
      const url = isQuery
        ? `/api/admin/community/refund-query?orderId=${encodeURIComponent(order.id)}`
        : `/api/admin/community/${action}`;
      const response = await fetch(url, {
        method: isQuery ? 'GET' : 'POST',
        headers: isQuery ? authHeaders(session) : { 'Content-Type': 'application/json', ...authHeaders(session) },
        body: isQuery ? undefined : JSON.stringify({ orderId: order.id })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.error || 'COMMUNITY_ADMIN_ACTION_FAILED');
      await loadData();
      setMessage(isKorean ? '주문 상태를 업데이트했습니다.' : 'Order status updated.');
    } catch (error) {
      setMessage(String(error?.message || 'COMMUNITY_ADMIN_ACTION_FAILED'));
    } finally {
      setBusyId('');
    }
  }

  return (
    <section className="communityAdminBlock">
      <div className="communityAdminHeader">
        <div><span><Users size={17} />{isKorean ? '유료 커뮤니티' : 'Paid community'}</span><h3>{isKorean ? '주문, QR 코드, 환불' : 'Orders, QR, and refunds'}</h3></div>
        <button type="button" onClick={loadData} disabled={status === 'loading'}><RefreshCw size={16} />{isKorean ? '새로고침' : 'Refresh'}</button>
      </div>
      <div className="communityAdminQr">
        {qrUrl ? <img src={qrUrl} alt={isKorean ? '현재 유료 커뮤니티 QR 코드' : 'Current paid group QR'} /> : <div><ImageUp size={28} /><span>{isKorean ? '보호된 커뮤니티 QR 코드가 아직 업로드되지 않았습니다' : 'No protected QR uploaded'}</span></div>}
        <label><ImageUp size={16} />{qrMeta ? (isKorean ? '커뮤니티 QR 코드 교체' : 'Replace QR') : (isKorean ? '커뮤니티 QR 코드 업로드' : 'Upload QR')}<input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadQr} /></label>
        {qrMeta ? <small>{qrMeta.mediaType} · {Math.ceil(qrMeta.sizeBytes / 1024)} KB</small> : null}
      </div>
      {message ? <p className="communityAdminMessage">{message}</p> : null}
      <div className="communityAdminTableWrap">
        <table>
          <thead><tr><th>{isKorean ? '계정' : 'Account'}</th><th>{isKorean ? '상태' : 'Status'}</th><th>{isKorean ? '금액' : 'Amount'}</th><th>{isKorean ? '결제 시각' : 'Paid at'}</th><th>{isKorean ? '환불 상태' : 'Refund'}</th><th>{isKorean ? '작업' : 'Actions'}</th></tr></thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td><strong>{order.email || order.userId}</strong><small>{order.id}</small></td>
                <td><span className={`communityOrderStatus ${order.status.toLowerCase()}`}>{order.status}</span></td>
                <td>¥{(order.amountCents / 100).toFixed(2)}</td>
                <td>{order.paidAt ? new Date(order.paidAt).toLocaleString(isKorean ? 'ko-KR' : 'en-US') : '—'}</td>
                <td>{order.refundStatus}</td>
                <td><div className="communityAdminActions">
                  {order.status === 'PAID' && order.refundStatus !== 'PROCESSING' ? <button type="button" disabled={Boolean(busyId)} onClick={() => orderAction(order, 'refund')}>{isKorean ? '환불' : 'Refund'}</button> : null}
                  {order.status === 'PAID' && order.refundStatus === 'PROCESSING' ? <button type="button" disabled={Boolean(busyId)} onClick={() => orderAction(order, 'refund-query')}>{isKorean ? '환불 조회' : 'Query refund'}</button> : null}
                  {order.status === 'PAID' && order.refundStatus !== 'PROCESSING' ? <button className="danger" type="button" disabled={Boolean(busyId)} onClick={() => orderAction(order, 'revoke')}>{isKorean ? '이용권 취소' : 'Revoke'}</button> : null}
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {!orders.length && status !== 'loading' ? <p>{isKorean ? '유료 커뮤니티 주문이 없습니다.' : 'No paid-community orders yet.'}</p> : null}
      </div>
    </section>
  );
}
