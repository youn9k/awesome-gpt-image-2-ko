import Stripe from 'stripe';

const STRIPE_API_VERSION = '2026-02-25.clover';
const DEFAULT_APP_URL = 'https://gpt-image2.canghe.ai';

let stripeClient;

// Keep Korean product copy available during the rolling migration from *_zh to
// *_ko. Once the database migration has run, each row's *_ko value wins.
// Unknown legacy products deliberately fall back to English rather than
// exposing their old Chinese copy in the Korean product and payment UI.
const LEGACY_KOREAN_PRODUCT_COPY = Object.freeze({
  starter: {
    name: '입문 멤버십',
    description: '매월 700 크레딧으로 가벼운 프롬프트 테스트와 일상 이미지 실험에 적합합니다.'
  },
  creator: {
    name: '크리에이터 멤버십',
    description: '매월 1,800 크레딧으로 사례 재활용, 콘텐츠 제작, 프롬프트 테스트를 자주 하는 데 적합합니다.'
  },
  studio: {
    name: '스튜디오 멤버십',
    description: '매월 5,200 크레딧으로 고빈도 GPT-Image2 워크플로와 소규모 팀에 적합합니다.'
  },
  pack_30: {
    name: '30 크레딧 팩',
    description: '더 많은 사례를 계속 시도하기에 적합합니다.'
  },
  pack_120: {
    name: '120 크레딧 팩',
    description: '정기적인 프롬프트 테스트에 적합합니다.'
  },
  pack_360: {
    name: '360 크레딧 팩',
    description: '대량 콘텐츠 제작과 소규모 팀에 적합합니다.'
  },
  pack_300: {
    name: '300 크레딧 팩',
    description: '더 많은 GPT-Image2 사례를 테스트하기 위한 입문 팩입니다.'
  },
  pack_1000: {
    name: '1,000 크레딧 팩',
    description: '정기적인 프롬프트 테스트와 시각적 반복을 위한 크리에이터 팩입니다.'
  },
  pack_3000: {
    name: '3,000 크레딧 팩',
    description: '대량 콘텐츠 제작과 소규모 팀을 위한 고빈도 팩입니다.'
  }
});

function koreanProductCopy(row, field) {
  return row[`${field}_ko`]
    || LEGACY_KOREAN_PRODUCT_COPY[row.id]?.[field]
    || row[`${field}_en`]
    || '';
}

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripeClient() {
  if (!isStripeConfigured()) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: STRIPE_API_VERSION
    });
  }
  return stripeClient;
}

export function getAppUrl(req) {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, '');
  const host = req?.headers?.['x-forwarded-host'] || req?.headers?.host;
  const protocol = req?.headers?.['x-forwarded-proto'] || 'https';
  return host ? `${protocol}://${host}` : DEFAULT_APP_URL;
}

export async function readJsonBody(req) {
  if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString('utf8') || '{}');
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body || '{}');

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return raw ? JSON.parse(raw) : {};
}

export async function readRawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === 'string') return Buffer.from(req.body, 'utf8');

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function normalizeCurrency(value) {
  return String(value || 'usd').toLowerCase();
}

function moneyLabel(amountCents, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: normalizeCurrency(currency).toUpperCase()
  }).format(Number(amountCents || 0) / 100);
}

export function formatPlan(row) {
  return {
    id: row.id,
    type: 'membership',
    name: {
      en: row.name_en,
      ko: koreanProductCopy(row, 'name')
    },
    description: {
      en: row.description_en,
      ko: koreanProductCopy(row, 'description')
    },
    monthlyCredits: Number(row.monthly_credits || 0),
    amountCents: Number(row.amount_cents || 0),
    currency: normalizeCurrency(row.currency),
    interval: row.interval || 'month',
    priceLabel: moneyLabel(row.amount_cents, row.currency),
    active: Boolean(row.active)
  };
}

export function formatPack(row) {
  const alipayAmountCents = Number(row.alipay_amount_cents || 0);
  return {
    id: row.id,
    type: 'credit_pack',
    name: {
      en: row.name_en,
      ko: koreanProductCopy(row, 'name')
    },
    description: {
      en: row.description_en,
      ko: koreanProductCopy(row, 'description')
    },
    credits: Number(row.credits || 0),
    amountCents: Number(row.amount_cents || 0),
    currency: normalizeCurrency(row.currency),
    priceLabel: moneyLabel(row.amount_cents, row.currency),
    alipayAmountCents,
    alipayPriceLabel: alipayAmountCents > 0 ? moneyLabel(alipayAmountCents, 'cny') : '',
    alipayAvailable: alipayAmountCents > 0,
    active: Boolean(row.active)
  };
}

export async function getBillingCatalog(client) {
  const [plansResult, packsResult] = await Promise.all([
    client
      .from('membership_plans')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true }),
    client
      .from('credit_packs')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true })
  ]);

  if (plansResult.error) throw plansResult.error;
  if (packsResult.error) throw packsResult.error;

  return {
    plans: (plansResult.data || []).map(formatPlan),
    packs: (packsResult.data || []).map(formatPack)
  };
}

export async function getBillingProduct(client, productType, productId) {
  const table = productType === 'membership' ? 'membership_plans' : 'credit_packs';
  const { data, error } = await client
    .from(table)
    .select('*')
    .eq('id', productId)
    .eq('active', true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return productType === 'membership' ? formatPlan(data) : formatPack(data);
}

export async function getOrCreateStripeCustomer({ client, stripe, user, profile }) {
  if (profile?.stripeCustomerId) return profile.stripeCustomerId;

  const customer = await stripe.customers.create({
    email: profile?.email || user.email || undefined,
    name: profile?.fullName || undefined,
    metadata: {
      userId: user.id
    }
  });

  const { error } = await client
    .from('profiles')
    .update({ stripe_customer_id: customer.id })
    .eq('id', user.id);

  if (error) throw error;
  return customer.id;
}

export function checkoutLineItem(product) {
  const priceData = {
    currency: product.currency,
    unit_amount: product.amountCents,
    product_data: {
      name: product.name.en,
      description: product.description.en,
      metadata: {
        productType: product.type,
        productId: product.id
      }
    }
  };

  if (product.type === 'membership') {
    priceData.recurring = {
      interval: product.interval || 'month'
    };
  }

  return {
    quantity: 1,
    price_data: priceData
  };
}

export async function createPaymentOrder(client, {
  userId,
  product,
  customerId = null,
  paymentProvider = 'stripe',
  metadata = {}
}) {
  const credits = product.type === 'membership' ? product.monthlyCredits : product.credits;
  const { data, error } = await client
    .from('payment_orders')
    .insert({
      user_id: userId,
      product_type: product.type,
      product_id: product.id,
      status: 'created',
      payment_provider: paymentProvider,
      stripe_customer_id: customerId,
      amount_cents: product.amountCents,
      currency: product.currency,
      credits,
      metadata: {
        ...metadata,
        paymentProvider
      }
    })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function markOrderCheckoutCreated(client, orderId, session) {
  const { data, error } = await client
    .from('payment_orders')
    .update({
      status: 'checkout_created',
      stripe_session_id: session.id,
      stripe_customer_id: typeof session.customer === 'string' ? session.customer : null,
      stripe_subscription_id: typeof session.subscription === 'string' ? session.subscription : null,
      metadata: {
        paymentProvider: 'stripe',
        checkoutUrl: session.url || ''
      }
    })
    .eq('id', orderId)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

function stripeTimestampToIso(value) {
  return value ? new Date(value * 1000).toISOString() : null;
}

function normalizeSubscriptionStatus(status) {
  if (['trialing', 'active', 'past_due', 'canceled', 'unpaid'].includes(status)) return status;
  return 'inactive';
}

export async function upsertMembershipFromSubscription(client, subscription, fallback = {}) {
  const userId = subscription.metadata?.userId || fallback.userId;
  const planId = subscription.metadata?.productId || subscription.metadata?.planId || fallback.planId;
  if (!userId || !planId) return null;

  const item = subscription.items?.data?.[0] || {};
  const payload = {
    user_id: userId,
    plan_id: planId,
    status: normalizeSubscriptionStatus(subscription.status),
    stripe_customer_id: typeof subscription.customer === 'string' ? subscription.customer : fallback.customerId || null,
    stripe_subscription_id: subscription.id,
    current_period_start: stripeTimestampToIso(subscription.current_period_start || item.current_period_start),
    current_period_end: stripeTimestampToIso(subscription.current_period_end || item.current_period_end),
    cancel_at_period_end: Boolean(subscription.cancel_at_period_end)
  };

  const { data, error } = await client
    .from('user_memberships')
    .upsert(payload, { onConflict: 'user_id' })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

async function hasTransactionWithMetadata(client, userId, source, metadata) {
  const { data, error } = await client
    .from('credit_transactions')
    .select('id')
    .eq('user_id', userId)
    .eq('source', source)
    .contains('metadata', metadata)
    .limit(1);

  if (error) throw error;
  return Boolean(data?.length);
}

export async function grantCredits(client, { userId, amount, type, source, referenceId = null, metadata = {} }) {
  const { data, error } = await client.rpc('grant_user_credits', {
    p_user_id: userId,
    p_amount: amount,
    p_type: type,
    p_source: source,
    p_reference_id: referenceId,
    p_metadata: metadata
  });

  if (error) throw error;
  return Array.isArray(data) ? data[0] : data;
}

export async function completeCreditPackOrder(client, session) {
  const { data: order, error } = await client
    .from('payment_orders')
    .select('*')
    .eq('stripe_session_id', session.id)
    .maybeSingle();

  if (error) throw error;
  if (!order || order.status === 'completed') return order || null;
  if (order.product_type !== 'credit_pack') return order;

  await grantCredits(client, {
    userId: order.user_id,
    amount: Number(order.credits || 0),
    type: 'purchase',
    source: 'stripe_checkout',
    referenceId: order.id,
    metadata: {
      stripeSessionId: session.id,
      productId: order.product_id
    }
  });

  const { data, error: updateError } = await client
    .from('payment_orders')
    .update({
      status: 'completed',
      stripe_customer_id: typeof session.customer === 'string' ? session.customer : order.stripe_customer_id,
      completed_at: new Date().toISOString()
    })
    .eq('id', order.id)
    .select('*')
    .single();

  if (updateError) throw updateError;
  return data;
}

export async function grantMembershipCredits(client, { userId, planId, source, metadata, orderId = null }) {
  const { data: plan, error } = await client
    .from('membership_plans')
    .select('*')
    .eq('id', planId)
    .maybeSingle();

  if (error) throw error;
  if (!plan || !plan.active) return null;

  if (await hasTransactionWithMetadata(client, userId, source, metadata)) {
    return null;
  }

  await grantCredits(client, {
    userId,
    amount: Number(plan.monthly_credits || 0),
    type: 'membership_grant',
    source,
    referenceId: orderId,
    metadata: {
      ...metadata,
      planId,
      monthlyCredits: Number(plan.monthly_credits || 0)
    }
  });

  await client
    .from('user_memberships')
    .update({ monthly_credits_granted_at: new Date().toISOString() })
    .eq('user_id', userId);

  return plan;
}
