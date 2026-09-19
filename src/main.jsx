import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  ChevronDown,
  Check,
  Coins,
  Copy,
  CreditCard,
  Crown,
  Eye,
  EyeOff,
  Github,
  Heart,
  ImageIcon,
  KeyRound,
  LoaderCircle,
  LogIn,
  LogOut,
  PackageCheck,
  RefreshCw,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  TrendingUp,
  UserCircle,
  UserPlus,
  Users,
  WandSparkles,
  X
} from 'lucide-react';
import './styles.css';
import { isSupabaseConfigured, supabase } from './supabaseClient';
import {
  clearPendingGeneration,
  clearStoredApimartKey,
  cleanupExpiredGeneratedTests,
  fetchPersonalTask,
  fetchPlatformTask,
  getPendingGeneration,
  getSavedGeneration,
  getStoredApimartKey,
  maskApimartKey,
  pollApimartTask,
  saveGeneratedTest,
  savePendingGeneration,
  saveStoredApimartKey,
  submitPersonalGeneration,
  submitPlatformGeneration,
  verifyPersonalApimartKey
} from './apimartClient';
import {
  APIMART_DEFAULT_PRICE_USD,
  APIMART_MAX_PROMPT_LENGTH,
  APIMART_PRICE_SNAPSHOT_DATE,
  apimartTaskErrorCode
} from '../shared/apimart';
import { CommunityAdminSection, CommunityPage } from './community';
import skillExampleImage from '../agents/skills/gpt-image-2-style-library/assets/city-life-system-map.png';

const fallbackRepoUrl = 'https://github.com/freestylefly/awesome-gpt-image-2';
const sponsorUrl = 'https://apimart.ai/register?aff=oQgzUQ';
const apimartKeysUrl = 'https://apimart.ai/keys';
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const watchaLogoUrl =
  'https://watcha.tos-cn-beijing.volces.com/products/logo/1752064513_guan-cha-insights.png?x-tos-process=image/resize,w_720/format,webp';

const copy = {
  en: {
    loading: 'Loading GPT-Image2 cases...',
    brand: 'GPT-Image2 Gallery',
    navCases: 'Cases',
    navSkill: 'Skill',
    navTemplates: 'Templates',
    navCommunity: 'Community',
    navSponsor: 'API',
    navMembership: 'Membership',
    communityQrAlt: 'WeChat community invite card for GPT-Image2',
    eyebrow: 'Live GPT-Image2 prompt gallery',
    title: 'From viral images to reusable prompts.',
    subtitle:
      'A visual workspace for GPT-Image2 creation: browse real cases, copy prompts, test image generation, explore industrial templates, and join the creator community.',
    explore: 'Explore cases',
    githubProject: 'GitHub project',
    sponsorProject: 'API',
    sponsorProjectLabel: 'Open APIMart API',
    cases: 'cases',
    categories: 'categories',
    templates: 'templates',
    sectionEyebrow: 'Copy, filter, remix',
    sectionTitle: 'Viral cases with prompts one click away.',
    templateEyebrow: '20+ industrial prompt templates',
    templateTitle: 'Start from a proven template, then remix the case library.',
    templateSubtitle:
      'Each template is distilled from real GPT-Image2 examples and includes structure, constraints, and pitfalls for production use.',
    templateKind: 'Prompt Template',
    openTemplate: 'Open Template',
    skillEyebrow: 'Agent skill',
    skillTitle: 'Bring the GPT-Image2 style library into Claude Code and Codex.',
    skillSubtitle:
      'Install one skill, then let your agent choose templates, visual styles, scene tags, and pitfalls from the same library behind this site.',
    skillCommandLabel: 'Install for local agents',
    skillPromptLabel: 'Try this request',
    skillPrompt: 'Use gpt-image-2-style-library to create a city life system map.',
    skillCopyCommand: 'Copy command',
    skillOpenDocs: 'Open skill source',
    skillNpm: 'View npm package',
    skillCopied: 'Command copied',
    skillExampleAlt: 'City life system map generated with the GPT-Image2 style library skill',
    skillExampleCaption: 'Example output generated from the style-library skill.',
    skillStats: ['Claude Code ready', 'Codex ready', '20+ templates'],
    search: 'Search cases, sources, prompts...',
    category: 'Category',
    style: 'Style',
    scene: 'Scene',
    all: 'All',
    matching: 'matching cases',
    openGithub: 'Open GitHub project',
    copied: 'Copied',
    copyPrompt: 'Copy Prompt',
    copyTemplatePrompt: 'Copy Template',
    favorite: 'Favorite',
    favorited: 'Favorited',
    unfavorite: 'Remove Favorite',
    myFavorites: 'My Favorites',
    noFavorites: 'No favorites yet.',
    signInToFavorite: 'Sign in to save favorite cases.',
    favoriteSaved: 'Favorite saved.',
    favoriteRemoved: 'Favorite removed.',
    favoriteFailed: 'Favorite update failed. Please try again.',
    closePreview: 'Close preview',
    viewDetails: 'View Details',
    generateTest: 'Generate Test',
    generateImage: 'Generate Image',
    generating: 'Generating...',
    editablePrompt: 'Editable Prompt',
    generatedResult: 'Generated Result',
    originalImage: 'Original Image',
    savedInBrowser: 'Saved in this browser',
    resetPrompt: 'Reset Prompt',
    oneFreeGeneration: '1 free test image',
    superAdminGeneration: 'Super admin mode: every generation costs 1 credit.',
    generationCost: 'Costs 1 credit',
    freeLimitReached: 'Free generation used. Buy credits or start a membership to keep generating.',
    creditsRequired: 'Credits required. Buy credits or start a membership to keep generating.',
    generationBusy: 'The image service is busy. Please try again in a moment.',
    generationFailed: 'Generation failed. Please try again later.',
    apimartApiSettings: 'APIMart API settings',
    apimartApiTitle: 'Use your own APIMart API key',
    apimartApiSubtitle: 'The key is stored only in this browser and calls APIMart directly. Clearing site data removes it.',
    apimartApiKey: 'APIMart API key',
    apimartApiPlaceholder: 'Paste your APIMart API key',
    apimartVerifySave: 'Verify and save',
    apimartVerifying: 'Verifying...',
    apimartKeySaved: 'API key verified and saved in this browser.',
    apimartKeyCleared: 'The saved API key has been removed.',
    apimartKeyInvalid: 'The APIMart API key is invalid. Check it and try again.',
    apimartBalanceRequired: 'Your APIMart balance is insufficient. Top up before generating.',
    apimartRequestRejected: 'APIMart rejected this request. Review the Prompt and try again.',
    apimartUnavailable: 'APIMart is temporarily unavailable. Try again later.',
    apimartTaskFailed: 'APIMart could not complete this generation.',
    apimartTaskTimeout: 'The task is still running. Its task ID is saved, and checking will continue when you reopen this case.',
    apimartRateLimited: 'APIMart is rate limiting requests. Checking will continue after the requested wait.',
    apimartContinueChecking: 'Continue checking',
    apimartTaskId: 'Task ID',
    apimartExpiresAt: (value) => `Result link expires: ${value}`,
    apimartPriceFallback: (date) => `Price service is unavailable. Showing the ${date} snapshot.`,
    apimartAnonymousChoice: 'Add a personal Key for direct generation, or sign in to use platform credits.',
    apimartPendingNeedsKey: 'This pending personal task needs your APIMart Key before checking can continue.',
    apimartPendingNeedsLogin: 'Sign in with the same account to continue checking this platform task.',
    apimartStorageFailed: 'This browser could not save the API Key. Check site storage permissions and try again.',
    apimartClearKey: 'Remove key',
    apimartManageKey: 'Manage personal API key',
    apimartConfigureKey: 'Configure personal API key',
    apimartGetKey: 'Open API key management',
    apimartRegister: 'Create APIMart account',
    apimartLocalOnly: 'Your full key stays in local browser storage and is sent only to APIMart.',
    apimartPersonalMode: (masked, price) => `Personal APIMart key ${masked} · 1K · about $${price}/image`,
    apimartPlatformMode: 'Platform credits · 1K · 1 image',
    apimartPriceNote: (price) => `Current 1K price: $${price}/image. Final billing is determined by APIMart.`,
    apimartProgress: (progress) => `APIMart is generating · ${progress}%`,
    apimartActualCost: (cost) => `Actual APIMart cost: $${cost}`,
    apimartShowKey: 'Show API key',
    apimartHideKey: 'Hide API key',
    usePlatformCredits: 'Sign in to use platform credits',
    promptRequired: 'Prompt is required and must stay under 10,000 characters.',
    serverUnavailable: 'Generation service is not configured yet.',
    checkoutUnavailable: 'Checkout is not configured yet.',
    checkoutFailed: 'Checkout failed. Please try again later.',
    billingSuccess: 'Payment is processing. Credits will appear after Stripe confirms it.',
    billingCancelled: 'Checkout cancelled. You can choose another pack anytime.',
    alipayReturnPending: 'Returned from Alipay. Confirming the order with Alipay now…',
    alipayPaymentSuccess: 'Alipay payment confirmed. Your credits are available.',
    alipayPaymentPending: 'The Alipay result is not confirmed yet. Do not pay again; refresh this return page to query the same order.',
    alipayQueryFailed: 'The Alipay result could not be confirmed. Do not pay again; refresh this return page or contact support.',
    authRequired: 'Sign in to generate a test image.',
    signIn: 'Sign in',
    signInTitle: 'Sign in to generate test images',
    signInSubtitle: 'Use Google or Watcha to unlock image generation, credits, and membership features.',
    authRateLimited: 'Too many login attempts. Please wait a bit, then try again.',
    googleNotConfigured: 'Google sign-in is not enabled yet.',
    continueWithGoogle: 'Continue with Google',
    continueWithWatcha: 'Continue with Watcha',
    authNotConfigured: 'Login is not configured yet.',
    watchaNotConfigured: 'Watcha sign-in is not configured yet.',
    watchaSessionExpired: 'Watcha sign-in expired. Please try again.',
    watchaDenied: 'Watcha authorization was cancelled.',
    watchaLoginFailed: 'Watcha sign-in failed. Please try again.',
    authError: 'Login failed. Please try again.',
    signOut: 'Sign out',
    account: 'Account',
    accountSettings: 'Account settings',
    accountTitle: 'Account settings',
    accountSubtitle: 'Manage your public display name, membership status, and GPT-Image2 credit usage.',
    displayName: 'Display name',
    saveProfile: 'Save profile',
    profileSaved: 'Profile saved.',
    profileUpdateFailed: 'Profile update failed. Please try again.',
    googleAvatarSource: 'Avatar is synced from your login provider.',
    accountOverview: 'Account overview',
    totalGenerations: 'Generated tests',
    totalGenerationCredits: 'Credits spent',
    generationUsage: 'Generation spending',
    openCase: 'View case',
    sourceCase: 'Source case',
    noGenerationTransactions: 'No generation spending yet.',
    adminPanel: 'Admin',
    membershipCenter: 'Membership & Credits',
    superAdmin: 'Super admin',
    credits: 'credits',
    buyCredits: 'Buy credits',
    subscribe: 'Subscribe',
    manageSubscription: 'Manage subscription',
    currentPlan: 'Current plan',
    noPlan: 'Free plan',
    activeUntil: 'Active until',
    membershipPlans: 'Membership',
    creditPacks: 'Credit packs',
    monthlyCredits: (count) => `${count} credits / month`,
    packCredits: (count) => `${count} credits`,
    billingTitle: 'Membership & credits',
    billingSubtitle: 'Members get monthly credits. Credit packs can be added anytime for more GPT-Image2 tests.',
    balanceTitle: 'Current balance',
    transactionHistory: 'Credit history',
    noTransactions: 'No credit history yet.',
    loadBilling: 'Loading billing...',
    openBilling: 'Open membership center',
    paymentReady: 'Secure checkout via Stripe or Alipay.',
    billingNotReady: 'No payment provider is configured yet.',
    payWithStripe: 'Stripe',
    payWithAlipay: 'Alipay',
    alipayPriceMissing: 'Alipay price pending',
    adminAdjust: 'Adjust credits',
    creditAmount: 'Amount',
    reason: 'Reason',
    applyAdjustment: 'Apply adjustment',
    freeReady: 'Free test ready',
    freeUsedShort: 'Free test used',
    signInToGenerate: 'Sign in to generate',
    creditsAvailable: (count) => `${count} credit${count === 1 ? '' : 's'} available`,
    adminTitle: 'User admin',
    adminSubtitle: 'Traffic, users, memberships, credits, and generation activity in one dashboard.',
    adminMetrics: 'Dashboard',
    trafficMetrics: 'Traffic',
    businessMetrics: 'Business',
    analyticsNotConfigured: 'GA4 is not configured yet. Business metrics are still available.',
    analyticsLoadFailed: 'GA4 data could not be loaded. Business metrics are still available.',
    invalidDateRange: 'Choose a date range within 180 days.',
    rangeToday: 'Today',
    range7d: '7 days',
    range30d: '30 days',
    range90d: '90 days',
    customRange: 'Custom',
    startDate: 'Start date',
    endDate: 'End date',
    applyRange: 'Apply',
    selectedRange: 'Selected range',
    pv: 'PV',
    uv: 'UV',
    visits: 'Visits',
    sessions: 'Sessions',
    newUsers: 'New users',
    registeredUsers: 'Registered users',
    newRegistrations: 'New registrations',
    newMembers: 'New members',
    activeMemberships: 'Active members',
    totalGenerationsMetric: 'Total generations',
    rangeGenerations: 'Range generations',
    succeeded: 'Succeeded',
    failed: 'Failed',
    pending: 'Pending',
    creditsConsumed: 'Credits consumed',
    creditsInCirculation: 'Credits in balances',
    purchasedCredits: 'Purchased credits',
    membershipCredits: 'Membership credits',
    dailyTraffic: 'Daily traffic',
    trafficTrend: 'Traffic trend',
    businessTrend: 'Business trend',
    registrations: 'Registrations',
    topPages: 'Top pages',
    channels: 'Channels',
    countries: 'Countries',
    pageViews: 'Views',
    noAnalyticsRows: 'No analytics rows yet.',
    refresh: 'Refresh',
    users: 'Users',
    role: 'Role',
    creditBalance: 'Credits',
    freeGeneration: 'Free test',
    spentCredits: 'Spent',
    purchased: 'Purchased',
    lastGeneration: 'Last generation',
    createdAt: 'Created',
    loadingUsers: 'Loading users...',
    noUsers: 'No users yet.',
    adminOnly: 'Only super admins can view this page.',
    fullPrompt: 'Full Prompt',
    templatePrompt: 'Template Prompt',
    useWhen: 'Use When',
    guidance: 'Guidance',
    pitfalls: 'Pitfalls',
    examples: 'Example Cases',
    source: 'Source',
    openOnGithub: 'Open on GitHub',
    limit: (count) => `Showing the first ${count} results for speed. Use search or filters to narrow the gallery.`
  },
  ko: {
    loading: 'GPT-Image2 사례를 불러오는 중…',
    brand: 'GPT-Image2 갤러리',
    navCases: '사례',
    navSkill: '스킬',
    navTemplates: '템플릿',
    navCommunity: '커뮤니티',
    navSponsor: 'API',
    navMembership: '멤버십',
    communityQrAlt: 'GPT-Image2 위챗(WeChat) 커뮤니티 초대 카드',
    eyebrow: '계속 업데이트되는 GPT-Image2 프롬프트 갤러리',
    title: '화제의 이미지에서 재사용 가능한 프롬프트로.',
    subtitle:
      'GPT-Image2 창작을 위한 시각적 작업 공간입니다. 실제 사례를 살펴보고, 프롬프트를 복사하고, 이미지 생성을 테스트하고, 산업용 템플릿을 확인하고, 창작자 커뮤니티에 참여하세요.',
    explore: '사례 살펴보기',
    githubProject: 'GitHub 프로젝트',
    sponsorProject: 'API',
    sponsorProjectLabel: 'APIMart API 열기',
    cases: '개 사례',
    categories: '개 분류',
    templates: '개 템플릿',
    sectionEyebrow: '복사 · 필터 · 재활용',
    sectionTitle: '화제의 사례와 프롬프트를 한 번에 가져가세요.',
    templateEyebrow: '20개 이상의 산업용 프롬프트 템플릿',
    templateTitle: '검증된 템플릿으로 시작한 뒤 사례 라이브러리로 확장하세요.',
    templateSubtitle:
      '각 템플릿은 실제 GPT-Image2 사례에서 추출했으며 구조, 제약 조건, 주의사항을 포함해 운영 흐름에서 바로 재활용할 수 있습니다.',
    templateKind: '프롬프트 템플릿',
    openTemplate: '템플릿 열기',
    skillEyebrow: '에이전트 스킬',
    skillTitle: 'GPT-Image2 스타일 라이브러리를 Claude Code와 Codex에 설치하세요.',
    skillSubtitle:
      '스킬 하나를 설치하면 에이전트가 이 사이트와 같은 템플릿, 스타일, 장면, 주의사항 라이브러리에서 적합한 구성을 고르고 복사 가능한 GPT Image 2 프롬프트를 만듭니다.',
    skillCommandLabel: '로컬 에이전트에 설치',
    skillPromptLabel: '이 요청을 시도해 보세요',
    skillPrompt: 'gpt-image-2-style-library 스킬로 도시 생명 시스템 인포그래픽을 만들어 줘',
    skillCopyCommand: '명령 복사',
    skillOpenDocs: '스킬 소스 열기',
    skillNpm: 'npm 패키지 보기',
    skillCopied: '명령을 복사했습니다',
    skillExampleAlt: 'GPT-Image2 스타일 라이브러리 스킬로 만든 도시 생명 시스템 인포그래픽',
    skillExampleCaption: '예시: gpt-image-2-style-library로 도시 생명 시스템 인포그래픽 만들기.',
    skillStats: ['Claude Code 지원', 'Codex 지원', '20개 이상 템플릿'],
    search: '사례, 출처, 프롬프트 검색…',
    category: '분류',
    style: '스타일',
    scene: '장면',
    all: '전체',
    matching: '개 일치 사례',
    openGithub: 'GitHub 프로젝트 열기',
    copied: '복사했습니다',
    copyPrompt: '프롬프트 복사',
    copyTemplatePrompt: '템플릿 복사',
    favorite: '즐겨찾기',
    favorited: '즐겨찾는 중',
    unfavorite: '즐겨찾기 해제',
    myFavorites: '내 즐겨찾기',
    noFavorites: '아직 즐겨찾는 사례가 없습니다.',
    signInToFavorite: '로그인하면 사례를 즐겨찾기에 저장할 수 있습니다.',
    favoriteSaved: '즐겨찾기에 저장했습니다.',
    favoriteRemoved: '즐겨찾기에서 제거했습니다.',
    favoriteFailed: '즐겨찾기 업데이트에 실패했습니다. 다시 시도하세요.',
    closePreview: '미리보기 닫기',
    viewDetails: '세부 정보 보기',
    generateTest: '테스트 생성',
    generateImage: '이미지 생성',
    generating: '생성 중…',
    editablePrompt: '편집 가능한 프롬프트',
    generatedResult: '생성 결과',
    originalImage: '원본 이미지',
    savedInBrowser: '이 브라우저에 저장됨',
    resetPrompt: '프롬프트 초기화',
    oneFreeGeneration: '무료 테스트 이미지 1장',
    superAdminGeneration: '최고 관리자 모드: 이미지를 한 번 생성할 때마다 크레딧 1개를 사용합니다.',
    generationCost: '크레딧 1개 사용',
    freeLimitReached: '무료 생성 한도를 모두 사용했습니다. 생성하려면 크레딧을 구매하거나 멤버십을 시작하세요.',
    creditsRequired: '크레딧이 필요합니다. 생성하려면 크레딧을 구매하거나 멤버십을 시작하세요.',
    generationBusy: '이미지 서비스가 혼잡합니다. 잠시 후 다시 시도하세요.',
    generationFailed: '생성에 실패했습니다. 나중에 다시 시도하세요.',
    apimartApiSettings: 'APIMart API 설정',
    apimartApiTitle: '내 APIMart API 키 사용',
    apimartApiSubtitle: '키는 현재 브라우저에만 저장되며 브라우저가 APIMart를 직접 호출합니다. 사이트 데이터를 지우면 함께 삭제됩니다.',
    apimartApiKey: 'APIMart API 키',
    apimartApiPlaceholder: 'APIMart API 키를 붙여 넣으세요',
    apimartVerifySave: '검증하고 저장',
    apimartVerifying: '검증 중…',
    apimartKeySaved: 'API 키를 검증하고 이 브라우저에 저장했습니다.',
    apimartKeyCleared: '저장된 API 키를 제거했습니다.',
    apimartKeyInvalid: 'APIMart API 키가 올바르지 않습니다. 확인 후 다시 시도하세요.',
    apimartBalanceRequired: 'APIMart 잔액이 부족합니다. 충전 후 생성하세요.',
    apimartRequestRejected: 'APIMart가 이 요청을 거부했습니다. 프롬프트를 검토하고 다시 시도하세요.',
    apimartUnavailable: 'APIMart를 일시적으로 사용할 수 없습니다. 나중에 다시 시도하세요.',
    apimartTaskFailed: 'APIMart가 이 생성을 완료하지 못했습니다.',
    apimartTaskTimeout: '작업이 아직 실행 중입니다. 작업 ID를 저장했으며 이 사례를 다시 열면 계속 확인합니다.',
    apimartRateLimited: 'APIMart 요청이 제한되었습니다. 서버가 요청한 대기 시간 뒤에 계속 확인합니다.',
    apimartContinueChecking: '작업 확인 계속',
    apimartTaskId: '작업 ID',
    apimartExpiresAt: (value) => `결과 링크 만료: ${value}`,
    apimartPriceFallback: (date) => `가격 서비스를 사용할 수 없습니다. ${date} 기준 스냅샷을 표시합니다.`,
    apimartAnonymousChoice: '개인 키를 추가해 직접 생성하거나 로그인해 플랫폼 크레딧을 사용하세요.',
    apimartPendingNeedsKey: '이 대기 중인 개인 작업은 확인을 계속하려면 APIMart 키가 필요합니다.',
    apimartPendingNeedsLogin: '이 플랫폼 작업을 계속 확인하려면 작업을 제출한 것과 같은 계정으로 로그인하세요.',
    apimartStorageFailed: '이 브라우저에 API 키를 저장할 수 없습니다. 사이트 저장소 권한을 확인하고 다시 시도하세요.',
    apimartClearKey: '키 제거',
    apimartManageKey: '개인 API 키 관리',
    apimartConfigureKey: '개인 API 키 설정',
    apimartGetKey: 'API 키 관리 열기',
    apimartRegister: 'APIMart 계정 만들기',
    apimartLocalOnly: '전체 키는 로컬 브라우저 저장소에만 보관되며 APIMart에만 전송됩니다.',
    apimartPersonalMode: (masked, price) => `개인 APIMart 키 ${masked} · 1K · 이미지당 약 $${price}`,
    apimartPlatformMode: '플랫폼 크레딧 · 1K · 이미지 1장',
    apimartPriceNote: (price) => `현재 1K 가격: 이미지당 $${price}. 최종 청구는 APIMart가 결정합니다.`,
    apimartProgress: (progress) => `APIMart 생성 중 · ${progress}%`,
    apimartActualCost: (cost) => `실제 APIMart 비용: $${cost}`,
    apimartShowKey: 'API 키 표시',
    apimartHideKey: 'API 키 숨기기',
    usePlatformCredits: '로그인해 플랫폼 크레딧 사용',
    promptRequired: '프롬프트는 필수이며 10,000자 이하여야 합니다.',
    serverUnavailable: '생성 서비스가 아직 구성되지 않았습니다.',
    checkoutUnavailable: '결제가 아직 구성되지 않았습니다.',
    checkoutFailed: '결제를 만들지 못했습니다. 나중에 다시 시도하세요.',
    billingSuccess: '결제를 처리하고 있습니다. Stripe가 확인하면 크레딧이 반영됩니다.',
    billingCancelled: '결제를 취소했습니다. 언제든 다른 크레딧 팩을 선택할 수 있습니다.',
    alipayReturnPending: '알리페이에서 돌아왔습니다. 지금 알리페이에서 주문을 확인하고 있습니다…',
    alipayPaymentSuccess: '알리페이 결제가 확인되었습니다. 크레딧을 사용할 수 있습니다.',
    alipayPaymentPending: '알리페이 결과가 아직 확인되지 않았습니다. 중복 결제하지 말고 이 돌아오기 페이지를 새로고침해 같은 주문을 조회하세요.',
    alipayQueryFailed: '알리페이 결과를 확인하지 못했습니다. 중복 결제하지 말고 이 돌아오기 페이지를 새로고침하거나 지원팀에 문의하세요.',
    authRequired: '테스트 이미지를 생성하려면 로그인하세요.',
    signIn: '로그인',
    signInTitle: '테스트 이미지를 생성하려면 로그인하세요',
    signInSubtitle: 'Google 또는 Watcha로 로그인하면 이미지 생성, 크레딧, 멤버십 기능을 사용할 수 있습니다.',
    authRateLimited: '로그인 시도가 너무 많습니다. 잠시 후 다시 시도하세요.',
    googleNotConfigured: 'Google 로그인이 아직 활성화되지 않았습니다.',
    continueWithGoogle: 'Google로 계속',
    continueWithWatcha: 'Watcha로 계속',
    authNotConfigured: '로그인이 아직 구성되지 않았습니다.',
    watchaNotConfigured: 'Watcha 로그인이 아직 구성되지 않았습니다.',
    watchaSessionExpired: 'Watcha 로그인 세션이 만료되었습니다. 다시 시도하세요.',
    watchaDenied: 'Watcha 인증을 취소했습니다.',
    watchaLoginFailed: 'Watcha 로그인에 실패했습니다. 다시 시도하세요.',
    authError: '로그인에 실패했습니다. 다시 시도하세요.',
    signOut: '로그아웃',
    account: '계정',
    accountSettings: '계정 설정',
    accountTitle: '계정 설정',
    accountSubtitle: '공개 표시 이름, 멤버십 상태, GPT-Image2 크레딧 사용량을 관리하세요.',
    displayName: '표시 이름',
    saveProfile: '프로필 저장',
    profileSaved: '프로필을 저장했습니다.',
    profileUpdateFailed: '프로필 저장에 실패했습니다. 다시 시도하세요.',
    googleAvatarSource: '아바타는 로그인 제공업체에서 동기화됩니다.',
    accountOverview: '계정 개요',
    totalGenerations: '생성한 테스트',
    totalGenerationCredits: '사용한 크레딧',
    generationUsage: '이미지 생성 사용량',
    openCase: '사례 보기',
    sourceCase: '원본 사례',
    noGenerationTransactions: '아직 이미지 생성 사용 기록이 없습니다.',
    adminPanel: '관리자',
    membershipCenter: '멤버십 및 크레딧',
    superAdmin: '최고 관리자',
    credits: '크레딧',
    buyCredits: '크레딧 구매',
    subscribe: '구독',
    manageSubscription: '구독 관리',
    currentPlan: '현재 플랜',
    noPlan: '무료 플랜',
    activeUntil: '이용 종료일',
    membershipPlans: '멤버십',
    creditPacks: '크레딧 팩',
    monthlyCredits: (count) => `월 ${count} 크레딧`,
    packCredits: (count) => `${count} 크레딧`,
    billingTitle: '멤버십 및 크레딧',
    billingSubtitle: '멤버십에는 매월 크레딧이 포함됩니다. 더 많은 GPT-Image2 테스트를 위해 언제든 크레딧 팩을 추가할 수 있습니다.',
    balanceTitle: '현재 잔액',
    transactionHistory: '크레딧 기록',
    noTransactions: '아직 크레딧 기록이 없습니다.',
    loadBilling: '멤버십과 크레딧을 불러오는 중…',
    openBilling: '멤버십 센터 열기',
    paymentReady: 'Stripe 또는 알리페이로 안전하게 결제할 수 있습니다.',
    billingNotReady: '결제 제공업체가 아직 구성되지 않았습니다.',
    payWithStripe: 'Stripe로 결제',
    payWithAlipay: '알리페이',
    alipayPriceMissing: '알리페이 가격 준비 중',
    adminAdjust: '크레딧 조정',
    creditAmount: '수량',
    reason: '사유',
    applyAdjustment: '조정 적용',
    freeReady: '무료 테스트 준비됨',
    freeUsedShort: '무료 테스트 사용됨',
    signInToGenerate: '로그인해 생성',
    creditsAvailable: (count) => `사용 가능한 크레딧 ${count}개`,
    adminTitle: '사용자 관리',
    adminSubtitle: '트래픽, 사용자, 멤버십, 크레딧, 이미지 생성 활동을 하나의 대시보드에서 확인하세요.',
    adminMetrics: '대시보드',
    trafficMetrics: '트래픽',
    businessMetrics: '비즈니스',
    analyticsNotConfigured: 'GA4가 아직 구성되지 않았습니다. 비즈니스 지표는 계속 사용할 수 있습니다.',
    analyticsLoadFailed: 'GA4 데이터를 불러오지 못했습니다. 비즈니스 지표는 계속 사용할 수 있습니다.',
    invalidDateRange: '180일 이내의 날짜 범위를 선택하세요.',
    rangeToday: '오늘',
    range7d: '7일',
    range30d: '30일',
    range90d: '90일',
    customRange: '사용자 지정',
    startDate: '시작일',
    endDate: '종료일',
    applyRange: '적용',
    selectedRange: '선택한 범위',
    pv: 'PV',
    uv: 'UV',
    visits: '방문',
    sessions: '세션',
    newUsers: '신규 사용자',
    registeredUsers: '등록 사용자',
    newRegistrations: '신규 가입',
    newMembers: '신규 멤버',
    activeMemberships: '활성 멤버십',
    totalGenerationsMetric: '총 생성 수',
    rangeGenerations: '기간 내 생성 수',
    succeeded: '성공',
    failed: '실패',
    pending: '대기 중',
    creditsConsumed: '사용한 크레딧',
    creditsInCirculation: '잔여 크레딧',
    purchasedCredits: '구매 크레딧',
    membershipCredits: '멤버십 지급 크레딧',
    dailyTraffic: '일별 트래픽',
    trafficTrend: '트래픽 추이',
    businessTrend: '비즈니스 추이',
    registrations: '가입',
    topPages: '상위 페이지',
    channels: '채널',
    countries: '국가/지역',
    pageViews: '조회',
    noAnalyticsRows: '아직 분석 데이터가 없습니다.',
    refresh: '새로고침',
    users: '사용자',
    role: '역할',
    creditBalance: '크레딧',
    freeGeneration: '무료 테스트',
    spentCredits: '사용',
    purchased: '구매',
    lastGeneration: '최근 생성',
    createdAt: '생성일',
    loadingUsers: '사용자를 불러오는 중…',
    noUsers: '아직 사용자가 없습니다.',
    adminOnly: '최고 관리자만 이 페이지를 볼 수 있습니다.',
    fullPrompt: '전체 프롬프트',
    templatePrompt: '템플릿 프롬프트',
    useWhen: '사용 시점',
    guidance: '사용 안내',
    pitfalls: '주의사항',
    examples: '예시 사례',
    source: '출처',
    openOnGithub: 'GitHub에서 열기',
    limit: (count) => `속도를 위해 처음 ${count}개 결과만 표시합니다. 검색 또는 필터로 갤러리 범위를 좁히세요.`
  }
};

const labelMap = {
  ko: {
    'Architecture & Spaces': '건축과 공간',
    Architecture: '건축',
    Brand: '브랜드',
    'Brand & Logos': '브랜드와 로고',
    Character: '캐릭터',
    Characters: '인물',
    'Characters & People': '인물과 캐릭터',
    Charts: '차트',
    'Charts & Infographics': '차트와 인포그래픽',
    Classical: '고전',
    Commerce: '커머스',
    Creative: '창의',
    Documents: '문서',
    'Documents & Publishing': '문서와 출판',
    Education: '교육',
    Fashion: '패션',
    Food: '음식과 음료',
    History: '역사',
    'History & Classical Themes': '역사와 고전 주제',
    Illustration: '일러스트레이션',
    'Illustration & Art': '일러스트레이션과 예술',
    Infographic: '인포그래픽',
    'Other Use Cases': '기타 활용 사례',
    Photography: '사진',
    'Photography & Realism': '사진과 사실성',
    Poster: '포스터',
    'Posters & Typography': '포스터와 타이포그래피',
    Product: '제품',
    Products: '제품',
    'Products & E-commerce': '제품과 이커머스',
    Realistic: '사실적',
    Scenes: '장면',
    'Scenes & Storytelling': '장면과 스토리텔링',
    Social: '소셜',
    Story: '이야기',
    Tech: '기술',
    Travel: '여행',
    UI: 'UI',
    'UI & Interfaces': 'UI와 인터페이스'
  }
};

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function textFor(value, language) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[language] || value.en || value.ko || '';
}

function listFor(value, language) {
  const localized = value?.[language] || value?.en || value?.ko || [];
  return Array.isArray(localized) ? localized : [];
}

function compactText(value, maxLength = 180) {
  if (!value || value.length <= maxLength) return value || '';
  return `${value.slice(0, maxLength)}...`;
}

const HERO_CASE_COUNT = 5;
const HOT_STRIP_CASE_COUNT = 8;
let bodyScrollLockCount = 0;
let bodyScrollLockState = null;

function pagePathWithHash() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function sendGaPageView() {
  if (!gaMeasurementId || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: pagePathWithHash()
  });
}

function useGaPageViews() {
  useEffect(() => {
    if (!gaMeasurementId) return undefined;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', gaMeasurementId, { send_page_view: false });

    const existingScript = document.querySelector(`script[data-ga4="${gaMeasurementId}"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`;
      script.dataset.ga4 = gaMeasurementId;
      document.head.appendChild(script);
    }

    sendGaPageView();
    window.addEventListener('hashchange', sendGaPageView);
    window.addEventListener('popstate', sendGaPageView);
    return () => {
      window.removeEventListener('hashchange', sendGaPageView);
      window.removeEventListener('popstate', sendGaPageView);
    };
  }, []);
}

function useBodyScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;

    if (bodyScrollLockCount === 0) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      bodyScrollLockState = {
        scrollY,
        bodyOverflow: document.body.style.overflow,
        bodyPosition: document.body.style.position,
        bodyTop: document.body.style.top,
        bodyWidth: document.body.style.width,
        htmlOverflow: document.documentElement.style.overflow,
        htmlScrollBehavior: document.documentElement.style.scrollBehavior
      };
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    }

    bodyScrollLockCount += 1;

    return () => {
      bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1);
      if (bodyScrollLockCount > 0 || !bodyScrollLockState) return;

      const {
        scrollY,
        bodyOverflow,
        bodyPosition,
        bodyTop,
        bodyWidth,
        htmlOverflow,
        htmlScrollBehavior
      } = bodyScrollLockState;
      document.documentElement.style.scrollBehavior = 'auto';
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
      document.body.style.position = bodyPosition;
      document.body.style.top = bodyTop;
      document.body.style.width = bodyWidth;
      bodyScrollLockState = null;
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior = htmlScrollBehavior;
    };
  }, [active]);
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(Number(value || 0));
}

function formatShortDate(value, language) {
  if (!value) return '-';
  const normalized = /^\d{8}$/.test(String(value))
    ? `${String(value).slice(0, 4)}-${String(value).slice(4, 6)}-${String(value).slice(6, 8)}T00:00:00Z`
    : value;
  return new Date(normalized).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
    month: 'short',
    day: 'numeric'
  });
}

function formatApimartPrice(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric.toFixed(6).replace(/0+$/, '') : '0.010625';
}

function formatApimartExpiry(value, language) {
  if (!value) return '';
  const numeric = Number(value);
  const date = Number.isFinite(numeric)
    ? new Date(numeric > 10_000_000_000 ? numeric : numeric * 1000)
    : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString(language === 'ko' ? 'ko-KR' : 'en-US');
}

function formatRangeDate(value, language) {
  if (!value) return '-';
  return new Date(`${value}T00:00:00`).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function dateInputValue(daysAgo = 0) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function firstNumber(...values) {
  const value = values.find((item) => item !== undefined && item !== null);
  return Number(value || 0);
}

function percentOf(value, max) {
  if (!max) return 0;
  return Math.max(4, Math.round((Number(value || 0) / max) * 100));
}

function normalizeFavoriteRows(favorites = []) {
  const rows = Array.isArray(favorites) ? favorites : [];
  return rows
    .map((favorite) => ({
      caseId: Number(favorite.caseId || favorite.case_id),
      createdAt: favorite.createdAt || favorite.created_at || ''
    }))
    .filter((favorite) => Number.isInteger(favorite.caseId) && favorite.caseId > 0);
}

function takeDistinctCases(cases, count, excludedIds = new Set()) {
  const picked = [];
  const seenIds = new Set(excludedIds);

  for (const caseItem of cases) {
    if (seenIds.has(caseItem.id)) continue;
    picked.push(caseItem);
    seenIds.add(caseItem.id);
    if (picked.length === count) break;
  }

  return picked;
}

function localizeLabel(value, language, styleLibrary) {
  const libraryItems = [
    ...(styleLibrary?.categories || []),
    ...(styleLibrary?.styles || []),
    ...(styleLibrary?.scenes || [])
  ];
  const match = libraryItems.find((item) => item.value === value || item.id === value);
  if (match) return textFor(match.title, language);
  return labelMap[language]?.[value] || value;
}

function localizeTemplateTag(value, language, styleLibrary) {
  const tagLabel = styleLibrary?.tagLabels?.[value];
  if (tagLabel) return textFor(tagLabel, language);
  return localizeLabel(value, language, styleLibrary);
}

function orderByLibrary(values, libraryItems = []) {
  const order = new Map(libraryItems.map((item, index) => [item.value, index]));
  return [...values].sort((a, b) => {
    const aOrder = order.has(a) ? order.get(a) : Number.MAX_SAFE_INTEGER;
    const bOrder = order.has(b) ? order.get(b) : Number.MAX_SAFE_INTEGER;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.localeCompare(b);
  });
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some embedded browsers block the async clipboard API. Fall back to the
      // older selection path so the copy button still works in local previews.
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function useCopy() {
  const [copiedId, setCopiedId] = useState(null);

  async function copyText(text, id) {
    await copyToClipboard(text);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1600);
  }

  async function copyPrompt(caseItem) {
    await copyText(caseItem.prompt, `case-${caseItem.id}`);
  }

  return { copiedId, copyPrompt, copyText };
}

function generationErrorMessage(error, language) {
  const t = copy[language];
  if (error === 'FREE_LIMIT_REACHED') return t.freeLimitReached;
  if (error === 'CREDITS_REQUIRED') return t.creditsRequired;
  if (error === 'AUTH_REQUIRED') return t.authRequired;
  if (error === 'FORBIDDEN') return t.adminOnly;
  if (error === 'UPSTREAM_BUSY') return t.generationBusy;
  if (error === 'APIMART_API_KEY_INVALID') return t.apimartKeyInvalid;
  if (error === 'APIMART_BALANCE_REQUIRED') return t.apimartBalanceRequired;
  if (error === 'APIMART_REQUEST_REJECTED') return t.apimartRequestRejected;
  if (error === 'APIMART_RATE_LIMITED') return t.apimartRateLimited;
  if (error === 'APIMART_UNAVAILABLE') return t.apimartUnavailable;
  if (error === 'APIMART_TASK_FAILED') return t.apimartTaskFailed;
  if (error === 'APIMART_TASK_TIMEOUT') return t.apimartTaskTimeout;
  if (error === 'SERVER_NOT_CONFIGURED') return t.serverUnavailable;
  if (
    error === 'BILLING_NOT_CONFIGURED'
    || error === 'ALIPAY_NOT_CONFIGURED'
    || error === 'ALIPAY_PRICE_NOT_CONFIGURED'
  ) return t.checkoutUnavailable;
  if (
    error === 'CHECKOUT_FAILED'
    || error === 'BILLING_PORTAL_FAILED'
    || error === 'ALIPAY_CHECKOUT_FAILED'
  ) return t.checkoutFailed;
  if (
    error === 'ALIPAY_QUERY_FAILED'
    || error === 'ALIPAY_PAYMENT_RESULT_MISMATCH'
  ) return t.alipayQueryFailed;
  if (error === 'INVALID_PROMPT') return t.promptRequired;
  return t.generationFailed;
}

function submitAlipayPaymentForm(paymentHtml) {
  const documentNode = new DOMParser().parseFromString(paymentHtml, 'text/html');
  const sourceForm = documentNode.querySelector('form');
  if (!sourceForm) throw new Error('ALIPAY_CHECKOUT_FAILED');

  const action = new URL(sourceForm.getAttribute('action') || '');
  const allowedHosts = new Set([
    'openapi.alipay.com',
    'openapi-sandbox.dl.alipaydev.com'
  ]);
  if (action.protocol !== 'https:' || !allowedHosts.has(action.hostname)) {
    throw new Error('ALIPAY_CHECKOUT_FAILED');
  }

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = action.toString();
  form.acceptCharset = 'utf-8';
  form.style.display = 'none';

  sourceForm.querySelectorAll('input[name]').forEach((sourceInput) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = sourceInput.getAttribute('name');
    input.value = sourceInput.getAttribute('value') || '';
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
}

function getAuthHeaders(session) {
  return session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {};
}

function getGenerationQuotaText(profile, language) {
  const t = copy[language];
  if (!profile) return t.authRequired;
  if (profile.isSuperAdmin) {
    return profile.creditBalance > 0 ? `${t.superAdminGeneration} ${t.creditsAvailable(profile.creditBalance)}` : t.creditsRequired;
  }
  if (!profile.freeUsed) return t.oneFreeGeneration;
  if (profile.creditBalance > 0) return t.creditsAvailable(profile.creditBalance);
  return t.creditsRequired;
}

function productText(value, language) {
  if (!value) return '';
  return value[language] || value.en || value.ko || '';
}

function formatMembershipStatus(membership, language) {
  const t = copy[language];
  if (!membership?.isActive) return t.noPlan;
  const status = membership.status === 'trialing' ? 'trialing' : 'active';
  if (!membership.currentPeriodEnd) return status;
  const date = new Date(membership.currentPeriodEnd).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US');
  return `${status} · ${t.activeUntil} ${date}`;
}

function transactionLabel(transaction, language) {
  const typeMap = {
    grant: language === 'ko' ? '지급' : 'Grant',
    purchase: language === 'ko' ? '구매' : 'Purchase',
    membership_grant: language === 'ko' ? '멤버십 지급' : 'Membership grant',
    generation: language === 'ko' ? '이미지 생성' : 'Generation',
    refund: language === 'ko' ? '실패 반환' : 'Refund',
    adjustment: language === 'ko' ? '관리자 조정' : 'Admin adjustment'
  };
  return typeMap[transaction.type] || transaction.type || '-';
}

function transactionCaseId(transaction) {
  const rawCaseId = transaction?.caseId || transaction?.metadata?.caseId;
  const caseId = Number(rawCaseId);
  return Number.isFinite(caseId) && caseId > 0 ? caseId : null;
}

function TransactionItem({ transaction, language, casesById, onOpenCase }) {
  const t = copy[language];
  const caseId = transactionCaseId(transaction);
  const caseItem = caseId ? casesById?.get(caseId) : null;
  const caseLabel = caseItem
    ? `${t.openCase} #${caseId} · ${compactText(caseItem.title, 28)}`
    : `${t.sourceCase} #${caseId}`;

  return (
    <div className={cx('transactionItem', caseId && 'hasCase')}>
      <div className="transactionInfo">
        <span>{transactionLabel(transaction, language)}</span>
        {caseId ? (
          <button
            className="transactionCaseLink"
            type="button"
            onClick={() => caseItem && onOpenCase?.(caseItem)}
            disabled={!caseItem}
          >
            <ImageIcon size={14} />
            {caseLabel}
          </button>
        ) : null}
      </div>
      <strong className={transaction.amount >= 0 ? 'positive' : 'negative'}>
        {transaction.amount >= 0 ? '+' : ''}{transaction.amount}
      </strong>
      <em>
        {transaction.createdAt
          ? new Date(transaction.createdAt).toLocaleString(language === 'ko' ? 'ko-KR' : 'en-US')
          : '-'}
      </em>
    </div>
  );
}

function formatTemplatePrompt(item, language, styleLibrary) {
  const title = textFor(item.title, language);
  const description = textFor(item.description, language);
  const useWhen = textFor(item.useWhen, language);
  const guidance = listFor(item.guidance, language);
  const pitfalls = listFor(item.pitfalls, language);
  const tags = [
    localizeLabel(item.category, language, styleLibrary),
    ...(item.styles || []).map((style) => localizeLabel(style, language, styleLibrary)),
    ...(item.scenes || []).map((scene) => localizeLabel(scene, language, styleLibrary)),
    ...(item.tags || []).map((tag) => localizeTemplateTag(tag, language, styleLibrary))
  ].filter(Boolean);
  const uniqueTags = [...new Set(tags)];

  if (language === 'ko') {
    return [
      `템플릿: ${title}`,
      `활용: ${useWhen || description}`,
      `시각 방향: ${uniqueTags.join(' / ')}`,
      '',
      '아래 구조로 GPT Image 2에서 바로 사용할 수 있는 이미지 프롬프트를 작성하세요:',
      '- 주제: [생성할 제품, 인물, 공간, 인터페이스 또는 정보 주제]',
      '- 장면: [사용 환경, 서사 배경, 대상 맥락]',
      '- 구성: [화면 비율, 카메라 거리, 주제 위치, 위계]',
      '- 스타일: [재질, 조명, 색상, 시대감, 브랜드 분위기]',
      '- 텍스트: [정확하게 표시되어야 하는 제목, 레이블, 버튼 또는 설명]',
      '- 세부 요소: [핵심 장식, 보조 요소, 정보 주석, 인터랙션 레이어]',
      '- 출력: [해상도, 비율, 완성도, 가독성 요구사항]',
      '',
      '핵심 제약:',
      ...guidance.map((line) => `- ${line}`),
      '',
      '피할 항목:',
      ...pitfalls.map((line) => `- ${line}`)
    ].join('\n');
  }

  return [
    `Template: ${title}`,
    `Use case: ${useWhen || description}`,
    `Visual direction: ${uniqueTags.join(' / ')}`,
    '',
    'Create a copy-ready GPT Image 2 prompt with this structure:',
    '- Subject: [product, person, space, interface, or information topic]',
    '- Scene: [context, audience, narrative setting]',
    '- Composition: [aspect ratio, camera distance, focal hierarchy, placement]',
    '- Style: [material, lighting, color, era, brand tone]',
    '- Text: [exact title, labels, buttons, or annotations that must be readable]',
    '- Details: [decorative elements, callouts, UI layers, supporting objects]',
    '- Output: [resolution, aspect ratio, polish level, readability requirements]',
    '',
    'Core constraints:',
    ...guidance.map((line) => `- ${line}`),
    '',
    'Avoid:',
    ...pitfalls.map((line) => `- ${line}`)
  ].join('\n');
}

function Hero({ latestCases, language, repoUrl, totalCases, categoryCount, onOpenCase }) {
  const t = copy[language];

  return (
    <section className="hero">
      <div className="heroGlow heroGlowA" />
      <div className="heroGlow heroGlowB" />
      <div className="scanGrid" />
      <div className="heroCopy">
        <div className="eyebrow">
          <Sparkles size={16} />
          {t.eyebrow}
        </div>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
        <div className="heroActions">
          <a className="primaryAction" href="#gallery">
            {t.explore}
            <ArrowUpRight size={18} />
          </a>
          <a className="secondaryAction" href={repoUrl} target="_blank" rel="noreferrer">
            <Github size={18} />
            {t.githubProject}
          </a>
          <a
            className="secondaryAction sponsorAction"
            href={sponsorUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={t.sponsorProjectLabel}
          >
            <Heart size={18} />
            {t.sponsorProject}
          </a>
        </div>
        <div className="metrics">
          <span><strong>{totalCases}</strong> {t.cases}</span>
          <span><strong>{categoryCount}</strong> {t.categories}</span>
          <span><strong>20+</strong> {t.templates}</span>
        </div>
      </div>
      <div className="heroDeck" aria-label={language === 'ko' ? '최신 GPT-Image2 사례' : 'Latest GPT-Image2 cases'}>
        {latestCases.slice(0, 5).map((caseItem, index) => (
          <button
            className={`heroCard heroCard${index + 1}`}
            type="button"
            aria-label={`${language === 'ko' ? '사례 열기' : 'Open case'} ${caseItem.id}: ${caseItem.title}`}
            onClick={() => onOpenCase(caseItem)}
            key={caseItem.id}
          >
            <img src={caseItem.image} alt={caseItem.imageAlt} />
            <span>{language === 'ko' ? '사례' : 'Case'} {caseItem.id}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function FilterPill({ active, children, onClick }) {
  return (
    <button className={cx('filterPill', active && 'active')} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function useDropdownDismiss(open, setOpen) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function handlePointerDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  return ref;
}

function LanguageSwitch({ language, setLanguage }) {
  const [open, setOpen] = useState(false);
  const ref = useDropdownDismiss(open, setOpen);
  const languageOptions = [
    { value: 'ko', label: '한국어', short: 'KO' },
    { value: 'en', label: 'English', short: 'EN' }
  ];
  const activeLanguage = languageOptions.find((option) => option.value === language) || languageOptions[0];

  return (
    <div className="dropdownControl languageSwitch" ref={ref}>
      <button
        className={cx('dropdownTrigger', open && 'open')}
        type="button"
        aria-label={language === 'ko' ? '언어' : 'Language'}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{activeLanguage.short}</span>
        <ChevronDown size={15} />
      </button>
      {open ? (
        <div className="dropdownMenu languageMenu" role="menu">
          {languageOptions.map((option) => (
            <button
              className={cx(option.value === language && 'active')}
              type="button"
              role="menuitemradio"
              aria-checked={option.value === language}
              onClick={() => {
                setLanguage(option.value);
                setOpen(false);
              }}
              key={option.value}
            >
              <span>{option.label}</span>
              <strong>{option.short}</strong>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function WeChatIcon({ size = 17 }) {
  return (
    <svg className="wechatNavIcon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.15 4.25c-4.16 0-7.45 2.72-7.45 6.12 0 1.93 1.08 3.62 2.76 4.74l-.62 2.08a.44.44 0 0 0 .62.52l2.46-1.26c.7.18 1.45.28 2.23.28.4 0 .79-.03 1.17-.08a5.31 5.31 0 0 1-.37-1.96c0-3.2 3.18-5.78 7.1-5.78.27 0 .53.01.79.04-.75-2.7-4.26-4.7-8.69-4.7Zm-2.35 4.9a.93.93 0 1 0 0-1.86.93.93 0 0 0 0 1.86Zm4.74 0a.93.93 0 1 0 0-1.86.93.93 0 0 0 0 1.86Zm5.51 1.32c-3.24 0-5.86 2.05-5.86 4.58 0 2.54 2.62 4.59 5.86 4.59.58 0 1.13-.07 1.66-.19l1.88.96a.37.37 0 0 0 .52-.44l-.48-1.59c1.39-.85 2.27-2.04 2.27-3.33 0-2.53-2.62-4.58-5.85-4.58Zm-1.92 3.67a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm3.86 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CommunityNavItem({ language }) {
  const t = copy[language];
  return (
    <a className="communityNavLink" href="/community" aria-label={t.navCommunity}>
      <WeChatIcon />
      {t.navCommunity}
    </a>
  );
}

function authErrorMessage(error, language) {
  const t = copy[language];
  const message = String(error?.message || error || '').trim();
  const normalized = message.toLowerCase();

  if (error?.status === 429 || normalized.includes('rate limit') || normalized.includes('too many')) {
    return t.authRateLimited;
  }

  if (normalized.includes('provider') || normalized.includes('oauth')) {
    return t.googleNotConfigured;
  }

  return message || t.authError;
}

function authRedirectErrorMessage(code, language) {
  const t = copy[language];
  if (code === 'watcha_not_configured') return t.watchaNotConfigured;
  if (code === 'supabase_not_configured') return t.authNotConfigured;
  if (code === 'watcha_state_failed') return t.watchaSessionExpired;
  if (code === 'watcha_denied') return t.watchaDenied;
  if (code === 'watcha_login_failed') return t.watchaLoginFailed;
  return t.authError;
}

function GoogleIcon() {
  return (
    <svg className="googleIcon" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.25h2.91c1.7-1.57 2.69-3.89 2.69-6.6z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.25c-.8.54-1.83.86-3.05.86-2.35 0-4.34-1.58-5.05-3.71H.94v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.72A5.41 5.41 0 0 1 3.67 9c0-.6.1-1.18.28-1.72V4.95H.94A9 9 0 0 0 0 9c0 1.45.34 2.82.94 4.05l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.57c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .94 4.95l3.01 2.33C4.66 5.15 6.65 3.57 9 3.57z" />
    </svg>
  );
}

function WatchaIcon() {
  return <img className="watchaIcon" src={watchaLogoUrl} alt="" aria-hidden="true" loading="lazy" />;
}

function AuthModal({ open, language, initialErrorCode, onClose }) {
  const t = copy[language];
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    if (initialErrorCode) {
      setStatus('error');
      setMessage(authRedirectErrorMessage(initialErrorCode, language));
      return;
    }
    setStatus('idle');
    setMessage('');
  }, [open, initialErrorCode, language]);

  if (!open) return null;

  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const isLoading = status === 'loading-google' || status === 'loading-watcha';

  async function handleGoogleSignIn() {
    if (!isSupabaseConfigured || !supabase) {
      setStatus('error');
      setMessage(t.authNotConfigured);
      return;
    }

    setStatus('loading-google');
    setMessage('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo
      }
    });

    if (error) {
      setStatus('error');
      setMessage(authErrorMessage(error, language));
    }
  }

  function handleWatchaSignIn() {
    if (!isSupabaseConfigured || !supabase) {
      setStatus('error');
      setMessage(t.authNotConfigured);
      return;
    }

    setStatus('loading-watcha');
    setMessage('');
    window.location.assign(`/api/auth/watcha/start?returnTo=${encodeURIComponent(redirectTo)}`);
  }

  return (
    <div
      className="previewOverlay authOverlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="authDialog" role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <button className="previewClose" type="button" onClick={onClose} aria-label={t.closePreview}>
          <X size={20} />
        </button>
        <div className="authIcon">
          <UserCircle size={28} />
        </div>
        <h2 id="auth-title">{t.signInTitle}</h2>
        <p>{t.signInSubtitle}</p>
        <div className="authProviders" aria-label={t.signInTitle}>
          <button className="googleButton" type="button" onClick={handleGoogleSignIn} disabled={isLoading}>
            {status === 'loading-google' ? <LoaderCircle className="spinIcon" size={18} /> : <GoogleIcon />}
            {t.continueWithGoogle}
          </button>
          <button className="watchaButton" type="button" onClick={handleWatchaSignIn} disabled={isLoading}>
            {status === 'loading-watcha' ? <LoaderCircle className="spinIcon" size={18} /> : <WatchaIcon />}
            {t.continueWithWatcha}
          </button>
        </div>
        {message ? (
          <p className={cx('authMessage', status === 'error' && 'error', status === 'sent' && 'sent')}>
            {message}
          </p>
        ) : null}
      </section>
    </div>
  );
}

function ApiKeyModal({ open, language, apiKey, price, priceMeta, onClose, onSaved, onCleared }) {
  const t = copy[language];
  const [input, setInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    setInput(apiKey || '');
    setShowKey(false);
    setStatus('idle');
    setMessage('');
  }, [open, apiKey]);

  useEffect(() => {
    if (!open) return undefined;
    function handleKeyDown(event) {
      if (event.key === 'Escape' && status !== 'loading') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, status]);

  if (!open) return null;

  async function handleSave(event) {
    event.preventDefault();
    const nextKey = input.trim();
    if (!nextKey || nextKey.length > 512 || /[\r\n]/.test(nextKey)) {
      setStatus('error');
      setMessage(t.apimartKeyInvalid);
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      await verifyPersonalApimartKey(nextKey);
      if (!saveStoredApimartKey(nextKey)) {
        setStatus('error');
        setMessage(t.apimartStorageFailed);
        return;
      }
      onSaved(nextKey);
      setStatus('success');
      setMessage(t.apimartKeySaved);
    } catch (error) {
      setStatus('error');
      setMessage(generationErrorMessage(error?.code || error?.message, language));
    }
  }

  function handleClear() {
    clearStoredApimartKey();
    setInput('');
    setShowKey(false);
    setStatus('success');
    setMessage(t.apimartKeyCleared);
    onCleared();
  }

  return (
    <div
      className="previewOverlay apiKeyOverlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && status !== 'loading') onClose();
      }}
    >
      <section className="apiKeyDialog" role="dialog" aria-modal="true" aria-labelledby="apimart-key-title">
        <button className="previewClose" type="button" onClick={onClose} aria-label={t.closePreview} disabled={status === 'loading'}>
          <X size={20} />
        </button>
        <div className="apiKeyHeading">
          <span className="authIcon"><KeyRound size={28} /></span>
          <div>
            <span className="eyebrow">{t.apimartApiSettings}</span>
            <h2 id="apimart-key-title">{t.apimartApiTitle}</h2>
            <p>{t.apimartApiSubtitle}</p>
          </div>
        </div>

        <form className="apiKeyForm" onSubmit={handleSave}>
          <label htmlFor="apimart-api-key">{t.apimartApiKey}</label>
          <div className="apiKeyInputRow">
            <input
              id="apimart-api-key"
              type={showKey ? 'text' : 'password'}
              value={input}
              maxLength={512}
              autoComplete="off"
              spellCheck="false"
              placeholder={t.apimartApiPlaceholder}
              onChange={(event) => setInput(event.target.value)}
            />
            <button
              type="button"
              className="apiKeyVisibility"
              onClick={() => setShowKey((current) => !current)}
              aria-label={showKey ? t.apimartHideKey : t.apimartShowKey}
              title={showKey ? t.apimartHideKey : t.apimartShowKey}
            >
              {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {apiKey ? <div className="apiKeyMask"><Check size={15} /> {maskApimartKey(apiKey)}</div> : null}
          <p className="apiKeyLocalNote"><ShieldCheck size={16} /> {t.apimartLocalOnly}</p>
          <p className="apiKeyPriceNote">{t.apimartPriceNote(formatApimartPrice(price))}</p>
          {priceMeta?.stale ? (
            <p className="apiKeyFallback">{t.apimartPriceFallback(priceMeta.snapshotDate || APIMART_PRICE_SNAPSHOT_DATE)}</p>
          ) : null}
          <div className="apiKeyActions">
            <button className="apiKeySave" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? <LoaderCircle className="spinIcon" size={17} /> : <Check size={17} />}
              {status === 'loading' ? t.apimartVerifying : t.apimartVerifySave}
            </button>
            {apiKey ? (
              <button className="apiKeyClear" type="button" onClick={handleClear} disabled={status === 'loading'}>
                <X size={17} />
                {t.apimartClearKey}
              </button>
            ) : null}
          </div>
        </form>

        <div className="apiKeyLinks">
          <a href={sponsorUrl} target="_blank" rel="noreferrer">
            {t.apimartRegister}<ArrowUpRight size={16} />
          </a>
          <a href={apimartKeysUrl} target="_blank" rel="noreferrer">
            {t.apimartGetKey}<ArrowUpRight size={16} />
          </a>
        </div>
        {message ? <p className={cx('authMessage', status === 'error' && 'error', status === 'success' && 'sent')}>{message}</p> : null}
      </section>
    </div>
  );
}

function UserMenu({ language, session, profile, onSignIn, onSignOut, onAdmin, onBilling, onAccount, onFavorites }) {
  const t = copy[language];
  const [open, setOpen] = useState(false);
  const ref = useDropdownDismiss(open, setOpen);

  if (!session) {
    return (
      <button className="accountButton" type="button" onClick={onSignIn}>
        <LogIn size={17} />
        <span>{t.signIn}</span>
      </button>
    );
  }

  const email = profile?.email || session.user?.email || t.account;
  const displayName = profile?.fullName || session.user?.user_metadata?.name || email;
  const avatarUrl = profile?.avatarUrl || session.user?.user_metadata?.avatar_url || session.user?.user_metadata?.picture || '';
  const totalSpent = Number(profile?.usage?.totalGenerationCredits || 0);

  return (
    <div className="dropdownControl userMenu" ref={ref}>
      <button
        className={cx('userTrigger', open && 'open')}
        type="button"
        aria-label={t.account}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="avatarBadge">
          {avatarUrl ? <img src={avatarUrl} alt="" /> : <UserCircle size={18} />}
        </span>
        <ChevronDown size={15} />
      </button>
      {open ? (
        <div className="dropdownMenu userDropdown" role="menu">
          <div className="userSummary">
            {avatarUrl ? <img className="userSummaryAvatar" src={avatarUrl} alt="" /> : <UserCircle size={32} />}
            <div>
              <strong>{displayName}</strong>
              <span>{email}</span>
            </div>
          </div>
          <div className="userStats">
            {profile?.isSuperAdmin ? (
              <span className="userStat admin">
                <ShieldCheck size={15} />
                {t.superAdmin}
              </span>
            ) : null}
            <span className="userStat">
              <Coins size={15} />
              {profile?.creditBalance || 0} {t.credits}
            </span>
            <span className="userStat">
              <Crown size={15} />
              {formatMembershipStatus(profile?.membership, language)}
            </span>
            <span className="userStat">
              <ReceiptText size={15} />
              {t.totalGenerationCredits}: {totalSpent}
            </span>
          </div>
          <div className="dropdownDivider" />
          <button
            className="dropdownAction"
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onAccount();
            }}
          >
            <Settings size={17} />
            {t.accountSettings}
          </button>
          <button
            className="dropdownAction"
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onFavorites();
            }}
          >
            <Heart size={17} />
            {t.myFavorites}
          </button>
          <button
            className="dropdownAction"
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onBilling();
            }}
          >
            <CreditCard size={17} />
            {t.membershipCenter}
          </button>
          {profile?.isSuperAdmin ? (
            <button
              className="dropdownAction"
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                onAdmin();
              }}
            >
              <ShieldCheck size={17} />
              {t.adminPanel}
            </button>
          ) : null}
          <button
            className="dropdownAction danger"
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
          >
            <LogOut size={17} />
            {t.signOut}
          </button>
        </div>
      ) : null}
    </div>
  );
}

function AccountPanel({
  open,
  language,
  session,
  profile,
  casesById,
  favoriteRows,
  initialSection,
  apimartKey,
  apimartPrice,
  onClose,
  onBilling,
  onApiKeySettings,
  onProfileChange,
  onOpenCase
}) {
  const t = copy[language];
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const favoritesRef = useRef(null);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    setFullName(profile?.fullName || session?.user?.user_metadata?.name || '');
    setStatus('idle');
    setMessage('');
  }, [open, profile?.fullName, session?.user?.user_metadata?.name]);

  useEffect(() => {
    if (!open || initialSection !== 'favorites') return;
    const frame = window.requestAnimationFrame(() => {
      favoritesRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, initialSection, favoriteRows]);

  if (!open) return null;

  const email = profile?.email || session?.user?.email || '';
  const avatarUrl = profile?.avatarUrl || session?.user?.user_metadata?.avatar_url || session?.user?.user_metadata?.picture || '';
  const usage = profile?.usage || {};
  const recentTransactions = profile?.recentTransactions || [];
  const generationTransactions = recentTransactions.filter((transaction) => transaction.type === 'generation');
  const favoriteCases = normalizeFavoriteRows(favoriteRows)
    .map((favorite) => ({
      ...favorite,
      caseItem: casesById?.get(favorite.caseId)
    }))
    .filter((favorite) => favorite.caseItem);

  async function handleSubmit(event) {
    event.preventDefault();
    const nextName = fullName.trim();
    if (!nextName) {
      setStatus('error');
      setMessage(t.profileUpdateFailed);
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      const response = await fetch('/api/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(session)
        },
        body: JSON.stringify({ fullName: nextName })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'PROFILE_UPDATE_FAILED');
      }
      if (payload.user) onProfileChange(payload.user);
      setStatus('success');
      setMessage(t.profileSaved);
    } catch {
      setStatus('error');
      setMessage(t.profileUpdateFailed);
    }
  }

  return (
    <div
      className="previewOverlay accountOverlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="accountDialog" role="dialog" aria-modal="true" aria-labelledby="account-title">
        <button className="previewClose" type="button" onClick={onClose} aria-label={t.closePreview}>
          <X size={20} />
        </button>
        <div className="accountHeader">
          <div className="accountAvatar">
            {avatarUrl ? <img src={avatarUrl} alt="" /> : <UserCircle size={44} />}
          </div>
          <div>
            <span className="eyebrow">
              <Settings size={16} />
              {t.accountSettings}
            </span>
            <h2 id="account-title">{t.accountTitle}</h2>
            <p>{t.accountSubtitle}</p>
          </div>
        </div>

        <div className="accountGrid">
          <form className="accountForm" onSubmit={handleSubmit}>
            <label>
              <span>{t.displayName}</span>
              <input
                value={fullName}
                maxLength={80}
                onChange={(event) => setFullName(event.target.value)}
              />
            </label>
            <div className="accountEmail">
              <span>{t.account}</span>
              <strong>{email}</strong>
              <em>{t.googleAvatarSource}</em>
            </div>
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? <LoaderCircle className="spinIcon" size={16} /> : <Check size={16} />}
              {t.saveProfile}
            </button>
            {message ? (
              <p className={cx('authMessage', status === 'error' && 'error', status === 'success' && 'sent')}>
                {message}
              </p>
            ) : null}
          </form>

          <section className="accountOverview">
            <h3>{t.accountOverview}</h3>
            <div className="accountMetrics">
              <div>
                <span>{t.creditBalance}</span>
                <strong>{profile?.creditBalance || 0}</strong>
              </div>
              <div>
                <span>{t.currentPlan}</span>
                <strong>{formatMembershipStatus(profile?.membership, language)}</strong>
              </div>
              <div>
                <span>{t.totalGenerations}</span>
                <strong>{Number(usage.totalGenerations || 0)}</strong>
              </div>
              <div>
                <span>{t.totalGenerationCredits}</span>
                <strong>{Number(usage.totalGenerationCredits || 0)}</strong>
              </div>
            </div>
            <button className="portalButton accountBillingButton" type="button" onClick={onBilling}>
              <CreditCard size={16} />
              {t.membershipCenter}
            </button>
          </section>
        </div>

        <section className="apiKeySettingsCard">
          <div className="apiKeySettingsIcon"><KeyRound size={22} /></div>
          <div>
            <h3>{t.apimartApiSettings}</h3>
            <p>{apiKey ? t.apimartPersonalMode(maskApimartKey(apiKey), formatApimartPrice(apimartPrice)) : t.apimartApiSubtitle}</p>
          </div>
          <button type="button" onClick={onApiKeySettings}>
            <Settings size={16} />
            {apiKey ? t.apimartManageKey : t.apimartConfigureKey}
          </button>
        </section>

        <section className="transactionSection favoritesSection" ref={favoritesRef}>
          <h3>
            <Heart size={18} />
            {t.myFavorites}
          </h3>
          {favoriteCases.length ? (
            <div className="favoriteGrid">
              {favoriteCases.map(({ caseId, createdAt, caseItem }) => (
                <button
                  className="favoriteCard"
                  type="button"
                  onClick={() => onOpenCase?.(caseItem)}
                  key={caseId}
                >
                  <img src={caseItem.image} alt={caseItem.imageAlt} />
                  <span>#{caseId}</span>
                  <strong>{caseItem.title}</strong>
                  <em>
                    {createdAt
                      ? new Date(createdAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US')
                      : localizeLabel(caseItem.category, language, null)}
                  </em>
                </button>
              ))}
            </div>
          ) : (
            <p className="emptyTransactions">{t.noFavorites}</p>
          )}
        </section>

        <section className="transactionSection accountTransactions">
          <h3>
            <ReceiptText size={18} />
            {t.generationUsage}
          </h3>
          {generationTransactions.length ? (
            <div className="transactionList">
              {generationTransactions.map((transaction) => (
                <TransactionItem
                  transaction={transaction}
                  language={language}
                  casesById={casesById}
                  onOpenCase={onOpenCase}
                  key={transaction.id}
                />
              ))}
            </div>
          ) : (
            <p className="emptyTransactions">{t.noGenerationTransactions}</p>
          )}
        </section>
      </section>
    </div>
  );
}

function AdminMetricCard({ icon, label, value, hint }) {
  return (
    <div className="adminMetricCard">
      <span className="adminMetricIcon">{icon}</span>
      <div>
        <span>{label}</span>
        <strong>{formatNumber(value)}</strong>
        {hint ? <em>{hint}</em> : null}
      </div>
    </div>
  );
}

function AdminTrendChart({ rows = [], series = [], language, emptyLabel }) {
  const chartRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const width = 720;
  const height = 260;
  const padding = { top: 24, right: 24, bottom: 38, left: 54 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(
    1,
    ...rows.flatMap((row) => series.map((item) => Number(row[item.key] || 0)))
  );

  function pointFor(row, index, key) {
    const x = padding.left + (rows.length <= 1 ? chartWidth / 2 : (index / (rows.length - 1)) * chartWidth);
    const y = padding.top + chartHeight - (Number(row[key] || 0) / maxValue) * chartHeight;
    return { x, y };
  }

  function linePath(points) {
    return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  }

  function areaPath(points) {
    if (!points.length) return '';
    const bottom = padding.top + chartHeight;
    const lastPoint = points[points.length - 1];
    return `${linePath(points)} L ${lastPoint.x.toFixed(2)} ${bottom} L ${points[0].x.toFixed(2)} ${bottom} Z`;
  }

  function handlePointerMove(event) {
    if (!chartRef.current || !rows.length) return;
    const clientX = event.touches?.[0]?.clientX ?? event.clientX;
    const rect = chartRef.current.getBoundingClientRect();
    const relativeX = ((clientX - rect.left) / rect.width) * width;
    const ratio = Math.min(1, Math.max(0, (relativeX - padding.left) / chartWidth));
    setHoverIndex(Math.round(ratio * (rows.length - 1)));
  }

  if (!rows.length) {
    return <p className="emptyTransactions">{emptyLabel}</p>;
  }

  const gridLines = [0, 0.25, 0.5, 0.75, 1];
  const xLabelIndexes = rows.length <= 8
    ? rows.map((_, index) => index)
    : [0, Math.round((rows.length - 1) / 2), rows.length - 1];
  const activeIndex = hoverIndex ?? rows.length - 1;
  const activeRow = rows[activeIndex];
  const activeX = pointFor(activeRow, activeIndex, series[0]?.key).x;
  const tooltipX = Math.min(activeX + 12, width - 178);

  return (
    <div className="adminTrendChart">
      <div className="adminChartLegend">
        {series.map((item) => (
          <span key={item.key}>
            <i style={{ background: item.color }} />
            {item.label}
          </span>
        ))}
      </div>
      <svg
        ref={chartRef}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={series.map((item) => item.label).join(', ')}
        onMouseMove={handlePointerMove}
        onMouseLeave={() => setHoverIndex(null)}
        onTouchMove={handlePointerMove}
        onTouchEnd={() => setHoverIndex(null)}
      >
        <defs>
          {series.filter((item) => item.area).map((item) => (
            <linearGradient id={`area-${item.key}`} key={item.key} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={item.color} stopOpacity="0.38" />
              <stop offset="100%" stopColor={item.color} stopOpacity="0.02" />
            </linearGradient>
          ))}
        </defs>
        {gridLines.map((line) => {
          const y = padding.top + chartHeight * line;
          return (
            <g key={line}>
              <line x1={padding.left} x2={width - padding.right} y1={y} y2={y} />
              <text x={padding.left - 10} y={y + 4} textAnchor="end">
                {formatNumber(Math.round(maxValue * (1 - line)))}
              </text>
            </g>
          );
        })}
        {xLabelIndexes.map((index) => {
          const point = pointFor(rows[index], index, series[0]?.key);
          return (
            <text className="adminChartDate" key={`${rows[index].date}-${index}`} x={point.x} y={height - 10} textAnchor="middle">
              {formatShortDate(rows[index].date, language)}
            </text>
          );
        })}
        {series.map((item) => {
          const points = rows.map((row, index) => pointFor(row, index, item.key));
          return (
            <g key={item.key}>
              {item.area ? <path className="adminChartArea" d={areaPath(points)} fill={`url(#area-${item.key})`} /> : null}
              <path
                className="adminChartLine"
                d={linePath(points)}
                stroke={item.color}
                strokeDasharray={item.dashed ? '8 7' : undefined}
              />
            </g>
          );
        })}
        {activeRow ? (
          <g className="adminChartActive">
            <line x1={activeX} x2={activeX} y1={padding.top} y2={padding.top + chartHeight} />
            {series.map((item) => {
              const point = pointFor(activeRow, activeIndex, item.key);
              return <circle key={item.key} cx={point.x} cy={point.y} r="4.5" fill={item.color} />;
            })}
            <g className="adminChartTooltip" transform={`translate(${tooltipX} 34)`}>
              <rect width="164" height={38 + series.length * 18} rx="8" />
              <text x="12" y="22">{formatRangeDate(activeRow.date, language)}</text>
              {series.map((item, index) => (
                <text key={item.key} x="12" y={44 + index * 18}>
                  {item.label}: {formatNumber(activeRow[item.key])}
                </text>
              ))}
            </g>
          </g>
        ) : null}
      </svg>
    </div>
  );
}

function AdminRankList({ rows, type, language }) {
  const t = copy[language];
  if (!rows?.length) return <p className="emptyTransactions">{t.noAnalyticsRows}</p>;

  return (
    <div className="adminRankList">
      {rows.map((row, index) => {
        const title = row.page || row.channel || row.country || '-';
        const mainValue = row.pageViews ?? row.sessions ?? row.activeUsers ?? 0;
        const subValue = row.activeUsers ?? row.pageViews ?? 0;
        return (
          <div className="adminRankItem" key={`${type}-${title}-${index}`}>
            <span>{index + 1}</span>
            <div>
              <strong title={title}>{title}</strong>
              <em>{type === 'channels' ? t.sessions : t.uv}: {formatNumber(subValue)}</em>
            </div>
            <b>{formatNumber(mainValue)}</b>
          </div>
        );
      })}
    </div>
  );
}

function AdminPanel({ open, language, session, casesById, onClose, onOpenCase }) {
  const t = copy[language];
  const [users, setUsers] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [range, setRange] = useState('7d');
  const [customStart, setCustomStart] = useState(() => dateInputValue(29));
  const [customEnd, setCustomEnd] = useState(() => dateInputValue());
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [adjustment, setAdjustment] = useState(null);
  const [adjustStatus, setAdjustStatus] = useState('idle');
  useBodyScrollLock(open);

  async function loadAdminData(nextRange = range, nextStart = customStart, nextEnd = customEnd) {
    if (!session?.access_token) {
      setStatus('error');
      setMessage(t.adminOnly);
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      const headers = getAuthHeaders(session);
      const params = new URLSearchParams({ range: nextRange });
      if (nextRange === 'custom') {
        params.set('start', nextStart);
        params.set('end', nextEnd);
      }
      const [usersResponse, metricsResponse] = await Promise.all([
        fetch('/api/admin/users', { headers }),
        fetch(`/api/admin/metrics?${params.toString()}`, { headers })
      ]);
      const usersPayload = await usersResponse.json().catch(() => ({}));
      const metricsPayload = await metricsResponse.json().catch(() => ({}));
      if (!usersResponse.ok || !usersPayload.ok) {
        throw new Error(usersPayload.error || 'SERVER_NOT_CONFIGURED');
      }
      if (!metricsResponse.ok || !metricsPayload.ok) {
        throw new Error(metricsPayload.error || 'SERVER_NOT_CONFIGURED');
      }
      setUsers(usersPayload.users || []);
      setMetrics(metricsPayload);
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setMessage(
        error.message === 'SERVER_NOT_CONFIGURED'
          ? t.checkoutUnavailable
          : error.message === 'INVALID_DATE_RANGE'
            ? t.invalidDateRange
            : generationErrorMessage(error.message, language)
      );
    }
  }

  function handleCustomApply() {
    if (range !== 'custom') {
      setRange('custom');
      return;
    }
    loadAdminData('custom', customStart, customEnd);
  }

  async function handleAdjustCredits(event) {
    event.preventDefault();
    if (!adjustment?.userId) return;
    setAdjustStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/admin/credits/adjust', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(session)
        },
        body: JSON.stringify({
          userId: adjustment.userId,
          amount: Number(adjustment.amount),
          reason: adjustment.reason
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'CREDIT_ADJUSTMENT_FAILED');
      }
      setAdjustment(null);
      setAdjustStatus('idle');
      await loadAdminData();
    } catch (error) {
      setAdjustStatus('error');
      setMessage(generationErrorMessage(error.message, language));
    }
  }

  useEffect(() => {
    if (open) loadAdminData(range);
  }, [open, session?.access_token, range]);

  if (!open) return null;
  const traffic = metrics?.traffic || {};
  const business = metrics?.business || {};
  const trafficTotals = traffic.totals || {};
  const businessTotals = business.totals || {};
  const businessRange = business.range || {};
  const selectedRange = metrics?.range;
  const selectedRangeLabel = selectedRange?.startDate && selectedRange?.endDate
    ? `${formatRangeDate(selectedRange.startDate, language)} - ${formatRangeDate(selectedRange.endDate, language)}`
    : '';
  const analyticsMessage = !traffic.configured
    ? t.analyticsNotConfigured
    : traffic.error
      ? t.analyticsLoadFailed
      : '';
  const trafficSeries = [
    { key: 'pv', label: t.pv, color: '#42e6ff', area: true },
    { key: 'uv', label: t.uv, color: '#c7ff65' },
    { key: 'visits', label: t.visits, color: '#ff8f70', dashed: true }
  ];
  const businessSeries = [
    { key: 'generations', label: t.rangeGenerations, color: '#42e6ff', area: true },
    { key: 'registrations', label: t.registrations, color: '#c7ff65' },
    { key: 'creditsConsumed', label: t.creditsConsumed, color: '#ff8f70', dashed: true }
  ];

  return (
    <div
      className="previewOverlay adminOverlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="adminDialog" role="dialog" aria-modal="true" aria-labelledby="admin-title">
        <button className="previewClose" type="button" onClick={onClose} aria-label={t.closePreview}>
          <X size={20} />
        </button>
        <div className="adminHeader">
          <div>
            <span className="eyebrow">
              <ShieldCheck size={16} />
              {t.superAdmin}
            </span>
            <h2 id="admin-title">{t.adminTitle}</h2>
            <p>{t.adminSubtitle}</p>
          </div>
          <div className="adminHeaderActions">
            <div className="adminRangeToggle" role="group" aria-label={t.adminMetrics}>
              {[
                ['today', t.rangeToday],
                ['7d', t.range7d],
                ['30d', t.range30d],
                ['90d', t.range90d],
                ['custom', t.customRange]
              ].map(([value, label]) => (
                <button
                  className={cx(range === value && 'active')}
                  type="button"
                  onClick={() => setRange(value)}
                  key={value}
                >
                  {label}
                </button>
              ))}
            </div>
            {range === 'custom' ? (
              <div className="adminCustomRange">
                <label>
                  <span>{t.startDate}</span>
                  <input type="date" value={customStart} onChange={(event) => setCustomStart(event.target.value)} />
                </label>
                <label>
                  <span>{t.endDate}</span>
                  <input type="date" value={customEnd} onChange={(event) => setCustomEnd(event.target.value)} />
                </label>
                <button type="button" onClick={handleCustomApply} disabled={status === 'loading'}>
                  {t.applyRange}
                </button>
              </div>
            ) : null}
            <button type="button" onClick={() => loadAdminData()} disabled={status === 'loading'}>
              {status === 'loading' ? <LoaderCircle className="spinIcon" size={17} /> : <RefreshCw size={17} />}
              {t.refresh}
            </button>
          </div>
        </div>

        <CommunityAdminSection language={language} session={session} />

        {metrics ? (
          <div className="adminDashboard">
            <section className="adminBlock">
              <h3>
                <TrendingUp size={18} />
                {t.trafficMetrics}
              </h3>
              {analyticsMessage ? <p className="adminNotice">{analyticsMessage}</p> : null}
              {selectedRangeLabel ? (
                <p className="adminRangeSummary">
                  {t.selectedRange}: <strong>{selectedRangeLabel}</strong>
                </p>
              ) : null}
              <div className="adminMetricGrid">
                <AdminMetricCard icon={<BarChart3 size={18} />} label={t.pv} value={firstNumber(trafficTotals.pv, trafficTotals.pageViews)} />
                <AdminMetricCard icon={<Users size={18} />} label={t.uv} value={firstNumber(trafficTotals.uv, trafficTotals.activeUsers)} />
                <AdminMetricCard icon={<ReceiptText size={18} />} label={t.visits} value={firstNumber(trafficTotals.visits, trafficTotals.sessions)} />
                <AdminMetricCard icon={<UserPlus size={18} />} label={t.newUsers} value={trafficTotals.newUsers} />
              </div>
              <div className="adminChartGrid">
                <div className="adminPanelCard chart">
                  <h4>{t.trafficTrend}</h4>
                  {traffic.configured && traffic.daily?.length ? (
                    <AdminTrendChart rows={traffic.daily} series={trafficSeries} language={language} emptyLabel={t.noAnalyticsRows} />
                  ) : (
                    <p className="emptyTransactions">{t.noAnalyticsRows}</p>
                  )}
                </div>
              </div>
              <div className="adminTrafficGrid">
                <div className="adminPanelCard">
                  <h4>{t.topPages}</h4>
                  <AdminRankList rows={traffic.topPages || []} type="pages" language={language} />
                </div>
                <div className="adminPanelCard">
                  <h4>{t.channels}</h4>
                  <AdminRankList rows={traffic.channels || []} type="channels" language={language} />
                </div>
                <div className="adminPanelCard">
                  <h4>{t.countries}</h4>
                  <AdminRankList rows={traffic.countries || []} type="countries" language={language} />
                </div>
              </div>
            </section>

            <section className="adminBlock">
              <h3>
                <ShieldCheck size={18} />
                {t.businessMetrics}
              </h3>
              <div className="adminMetricGrid">
                <AdminMetricCard icon={<Users size={18} />} label={t.registeredUsers} value={firstNumber(businessTotals.registeredUsers, business.totalUsers)} hint={`${t.newRegistrations}: ${formatNumber(firstNumber(businessRange.newRegistrations, business.rangeUsers))}`} />
                <AdminMetricCard icon={<Crown size={18} />} label={t.activeMemberships} value={firstNumber(businessTotals.activeMembers, business.activeMemberships)} hint={`${t.newMembers}: ${formatNumber(firstNumber(businessRange.newMembers, business.rangeMemberships))}`} />
                <AdminMetricCard icon={<ImageIcon size={18} />} label={t.totalGenerationsMetric} value={firstNumber(businessTotals.totalGenerations, business.totalGenerations)} hint={`${t.rangeGenerations}: ${formatNumber(firstNumber(businessRange.generations, business.rangeGenerations))}`} />
                <AdminMetricCard icon={<PackageCheck size={18} />} label={t.succeeded} value={firstNumber(businessTotals.succeededGenerations, business.succeededGenerations)} hint={`${t.rangeGenerations}: ${formatNumber(firstNumber(businessRange.succeededGenerations, business.rangeSucceededGenerations))}`} />
                <AdminMetricCard icon={<Coins size={18} />} label={t.creditsConsumed} value={firstNumber(businessTotals.totalCreditsConsumed, business.totalGenerationCredits)} hint={`${t.rangeGenerations}: ${formatNumber(firstNumber(businessRange.creditsConsumed, business.rangeGenerationCredits))}`} />
                <AdminMetricCard icon={<X size={18} />} label={t.failed} value={firstNumber(businessTotals.failedGenerations, business.failedGenerations)} />
                <AdminMetricCard icon={<LoaderCircle size={18} />} label={t.pending} value={firstNumber(businessTotals.pendingGenerations, business.pendingGenerations)} />
                <AdminMetricCard icon={<Coins size={18} />} label={t.creditsInCirculation} value={firstNumber(businessTotals.totalCreditBalance, business.totalCreditBalance)} />
                <AdminMetricCard icon={<CreditCard size={18} />} label={t.purchasedCredits} value={firstNumber(businessTotals.purchasedCredits, business.purchasedCredits)} />
                <AdminMetricCard icon={<Crown size={18} />} label={t.membershipCredits} value={firstNumber(businessTotals.membershipCredits, business.membershipCredits)} />
              </div>
              <div className="adminChartGrid">
                <div className="adminPanelCard chart">
                  <h4>{t.businessTrend}</h4>
                  {business.daily?.length ? (
                    <AdminTrendChart rows={business.daily} series={businessSeries} language={language} emptyLabel={t.noAnalyticsRows} />
                  ) : (
                    <p className="emptyTransactions">{t.noAnalyticsRows}</p>
                  )}
                </div>
              </div>
            </section>
          </div>
        ) : null}

        <div className="adminHeader compact">
          <div>
            <h3>{t.users}</h3>
          </div>
          <button type="button" onClick={() => loadAdminData()} disabled={status === 'loading'}>
            {status === 'loading' ? <LoaderCircle className="spinIcon" size={17} /> : <RefreshCw size={17} />}
            {t.refresh}
          </button>
        </div>
        {status === 'loading' ? (
          <div className="adminState">
            <LoaderCircle className="spinIcon" size={20} />
            {t.loadingUsers}
          </div>
        ) : null}
        {status === 'error' ? <p className="authMessage error">{message || t.adminOnly}</p> : null}
        {adjustment ? (
          <form className="adminAdjustForm" onSubmit={handleAdjustCredits}>
            <strong>{adjustment.email}</strong>
            <label>
              {t.creditAmount}
              <input
                type="number"
                step="1"
                value={adjustment.amount}
                onChange={(event) => setAdjustment((current) => ({ ...current, amount: event.target.value }))}
              />
            </label>
            <label>
              {t.reason}
              <input
                value={adjustment.reason}
                onChange={(event) => setAdjustment((current) => ({ ...current, reason: event.target.value }))}
              />
            </label>
            <button type="submit" disabled={adjustStatus === 'loading'}>
              {adjustStatus === 'loading' ? <LoaderCircle className="spinIcon" size={16} /> : <Coins size={16} />}
              {t.applyAdjustment}
            </button>
          </form>
        ) : null}
        {adjustStatus === 'error' ? <p className="authMessage error">{message}</p> : null}
        {status !== 'loading' && !users.length && status !== 'error' ? (
          <div className="adminState">
            <Users size={20} />
            {t.noUsers}
          </div>
        ) : null}
        {users.length ? (
          <div className="adminTableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>{t.users}</th>
                  <th>{t.role}</th>
                  <th>{t.creditBalance}</th>
                  <th>{t.currentPlan}</th>
                  <th>{t.freeGeneration}</th>
                  <th>{t.totalGenerations}</th>
                  <th>{t.spentCredits}</th>
                  <th>{t.purchased}</th>
                  <th>{t.lastGeneration}</th>
                  <th>{t.createdAt}</th>
                  <th>{t.adminAdjust}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="adminUserCell">
                        {user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : <UserCircle size={28} />}
                        <div>
                          <strong>{user.email}</strong>
                          {user.fullName ? <span>{user.fullName}</span> : null}
                        </div>
                      </div>
                    </td>
                    <td><span className="roleBadge">{user.role}</span></td>
                    <td>{user.creditBalance}</td>
                    <td>{formatMembershipStatus(user.membership, language)}</td>
                    <td>{user.freeUsed ? t.freeUsedShort : t.freeReady}</td>
                    <td>{formatNumber(user.usage?.totalGenerations)}</td>
                    <td>{formatNumber(user.usage?.totalGenerationCredits)}</td>
                    <td>{formatNumber(user.usage?.purchasedCredits)}</td>
                    <td>
                      {user.usage?.lastGenerationCaseId ? (
                        <button
                          className="tableAction compactAction"
                          type="button"
                          onClick={() => {
                            const caseItem = casesById?.get(user.usage.lastGenerationCaseId);
                            if (caseItem) onOpenCase?.(caseItem);
                          }}
                          disabled={!casesById?.has(user.usage.lastGenerationCaseId)}
                        >
                          <ImageIcon size={14} />
                          #{user.usage.lastGenerationCaseId}
                        </button>
                      ) : '-'}
                    </td>
                    <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US') : '-'}</td>
                    <td>
                      <button
                        className="tableAction"
                        type="button"
                        onClick={() => setAdjustment({
                          userId: user.id,
                          email: user.email,
                          amount: 10,
                          reason: ''
                        })}
                      >
                        <Coins size={15} />
                        {t.adminAdjust}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function BillingPanel({
  open,
  language,
  session,
  profile,
  notice,
  casesById,
  onClose,
  onAuthRequired,
  onProfileChange,
  onOpenCase
}) {
  const t = copy[language];
  const [plans, setPlans] = useState([]);
  const [packs, setPacks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [checkoutAvailable, setCheckoutAvailable] = useState(false);
  const [checkoutProviders, setCheckoutProviders] = useState({ stripe: false, alipay: false });
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [busyProduct, setBusyProduct] = useState('');
  useBodyScrollLock(open);

  async function loadBilling() {
    setStatus('loading');
    setMessage(notice || '');

    try {
      const headers = getAuthHeaders(session);
      const [plansResponse, historyResponse] = await Promise.all([
        fetch('/api/billing/plans', { headers }),
        session?.access_token
          ? fetch('/api/billing/history', { headers })
          : Promise.resolve(null)
      ]);
      const plansPayload = await plansResponse.json().catch(() => ({}));
      if (!plansResponse.ok || !plansPayload.ok) {
        throw new Error(plansPayload.error || 'SERVER_NOT_CONFIGURED');
      }

      setPlans(plansPayload.plans || []);
      setPacks(plansPayload.packs || []);
      setCheckoutAvailable(Boolean(plansPayload.checkoutAvailable));
      setCheckoutProviders({
        stripe: Boolean(plansPayload.checkoutProviders?.stripe),
        alipay: Boolean(plansPayload.checkoutProviders?.alipay)
      });
      if (plansPayload.user) onProfileChange(plansPayload.user);

      if (historyResponse) {
        const historyPayload = await historyResponse.json().catch(() => ({}));
        if (historyResponse.ok && historyPayload.ok) {
          setTransactions(historyPayload.transactions || []);
        }
      } else {
        setTransactions([]);
      }

      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setMessage(generationErrorMessage(error.message, language));
    }
  }

  useEffect(() => {
    if (open) loadBilling();
  }, [open, session?.access_token]);

  useEffect(() => {
    if (open && notice) setMessage(notice);
  }, [notice, open]);

  async function handleCheckout(product, provider = 'stripe') {
    if (!session?.access_token) {
      onAuthRequired();
      return;
    }
    if (!checkoutProviders[provider] || (provider === 'alipay' && !product.alipayAvailable)) {
      setMessage(t.checkoutUnavailable);
      return;
    }

    setBusyProduct(`${provider}:${product.type}:${product.id}`);
    setMessage('');

    try {
      const response = await fetch(
        provider === 'alipay' ? '/api/billing/alipay/checkout' : '/api/billing/checkout',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(session)
        },
        body: JSON.stringify({
          productType: product.type,
          productId: product.id
        })
        }
      );
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'CHECKOUT_FAILED');
      }
      if (payload.user) onProfileChange(payload.user);

      if (provider === 'alipay') {
        if (!payload.paymentHtml) throw new Error('ALIPAY_CHECKOUT_FAILED');
        submitAlipayPaymentForm(payload.paymentHtml);
      } else {
        if (!payload.url) throw new Error('CHECKOUT_FAILED');
        window.location.href = payload.url;
      }
    } catch (error) {
      setBusyProduct('');
      setMessage(generationErrorMessage(error.message, language));
    }
  }

  async function handlePortal() {
    if (!session?.access_token) {
      onAuthRequired();
      return;
    }
    setBusyProduct('portal');
    setMessage('');

    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: getAuthHeaders(session)
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok || !payload.url) {
        throw new Error(payload.error || 'BILLING_PORTAL_FAILED');
      }
      window.location.href = payload.url;
    } catch (error) {
      setBusyProduct('');
      setMessage(generationErrorMessage(error.message, language));
    }
  }

  if (!open) return null;

  const activePlanId = profile?.membership?.isActive ? profile.membership.planId : '';
  const activePlan = plans.find((plan) => plan.id === activePlanId);
  const activePlanName = activePlan ? productText(activePlan.name, language) : activePlanId || t.noPlan;

  return (
    <div
      className="previewOverlay billingOverlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="billingDialog" role="dialog" aria-modal="true" aria-labelledby="billing-title">
        <button className="previewClose" type="button" onClick={onClose} aria-label={t.closePreview}>
          <X size={20} />
        </button>
        <div className="billingHero">
          <span className="eyebrow">
            <CreditCard size={16} />
            {t.membershipCenter}
          </span>
          <h2 id="billing-title">{t.billingTitle}</h2>
          <p>{t.billingSubtitle}</p>
        </div>

        <div className="billingSummary">
          <div>
            <span>{t.balanceTitle}</span>
            <strong>{profile?.creditBalance || 0}</strong>
            <em>{t.credits}</em>
          </div>
          <div>
            <span>{t.currentPlan}</span>
            <strong>{activePlanName}</strong>
            <em>{formatMembershipStatus(profile?.membership, language)}</em>
          </div>
          <div>
            <span>{t.freeGeneration}</span>
            <strong>{profile?.freeUsed ? t.freeUsedShort : t.freeReady}</strong>
            <em>{checkoutAvailable ? t.paymentReady : t.billingNotReady}</em>
          </div>
        </div>

        {!session?.access_token ? (
          <div className="billingState">
            <p>{t.authRequired}</p>
            <button type="button" onClick={onAuthRequired}>
              <LogIn size={17} />
              {t.signIn}
            </button>
          </div>
        ) : null}

        {status === 'loading' ? (
          <div className="billingState">
            <LoaderCircle className="spinIcon" size={20} />
            {t.loadBilling}
          </div>
        ) : null}

        {message ? (
          <p className={cx('authMessage', status === 'error' && 'error')}>{message}</p>
        ) : null}

        <div className="billingSections">
          <section>
            <h3>
              <Crown size={18} />
              {t.membershipPlans}
            </h3>
            <div className="billingCards">
              {plans.map((plan) => {
                const isCurrent = activePlanId === plan.id;
                const busy = busyProduct === `stripe:${plan.type}:${plan.id}`;
                return (
                  <article className={cx('billingCard', isCurrent && 'current')} key={plan.id}>
                    <span>{productText(plan.name, language)}</span>
                    <strong>{plan.priceLabel}<small>/{plan.interval}</small></strong>
                    <p>{productText(plan.description, language)}</p>
                    <div className="billingCredits">{t.monthlyCredits(plan.monthlyCredits)}</div>
                    <button
                      type="button"
                      disabled={busy || isCurrent || !checkoutProviders.stripe}
                      onClick={() => handleCheckout(plan, 'stripe')}
                    >
                      {busy ? <LoaderCircle className="spinIcon" size={16} /> : <Crown size={16} />}
                      {isCurrent ? t.currentPlan : t.subscribe}
                    </button>
                  </article>
                );
              })}
            </div>
            {profile?.membership?.isActive ? (
              <button className="portalButton" type="button" onClick={handlePortal} disabled={busyProduct === 'portal'}>
                {busyProduct === 'portal' ? <LoaderCircle className="spinIcon" size={16} /> : <CreditCard size={16} />}
                {t.manageSubscription}
              </button>
            ) : null}
          </section>

          <section>
            <h3>
              <Coins size={18} />
              {t.creditPacks}
            </h3>
            <div className="billingCards">
              {packs.map((pack) => {
                const stripeBusy = busyProduct === `stripe:${pack.type}:${pack.id}`;
                const alipayBusy = busyProduct === `alipay:${pack.type}:${pack.id}`;
                const busy = stripeBusy || alipayBusy;
                return (
                  <article className="billingCard" key={pack.id}>
                    <span>{productText(pack.name, language)}</span>
                    <strong>{pack.priceLabel}</strong>
                    <p>{productText(pack.description, language)}</p>
                    <div className="billingCredits">{t.packCredits(pack.credits)}</div>
                    <div className="billingPaymentActions">
                      <button
                        type="button"
                        disabled={busy || !checkoutProviders.stripe}
                        onClick={() => handleCheckout(pack, 'stripe')}
                      >
                        {stripeBusy ? <LoaderCircle className="spinIcon" size={16} /> : <CreditCard size={16} />}
                        {t.payWithStripe}
                      </button>
                      <button
                        className="alipayButton"
                        type="button"
                        disabled={busy || !checkoutProviders.alipay || !pack.alipayAvailable}
                        onClick={() => handleCheckout(pack, 'alipay')}
                      >
                        {alipayBusy ? <LoaderCircle className="spinIcon" size={16} /> : <Coins size={16} />}
                        {pack.alipayAvailable
                          ? `${t.payWithAlipay} · ${pack.alipayPriceLabel}`
                          : t.alipayPriceMissing}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <section className="transactionSection">
          <h3>
            <ReceiptText size={18} />
            {t.transactionHistory}
          </h3>
          {transactions.length ? (
            <div className="transactionList">
              {transactions.map((transaction) => (
                <TransactionItem
                  transaction={transaction}
                  language={language}
                  casesById={casesById}
                  onOpenCase={onOpenCase}
                  key={transaction.id}
                />
              ))}
            </div>
          ) : (
            <p className="emptyTransactions">{t.noTransactions}</p>
          )}
        </section>
      </section>
    </div>
  );
}

function SkillSection({ language, repoUrl }) {
  const t = copy[language];
  const [commandCopied, setCommandCopied] = useState(false);
  const installCommand =
    'npx skills add freestylefly/awesome-gpt-image-2 --skill gpt-image-2-style-library --agent claude-code codex --global --yes --copy';
  const skillSourceUrl = `${repoUrl}/tree/main/agents/skills/gpt-image-2-style-library`;
  const npmUrl = 'https://www.npmjs.com/package/gpt-image-2-style-library';

  async function handleCopyCommand() {
    await copyToClipboard(installCommand);
    setCommandCopied(true);
    window.setTimeout(() => setCommandCopied(false), 1600);
  }

  return (
    <section className="skillSection" id="agent-skill">
      <div className="skillGrid">
        <div className="skillCopy">
          <span className="eyebrow">
            <Bot size={16} />
            {t.skillEyebrow}
          </span>
          <h2>{t.skillTitle}</h2>
          <p>{t.skillSubtitle}</p>
          <div className="skillStats">
            {t.skillStats.map((item, index) => {
              const icons = [Bot, Terminal, PackageCheck];
              const Icon = icons[index] || Check;
              return (
                <span key={item}>
                  <Icon size={16} />
                  {item}
                </span>
              );
            })}
          </div>
          <div className="skillCommand">
            <div className="skillCommandHeader">
              <strong>{t.skillCommandLabel}</strong>
              <button type="button" onClick={handleCopyCommand}>
                {commandCopied ? <Check size={16} /> : <Copy size={16} />}
                {commandCopied ? t.skillCopied : t.skillCopyCommand}
              </button>
            </div>
            <code>{installCommand}</code>
          </div>
          <div className="skillPrompt">
            <span>{t.skillPromptLabel}</span>
            <code>{t.skillPrompt}</code>
          </div>
          <div className="skillActions">
            <a href={skillSourceUrl} target="_blank" rel="noreferrer">
              <Github size={18} />
              {t.skillOpenDocs}
            </a>
            <a href={npmUrl} target="_blank" rel="noreferrer">
              <PackageCheck size={18} />
              {t.skillNpm}
            </a>
          </div>
        </div>
        <figure className="skillPreview">
          <img src={skillExampleImage} alt={t.skillExampleAlt} loading="lazy" />
          <figcaption>
            <Sparkles size={15} />
            {t.skillExampleCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function TemplateSection({ language, styleLibrary, onOpenTemplate }) {
  const t = copy[language];
  const repoDocsUrl = `${styleLibrary.repository || fallbackRepoUrl}/blob/main/${styleLibrary.templateDocument}`;
  const templates = styleLibrary.templates || [];

  return (
    <section className="templateSection" id="templates">
      <div className="sectionHead templateHead">
        <div>
          <span className="eyebrow">{t.templateEyebrow}</span>
          <h2>{t.templateTitle}</h2>
          <p>{t.templateSubtitle}</p>
        </div>
        <a className="templateCta" href={`${repoDocsUrl}#section-templates`} target="_blank" rel="noreferrer">
          {t.openTemplate}
          <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="caseGrid templateCaseGrid">
        {templates.map((item, index) => {
          const title = textFor(item.title, language);
          const description = textFor(item.description, language);
          return (
            <article className="caseCard templateVisualCard" key={item.id}>
              <button
                className="caseImage imageButton templateImage"
                type="button"
                onClick={() => onOpenTemplate(item)}
              >
                <img src={item.cover} alt={title} loading="lazy" />
                <span className="caseBadge">
                  {language === 'ko' ? '템플릿' : 'Template'} {String(index + 1).padStart(2, '0')}
                </span>
                <span className="imageHint">
                  <Eye size={15} />
                  {t.viewDetails}
                </span>
              </button>
              <div className="caseBody">
                <div className="caseMeta">
                  <span>{t.templateKind}</span>
                  <span>{localizeLabel(item.category, language, styleLibrary)}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="tagRow">
                  {(item.tags || []).map((tag) => (
                    <span key={`${item.id}-${tag}`}>{localizeTemplateTag(tag, language, styleLibrary)}</span>
                  ))}
                </div>
                <div className="cardActions templateActions">
                  <button type="button" onClick={() => onOpenTemplate(item)}>
                    <Eye size={17} />
                    {t.viewDetails}
                  </button>
                  <a href={`${repoDocsUrl}#${item.anchor}`} target="_blank" rel="noreferrer">
                    {t.openTemplate}
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PromptCard({
  caseItem,
  copied,
  favorited,
  favoriteBusy,
  language,
  onCopy,
  onOpen,
  onGenerate,
  onToggleFavorite,
  styleLibrary
}) {
  const t = copy[language];
  const tags = [...new Set([...caseItem.styles, ...caseItem.scenes])].slice(0, 4);

  return (
    <article className="caseCard">
      <button className="caseImage imageButton" type="button" onClick={() => onOpen(caseItem)}>
        <img src={caseItem.image} alt={caseItem.imageAlt} loading="lazy" />
        <span className="caseBadge">{language === 'ko' ? '사례' : 'Case'} {caseItem.id}</span>
        <span className="imageHint">
          <Eye size={15} />
          {t.viewDetails}
        </span>
      </button>
      <div className="caseBody">
        <div className="caseMeta">
          <span>{localizeLabel(caseItem.category, language, styleLibrary)}</span>
          {caseItem.sourceUrl ? (
            <a href={caseItem.sourceUrl} target="_blank" rel="noreferrer">
              {caseItem.sourceLabel}
            </a>
          ) : (
            <span>{caseItem.sourceLabel}</span>
          )}
        </div>
        <h3>{caseItem.title}</h3>
        <p>{caseItem.promptPreview}</p>
        <div className="tagRow">
          {tags.map((tag) => (
            <span key={`${caseItem.id}-${tag}`}>{localizeLabel(tag, language, styleLibrary)}</span>
          ))}
        </div>
        <div className="cardActions caseActions">
          <button
            className={cx('favoriteAction', favorited && 'active')}
            type="button"
            onClick={() => onToggleFavorite(caseItem)}
            disabled={favoriteBusy}
            aria-pressed={Boolean(favorited)}
          >
            {favoriteBusy ? <LoaderCircle className="spinIcon" size={17} /> : <Heart size={17} />}
            {favorited ? t.favorited : t.favorite}
          </button>
          <button type="button" onClick={() => onCopy(caseItem)}>
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? t.copied : t.copyPrompt}
          </button>
          <button type="button" onClick={() => onOpen(caseItem)}>
            <Eye size={17} />
            {t.viewDetails}
          </button>
          <button type="button" onClick={() => onGenerate(caseItem)}>
            <ImageIcon size={17} />
            {t.generateTest}
          </button>
          <a href={caseItem.githubUrl} target="_blank" rel="noreferrer" aria-label={t.openOnGithub}>
            <Github size={18} />
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

function PreviewDialog({
  preview,
  language,
  styleLibrary,
  copiedId,
  session,
  profile,
  apimartKey,
  apimartPrice,
  apimartPriceMeta,
  favorite,
  favoriteBusy,
  onClose,
  onCopyText,
  onToggleFavorite,
  onAuthRequired,
  onBillingRequired,
  onApiKeySettings,
  onProfileChange
}) {
  const t = copy[language];
  const repoDocsUrl = `${styleLibrary.repository || fallbackRepoUrl}/blob/main/${styleLibrary.templateDocument}`;
  const [editablePrompt, setEditablePrompt] = useState('');
  const [generationState, setGenerationState] = useState({
    status: 'idle',
    image: '',
    message: '',
    progress: 0,
    taskId: '',
    mode: '',
    cost: null,
    expiresAt: null
  });
  const pollControllerRef = useRef(null);
  const activeCaseRef = useRef(null);
  activeCaseRef.current = preview?.type === 'case' ? preview.item.id : null;
  useBodyScrollLock(Boolean(preview));

  useEffect(() => {
    if (!preview) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [preview, onClose]);

  useEffect(() => {
    pollControllerRef.current?.abort();
    pollControllerRef.current = null;
    if (preview?.type !== 'case') return undefined;

    const caseId = preview.item.id;
    let controller = null;
    const savedGeneration = getSavedGeneration(preview.item.id);
    const pendingGeneration = getPendingGeneration(caseId);
    setEditablePrompt(pendingGeneration?.prompt || savedGeneration?.prompt || preview.item.prompt || '');

    if (pendingGeneration) {
      setGenerationState({
        status: 'generating',
        image: '',
        message: '',
        progress: Number(pendingGeneration.progress || 0),
        prompt: pendingGeneration.prompt || preview.item.prompt || '',
        taskId: pendingGeneration.taskId,
        mode: pendingGeneration.mode,
        cost: null,
        expiresAt: null
      });
      controller = new AbortController();
      pollControllerRef.current = controller;
      void pollPendingGeneration(caseId, pendingGeneration, controller);
    } else if (savedGeneration) {
      setGenerationState({
        status: 'saved',
        image: savedGeneration.image,
        message: '',
        progress: 100,
        prompt: savedGeneration.prompt || preview.item.prompt || '',
        savedAt: savedGeneration.savedAt || '',
        taskId: savedGeneration.taskId || '',
        mode: savedGeneration.mode || '',
        cost: savedGeneration.cost ?? null,
        expiresAt: savedGeneration.expiresAt || null
      });
    } else {
      setGenerationState({
        status: 'idle',
        image: '',
        message: '',
        progress: 0,
        prompt: '',
        savedAt: '',
        taskId: '',
        mode: '',
        cost: null,
        expiresAt: null
      });
    }

    return () => {
      controller?.abort();
      pollControllerRef.current?.abort();
    };
  }, [preview?.type, preview?.item?.id, apimartKey, session?.access_token, session?.user?.id, language]);

  function updateActiveGeneration(caseId, controller, nextState) {
    if (activeCaseRef.current !== caseId || controller?.signal?.aborted) return;
    setGenerationState((current) => (
      typeof nextState === 'function' ? nextState(current) : nextState
    ));
  }

  async function pollPendingGeneration(caseId, pending, controller) {
    if (pending.mode === 'personal' && !apimartKey) {
      updateActiveGeneration(caseId, controller, (current) => ({
        ...current,
        status: 'paused',
        message: t.apimartPendingNeedsKey
      }));
      return;
    }
    if (pending.mode === 'platform' && (!session?.access_token || (pending.userId && pending.userId !== session?.user?.id))) {
      updateActiveGeneration(caseId, controller, (current) => ({
        ...current,
        status: 'paused',
        message: t.apimartPendingNeedsLogin
      }));
      return;
    }

    updateActiveGeneration(caseId, controller, (current) => ({
      ...current,
      status: 'generating',
      message: '',
      taskId: pending.taskId,
      mode: pending.mode,
      prompt: pending.prompt || current.prompt
    }));

    const fetchWithSignal = (url, options = {}) => fetch(url, { ...options, signal: controller.signal });
    try {
      const task = await pollApimartTask(async () => {
        const nextTask = pending.mode === 'personal'
          ? await fetchPersonalTask(pending.taskId, apimartKey, language, fetchWithSignal)
          : await fetchPlatformTask(pending.taskId, session.access_token, language, fetchWithSignal);
        if (nextTask?.user) onProfileChange(nextTask.user);
        return nextTask;
      }, {
        signal: controller.signal,
        onProgress: (nextTask) => {
          const progress = Math.max(0, Math.min(100, Math.round(Number(nextTask.progress || 0))));
          savePendingGeneration(caseId, { ...pending, progress, updatedAt: new Date().toISOString() });
          updateActiveGeneration(caseId, controller, (current) => ({
            ...current,
            status: 'generating',
            progress,
            taskId: pending.taskId,
            mode: pending.mode,
            message: ''
          }));
        }
      });

      if (controller.signal.aborted) return;
      if (task.status === 'completed' && task.image) {
        const savedAt = new Date().toISOString();
        const result = {
          image: task.image,
          prompt: pending.prompt,
          savedAt,
          taskId: pending.taskId,
          mode: pending.mode,
          expiresAt: task.expiresAt || null,
          cost: task.cost ?? null
        };
        saveGeneratedTest(caseId, result);
        clearPendingGeneration(caseId);
        updateActiveGeneration(caseId, controller, {
          status: 'success',
          message: '',
          progress: 100,
          ...result
        });
        return;
      }

      clearPendingGeneration(caseId);
      const code = task.status === 'failed' ? apimartTaskErrorCode(task) : 'APIMART_INVALID_RESPONSE';
      updateActiveGeneration(caseId, controller, {
        status: 'error',
        image: '',
        message: generationErrorMessage(code, language),
        progress: Number(task.progress || 0),
        prompt: pending.prompt,
        taskId: pending.taskId,
        mode: pending.mode,
        cost: task.cost ?? null,
        expiresAt: null
      });
    } catch (error) {
      if (error?.code === 'APIMART_POLL_ABORTED' || error?.name === 'AbortError' || controller.signal.aborted) return;
      updateActiveGeneration(caseId, controller, (current) => ({
        ...current,
        status: error?.code === 'APIMART_TASK_TIMEOUT' ? 'timeout' : 'error',
        message: generationErrorMessage(error?.code || error?.message, language),
        taskId: pending.taskId,
        mode: pending.mode
      }));
    }
  }

  if (!preview) return null;

  const { type, item } = preview;
  const isTemplate = type === 'template';
  const title = isTemplate ? textFor(item.title, language) : item.title;
  const description = isTemplate ? textFor(item.description, language) : compactText(item.promptPreview);
  const image = isTemplate ? item.cover : item.image;
  const imageAlt = isTemplate ? title : item.imageAlt;
  const promptText = isTemplate ? formatTemplatePrompt(item, language, styleLibrary) : editablePrompt;
  const copyId = isTemplate ? `template-${item.id}` : `case-${item.id}`;
  const isCopied = copiedId === copyId;
  const primaryLink = isTemplate ? `${repoDocsUrl}#${item.anchor}` : item.githubUrl;
  const primaryLabel = isTemplate ? t.openTemplate : t.openOnGithub;
  const meta = isTemplate
    ? [t.templateKind, localizeLabel(item.category, language, styleLibrary)]
    : [
        `${language === 'ko' ? '사례' : 'Case'} ${item.id}`,
        localizeLabel(item.category, language, styleLibrary)
      ];
  const tags = isTemplate
    ? [...new Set([...(item.tags || []), ...(item.styles || []), ...(item.scenes || [])])].slice(0, 8)
    : [...new Set([...(item.styles || []), ...(item.scenes || [])])].slice(0, 8);
  const guidance = listFor(item.guidance, language);
  const pitfalls = listFor(item.pitfalls, language);
  const isGenerating = generationState.status === 'submitting' || generationState.status === 'generating';
  const generatedImage = !isTemplate ? generationState.image : '';
  const hasPersonalKey = Boolean(apimartKey);
  const isSignedIn = Boolean(session?.access_token);
  const creditBalance = Number(profile?.creditBalance || 0);
  const isOutOfCredits = isSignedIn
    && creditBalance <= 0
    && (profile?.isSuperAdmin || Boolean(profile?.freeUsed));
  const generationLocked = isGenerating;
  const pendingGeneration = !isTemplate ? getPendingGeneration(item.id) : null;
  const activeTaskMode = pendingGeneration?.mode
    || (['submitting', 'generating', 'timeout', 'paused'].includes(generationState.status) ? generationState.mode : '');
  const generationMode = activeTaskMode || (hasPersonalKey ? 'personal' : 'platform');
  const quotaText = generationMode === 'personal'
    ? hasPersonalKey
      ? t.apimartPersonalMode(maskApimartKey(apimartKey), formatApimartPrice(apimartPrice))
      : t.apimartPendingNeedsKey
    : isSignedIn
      ? `${t.apimartPlatformMode} · ${getGenerationQuotaText(profile, language)}`
      : t.apimartAnonymousChoice;
  const generationButtonLabel = isGenerating
    ? t.generating
    : pendingGeneration
      ? t.apimartContinueChecking
      : !hasPersonalKey && !isSignedIn
        ? t.apimartConfigureKey
        : !hasPersonalKey && isOutOfCredits
          ? t.buyCredits
          : t.generateImage;

  async function handleGenerate() {
    if (isTemplate || isGenerating) return;
    const pending = getPendingGeneration(item.id);
    if (pending) {
      pollControllerRef.current?.abort();
      const controller = new AbortController();
      pollControllerRef.current = controller;
      await pollPendingGeneration(item.id, pending, controller);
      return;
    }
    if (!hasPersonalKey && !isSignedIn) {
      onApiKeySettings();
      return;
    }
    const prompt = editablePrompt.trim();
    if (!prompt || prompt.length > APIMART_MAX_PROMPT_LENGTH) {
      setGenerationState({ status: 'error', image: '', message: t.promptRequired });
      return;
    }
    if (!hasPersonalKey && isOutOfCredits) {
      onBillingRequired();
      setGenerationState((current) => ({ ...current, status: 'idle', message: t.creditsRequired }));
      return;
    }

    const mode = hasPersonalKey ? 'personal' : 'platform';
    setGenerationState({
      status: 'submitting',
      image: '',
      message: '',
      progress: 0,
      prompt,
      taskId: '',
      mode,
      cost: null,
      expiresAt: null
    });

    try {
      const submitted = mode === 'personal'
        ? await submitPersonalGeneration(prompt, apimartKey, language)
        : await submitPlatformGeneration({
            caseId: item.id,
            prompt,
            language,
            accessToken: session.access_token
          });
      if (submitted.user) onProfileChange(submitted.user);
      const pendingEntry = {
        taskId: submitted.taskId,
        mode,
        prompt,
        userId: mode === 'platform' ? session.user?.id || '' : '',
        createdAt: new Date().toISOString(),
        progress: 0
      };
      savePendingGeneration(item.id, pendingEntry);

      if (activeCaseRef.current === item.id) {
        setGenerationState((current) => ({
          ...current,
          status: 'generating',
          taskId: submitted.taskId,
          mode
        }));
        const controller = new AbortController();
        pollControllerRef.current = controller;
        await pollPendingGeneration(item.id, pendingEntry, controller);
      }
    } catch (error) {
      if (error?.user) onProfileChange(error.user);
      if (error?.code === 'AUTH_REQUIRED') {
        if (activeCaseRef.current === item.id) {
          onAuthRequired();
        }
        return;
      }
      if (activeCaseRef.current === item.id) {
        setGenerationState((current) => ({
          ...current,
          status: 'error',
          message: generationErrorMessage(error?.code || error?.message, language)
        }));
      }
    }
  }

  return (
    <div
      className="previewOverlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="previewDialog" role="dialog" aria-modal="true" aria-labelledby="preview-title">
        <button className="previewClose" type="button" onClick={onClose} aria-label={t.closePreview}>
          <X size={20} />
        </button>
        <div className={cx('previewMedia', generatedImage && 'hasComparison')}>
          {generatedImage ? (
            <div className="comparisonGrid">
              <figure className="comparisonFigure">
                <div className="comparisonLabel">{t.originalImage}</div>
                <img src={image} alt={imageAlt} />
              </figure>
              <figure className="comparisonFigure generatedFigure">
                <div className="comparisonLabel">
                  {t.generatedResult}
                  {generationState.status === 'saved' ? <span>{t.savedInBrowser}</span> : null}
                </div>
                <img src={generatedImage} alt={t.generatedResult} />
              </figure>
            </div>
          ) : (
            <img src={image} alt={imageAlt} />
          )}
        </div>
        <div className="previewContent">
          <div className="previewMeta">
            {meta.map((itemMeta) => (
              <span key={itemMeta}>{itemMeta}</span>
            ))}
          </div>
          <h2 id="preview-title">{title}</h2>
          <p>{description}</p>
          <div className="tagRow previewTags">
            {tags.map((tag) => (
              <span key={`${type}-${item.id}-${tag}`}>
                {isTemplate
                  ? localizeTemplateTag(tag, language, styleLibrary)
                  : localizeLabel(tag, language, styleLibrary)}
              </span>
            ))}
          </div>
          {isTemplate && item.useWhen ? (
            <div className="previewSection compactSection">
              <h3>{t.useWhen}</h3>
              <p>{textFor(item.useWhen, language)}</p>
            </div>
          ) : null}
          <div className="previewActions">
            {!isTemplate ? (
              <button
                className={cx('favoriteAction', favorite && 'active')}
                type="button"
                onClick={() => onToggleFavorite(item)}
                disabled={favoriteBusy}
                aria-pressed={Boolean(favorite)}
              >
                {favoriteBusy ? <LoaderCircle className="spinIcon" size={17} /> : <Heart size={17} />}
                {favorite ? t.unfavorite : t.favorite}
              </button>
            ) : null}
            <button type="button" onClick={() => onCopyText(promptText, copyId)}>
              {isCopied ? <Check size={17} /> : <Copy size={17} />}
              {isCopied ? t.copied : isTemplate ? t.copyTemplatePrompt : t.copyPrompt}
            </button>
            {!isTemplate ? (
              <button type="button" onClick={handleGenerate} disabled={generationLocked}>
                {isGenerating ? <LoaderCircle className="spinIcon" size={17} /> : <ImageIcon size={17} />}
                {generationButtonLabel}
              </button>
            ) : null}
            <a href={primaryLink} target="_blank" rel="noreferrer">
              {primaryLabel}
              <ArrowUpRight size={17} />
            </a>
            {!isTemplate && item.sourceUrl ? (
              <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                {t.source}
                <ArrowUpRight size={17} />
              </a>
            ) : null}
          </div>
          <div className="previewSection">
            <div className="sectionTitleRow">
              <h3>{isTemplate ? t.templatePrompt : t.editablePrompt}</h3>
              {!isTemplate ? (
                <button type="button" onClick={() => setEditablePrompt(item.prompt || '')}>
                  {t.resetPrompt}
                </button>
              ) : null}
            </div>
            {isTemplate ? (
              <pre className="promptBlock">{promptText}</pre>
            ) : (
              <textarea
                className="promptEditor"
                value={editablePrompt}
                onChange={(event) => setEditablePrompt(event.target.value)}
                maxLength={APIMART_MAX_PROMPT_LENGTH}
              />
            )}
          </div>
          {!isTemplate ? (
            <div className="generationPanel">
              <div className="generationModeRow">
                <div className={cx('generationQuota', generationMode === 'platform' && (!isSignedIn || isOutOfCredits) && 'used')}>
                  {generationMode === 'personal' ? <KeyRound size={14} /> : <Coins size={14} />}
                  {quotaText}
                </div>
                <button className="generationSettingsButton" type="button" onClick={onApiKeySettings} disabled={generationLocked}>
                  <Settings size={15} />
                  {hasPersonalKey ? t.apimartManageKey : t.apimartConfigureKey}
                </button>
              </div>
              <p className="generationPriceNote">{t.apimartPriceNote(formatApimartPrice(apimartPrice))}</p>
              {apimartPriceMeta?.stale ? (
                <p className="generationFallbackNote">{t.apimartPriceFallback(apimartPriceMeta.snapshotDate || APIMART_PRICE_SNAPSHOT_DATE)}</p>
              ) : null}
              {isGenerating && generationState.taskId ? (
                <div className="generationProgress" aria-live="polite">
                  <div>
                    <span>{t.apimartProgress(generationState.progress || 0)}</span>
                    <strong>{generationState.progress || 0}%</strong>
                  </div>
                  <progress value={generationState.progress || 0} max="100" />
                </div>
              ) : null}
              <div className="generationButtons">
                <button className="generationPrimaryButton" type="button" onClick={handleGenerate} disabled={generationLocked}>
                  {isGenerating ? <LoaderCircle className="spinIcon" size={17} /> : <ImageIcon size={17} />}
                  {generationButtonLabel}
                </button>
                {!hasPersonalKey && !isSignedIn ? (
                  <button className="generationSecondaryButton" type="button" onClick={onAuthRequired} disabled={generationLocked}>
                    <LogIn size={17} />
                    {t.usePlatformCredits}
                  </button>
                ) : null}
              </div>
              {generationState.taskId ? (
                <div className="generationTaskId">
                  <span>{t.apimartTaskId}</span>
                  <code>{generationState.taskId}</code>
                </div>
              ) : null}
              {generationState.cost != null ? (
                <p className="generationResultMeta">{t.apimartActualCost(formatApimartPrice(generationState.cost))}</p>
              ) : null}
              {generationState.expiresAt ? (
                <p className="generationResultMeta">{t.apimartExpiresAt(formatApimartExpiry(generationState.expiresAt, language))}</p>
              ) : null}
              {['error', 'timeout', 'paused'].includes(generationState.status) ? (
                <p className="generationMessage">{generationState.message}</p>
              ) : null}
            </div>
          ) : null}
          {isTemplate && (guidance.length || pitfalls.length || item.exampleCases?.length) ? (
            <div className="previewColumns">
              {guidance.length ? (
                <div className="previewSection compactSection">
                  <h3>{t.guidance}</h3>
                  <ul>
                    {guidance.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {pitfalls.length ? (
                <div className="previewSection compactSection">
                  <h3>{t.pitfalls}</h3>
                  <ul>
                    {pitfalls.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {item.exampleCases?.length ? (
                <div className="previewSection compactSection">
                  <h3>{t.examples}</h3>
                  <div className="exampleCaseRow">
                    {item.exampleCases.map((caseId) => (
                      <a
                        href={`${styleLibrary.repository || fallbackRepoUrl}/blob/main/docs/gallery.md#case-${caseId}`}
                        target="_blank"
                        rel="noreferrer"
                        key={caseId}
                      >
                        #{caseId}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function App() {
  useGaPageViews();
  const [siteData, setSiteData] = useState(null);
  const [styleLibrary, setStyleLibrary] = useState(null);
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem('language');
    return stored === 'en' ? 'en' : 'ko';
  });
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [style, setStyle] = useState('All');
  const [scene, setScene] = useState('All');
  const [preview, setPreview] = useState(null);
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(!isSupabaseConfigured || !supabase);
  const [profile, setProfile] = useState(null);
  const [favoriteRows, setFavoriteRows] = useState([]);
  const [favoriteBusyId, setFavoriteBusyId] = useState(null);
  const [favoriteMessage, setFavoriteMessage] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [authErrorCode, setAuthErrorCode] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountInitialSection, setAccountInitialSection] = useState('overview');
  const [adminOpen, setAdminOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [billingNotice, setBillingNotice] = useState('');
  const [billingReturnOrderId, setBillingReturnOrderId] = useState('');
  const alipayReturnHandledRef = useRef('');
  const [apimartKey, setApimartKey] = useState(() => getStoredApimartKey());
  const [apiKeyOpen, setApiKeyOpen] = useState(false);
  const [apimartPriceMeta, setApimartPriceMeta] = useState({
    prices: { '1k': APIMART_DEFAULT_PRICE_USD },
    stale: true,
    snapshotDate: APIMART_PRICE_SNAPSHOT_DATE
  });
  const { copiedId, copyPrompt, copyText } = useCopy();
  const repoUrl = siteData?.repository || fallbackRepoUrl;
  const t = copy[language];
  const apimartPrice = Number(apimartPriceMeta?.prices?.['1k']) || APIMART_DEFAULT_PRICE_USD;
  const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const isCommunityRoute = normalizedPath === '/community' || normalizedPath === '/community/result';

  useEffect(() => {
    let cancelled = false;
    cleanupExpiredGeneratedTests();
    Promise.all([
      fetch('/cases.json').then((response) => response.json()),
      fetch('/style-library.json').then((response) => response.json())
    ])
      .then(([payload, library]) => {
        if (!cancelled) {
          setSiteData(payload);
          setStyleLibrary(library);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/apimart/pricing', { headers: { Accept: 'application/json' } })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload?.ok) throw new Error('APIMART_PRICING_FAILED');
        return payload;
      })
      .then((payload) => {
        if (!cancelled) setApimartPriceMeta(payload);
      })
      .catch(() => {
        if (!cancelled) {
          setApimartPriceMeta({
            prices: { '1k': APIMART_DEFAULT_PRICE_USD },
            stale: true,
            snapshotDate: APIMART_PRICE_SNAPSHOT_DATE
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language === 'ko' ? 'ko' : 'en';
    document.title = isCommunityRoute
      ? language === 'ko'
        ? 'GPT-Image2 유료 커뮤니티'
        : 'GPT-Image2 Paid Community'
      : language === 'ko'
        ? 'GPT-Image2 사례 갤러리'
        : 'GPT-Image2 Gallery';
  }, [isCommunityRoute, language]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authError = params.get('auth_error');
    if (!authError) return;

    setAuthErrorCode(authError);
    setAuthOpen(true);
    params.delete('auth_error');
    params.delete('auth_provider');
    const nextSearch = params.toString();
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', nextUrl);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;

    let active = true;
    supabase.auth.getSession()
      .then(({ data }) => {
        if (active) setSession(data.session || null);
      })
      .catch(() => {
        if (active) setSession(null);
      })
      .finally(() => {
        if (active) setAuthReady(true);
      });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession || null);
      setAuthReady(true);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!session?.access_token) {
      setProfile(null);
      setFavoriteRows([]);
      return () => {
        cancelled = true;
      };
    }

    fetch('/api/me', {
      headers: getAuthHeaders(session)
    })
      .then((response) => response.json())
      .then((payload) => {
        if (!cancelled && payload?.ok) {
          setProfile(payload.user);
        }
      })
      .catch(() => {
        if (!cancelled) setProfile(null);
      });

    return () => {
      cancelled = true;
    };
  }, [session?.access_token]);

  async function loadFavorites({ silent = true } = {}) {
    if (!session?.access_token) {
      setFavoriteRows([]);
      return [];
    }

    try {
      const response = await fetch('/api/favorites', {
        headers: getAuthHeaders(session)
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload?.ok) {
        throw new Error(payload.error || 'FAVORITES_LOAD_FAILED');
      }
      const favorites = normalizeFavoriteRows(payload.favorites);
      setFavoriteRows(favorites);
      return favorites;
    } catch {
      if (!silent) setTimedFavoriteMessage(t.favoriteFailed);
      return [];
    }
  }

  useEffect(() => {
    let cancelled = false;

    if (!session?.access_token) {
      setFavoriteRows([]);
      return () => {
        cancelled = true;
      };
    }

    loadFavorites().then((favorites) => {
      if (cancelled) return;
      setFavoriteRows(favorites);
    });

    return () => {
      cancelled = true;
    };
  }, [session?.access_token]);

  useEffect(() => {
    if (!siteData || !styleLibrary || !window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (!target) return;
    window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: 'start' });
    });
  }, [siteData, styleLibrary]);

  function openAuth() {
    setAuthErrorCode('');
    setAuthOpen(true);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const billing = params.get('billing');
    if (!billing) return;
    if (billing === 'alipay_return') {
      const orderId = params.get('order_id') || '';
      setBillingReturnOrderId(orderId);
      setBillingNotice(t.alipayReturnPending);
      setBillingOpen(true);

      const cleanParams = new URLSearchParams({ billing: 'alipay_return' });
      if (orderId) cleanParams.set('order_id', orderId);
      const nextUrl = `${window.location.pathname}?${cleanParams.toString()}${window.location.hash}`;
      window.history.replaceState({}, '', nextUrl);
      return;
    }
    if (billing === 'success') setBillingNotice(t.billingSuccess);
    if (billing === 'cancelled') setBillingNotice(t.billingCancelled);
    setBillingOpen(true);
    params.delete('billing');
    params.delete('session_id');
    const nextSearch = params.toString();
    const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
    window.history.replaceState({}, '', nextUrl);
  }, [t.alipayReturnPending, t.billingCancelled, t.billingSuccess]);

  useEffect(() => {
    if (!billingReturnOrderId || !session?.access_token) return undefined;
    const handledKey = `${billingReturnOrderId}:${session.user?.id || ''}`;
    if (alipayReturnHandledRef.current === handledKey) return undefined;
    alipayReturnHandledRef.current = handledKey;

    let cancelled = false;
    fetch(`/api/billing/alipay/query?orderId=${encodeURIComponent(billingReturnOrderId)}`, {
      headers: getAuthHeaders(session)
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.ok) {
          throw new Error(payload.error || 'ALIPAY_QUERY_FAILED');
        }
        if (cancelled) return;
        if (payload.user) setProfile(payload.user);
        setBillingNotice(payload.paid ? t.alipayPaymentSuccess : t.alipayPaymentPending);
      })
      .catch((error) => {
        if (!cancelled) setBillingNotice(generationErrorMessage(error.message, language));
      });

    return () => {
      cancelled = true;
    };
  }, [billingReturnOrderId, language, session?.access_token, session?.user?.id, t.alipayPaymentPending, t.alipayPaymentSuccess]);

  const latestCases = useMemo(() => {
    if (!siteData) return [];
    return [...siteData.cases].sort((a, b) => b.id - a.id);
  }, [siteData]);

  const heroCases = useMemo(
    () => takeDistinctCases(latestCases, HERO_CASE_COUNT),
    [latestCases]
  );

  const hotStripCases = useMemo(
    () => takeDistinctCases(
      latestCases,
      HOT_STRIP_CASE_COUNT,
      new Set(heroCases.map((caseItem) => caseItem.id))
    ),
    [heroCases, latestCases]
  );

  const filteredCases = useMemo(() => {
    if (!siteData) return [];
    const q = query.trim().toLowerCase();
    return siteData.cases.filter((item) => {
      const matchQuery =
        !q ||
        `${item.id} ${item.title} ${item.category} ${item.prompt} ${item.sourceLabel}`
          .toLowerCase()
          .includes(q);
      const matchCategory = category === 'All' || item.category === category;
      const matchStyle = style === 'All' || item.styles.includes(style);
      const matchScene = scene === 'All' || item.scenes.includes(scene);
      return matchQuery && matchCategory && matchStyle && matchScene;
    });
  }, [siteData, query, category, style, scene]);

  const orderedCategories = useMemo(
    () => (siteData && styleLibrary ? orderByLibrary(siteData.categories, styleLibrary.categories) : []),
    [siteData, styleLibrary]
  );
  const orderedStyles = useMemo(
    () => (siteData && styleLibrary ? orderByLibrary(siteData.styles, styleLibrary.styles) : []),
    [siteData, styleLibrary]
  );
  const orderedScenes = useMemo(
    () => (siteData && styleLibrary ? orderByLibrary(siteData.scenes, styleLibrary.scenes) : []),
    [siteData, styleLibrary]
  );

  const visibleCases = filteredCases.slice(0, 72);
  const casesById = useMemo(() => new Map((siteData?.cases || []).map((caseItem) => [caseItem.id, caseItem])), [siteData]);
  const favoriteCaseIds = useMemo(
    () => new Set(normalizeFavoriteRows(favoriteRows).map((favorite) => favorite.caseId)),
    [favoriteRows]
  );

  async function handleSignOut() {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setFavoriteRows([]);
    setAccountOpen(false);
    setAdminOpen(false);
    setBillingOpen(false);
  }

  function handleProfileChange(nextProfile) {
    if (nextProfile) setProfile(nextProfile);
  }

  function handleOpenCaseFromAccount(caseItem) {
    setAccountOpen(false);
    setAccountInitialSection('overview');
    setBillingOpen(false);
    setPreview({ type: 'case', item: caseItem });
  }

  function handleOpenCaseFromAdmin(caseItem) {
    setAdminOpen(false);
    setPreview({ type: 'case', item: caseItem });
  }

  function setTimedFavoriteMessage(message) {
    setFavoriteMessage(message);
    window.setTimeout(() => {
      setFavoriteMessage((current) => (current === message ? '' : current));
    }, 2400);
  }

  async function handleToggleFavorite(caseItem) {
    if (!caseItem?.id) return;
    if (!session?.access_token) {
      openAuth();
      setTimedFavoriteMessage(t.signInToFavorite);
      return;
    }

    const caseId = Number(caseItem.id);
    const isFavorite = favoriteCaseIds.has(caseId);
    const previousRows = favoriteRows;
    setFavoriteBusyId(caseId);

    if (isFavorite) {
      setFavoriteRows((current) => normalizeFavoriteRows(current).filter((favorite) => favorite.caseId !== caseId));
    } else {
      setFavoriteRows((current) => [
        { caseId, createdAt: new Date().toISOString() },
        ...normalizeFavoriteRows(current).filter((favorite) => favorite.caseId !== caseId)
      ]);
    }

    try {
      const response = await fetch(isFavorite ? `/api/favorites?caseId=${caseId}` : '/api/favorites', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          ...(isFavorite ? {} : { 'Content-Type': 'application/json' }),
          ...getAuthHeaders(session)
        },
        body: isFavorite ? undefined : JSON.stringify({ caseId })
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.ok) {
        if (payload.error === 'AUTH_REQUIRED' || payload.loginRequired) openAuth();
        throw new Error(payload.error || 'FAVORITE_FAILED');
      }

      if (!isFavorite && payload.favorite) {
        const favorite = normalizeFavoriteRows([payload.favorite])[0];
        if (favorite) {
          setFavoriteRows((current) => [
            favorite,
            ...normalizeFavoriteRows(current).filter((item) => item.caseId !== caseId)
          ]);
        }
      }
      setTimedFavoriteMessage(isFavorite ? t.favoriteRemoved : t.favoriteSaved);
    } catch {
      setFavoriteRows(previousRows);
      setTimedFavoriteMessage(t.favoriteFailed);
    } finally {
      setFavoriteBusyId(null);
    }
  }

  function handleOpenAccount(section = 'overview') {
    setAccountInitialSection(section);
    setAccountOpen(true);
    if (section === 'favorites') {
      loadFavorites({ silent: false });
    }
  }

  function handleCloseAccount() {
    setAccountOpen(false);
    setAccountInitialSection('overview');
  }

  if (isCommunityRoute) {
    return (
      <main>
        <CommunityPage
          language={language}
          setLanguage={setLanguage}
          authReady={authReady}
          session={session}
          profile={profile}
          onSignIn={openAuth}
          onSignOut={handleSignOut}
          onOpenAdmin={() => setAdminOpen(true)}
        />
        <AuthModal
          open={authOpen}
          language={language}
          initialErrorCode={authErrorCode}
          onClose={() => {
            setAuthOpen(false);
            setAuthErrorCode('');
          }}
        />
        <AdminPanel
          open={adminOpen}
          language={language}
          session={session}
          casesById={casesById}
          onClose={() => setAdminOpen(false)}
          onOpenCase={handleOpenCaseFromAdmin}
        />
      </main>
    );
  }

  if (!siteData || !styleLibrary) {
    return (
      <main>
        <div className="loadingScreen">
          <WandSparkles size={28} />
          <span>{t.loading}</span>
        </div>
      </main>
    );
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#">
          <WandSparkles size={21} />
          {t.brand}
        </a>
        <div className="topbarControls">
          <nav>
            <a href="#gallery">{t.navCases}</a>
            <a href="#templates">{t.navTemplates}</a>
            <a href="#agent-skill">{t.navSkill}</a>
            <CommunityNavItem language={language} />
            <a
              className="sponsorNavLink"
              href={sponsorUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={t.sponsorProjectLabel}
            >
              <Heart size={16} />
              {t.navSponsor}
            </a>
            <a href={repoUrl} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </nav>
          <LanguageSwitch language={language} setLanguage={setLanguage} />
          <UserMenu
            language={language}
            session={session}
            profile={profile}
            onSignIn={openAuth}
            onSignOut={handleSignOut}
            onAccount={() => handleOpenAccount('overview')}
            onFavorites={() => handleOpenAccount('favorites')}
            onAdmin={() => setAdminOpen(true)}
            onBilling={() => {
              setBillingNotice('');
              setBillingOpen(true);
            }}
          />
        </div>
      </header>
      {favoriteMessage ? <div className="toastNotice">{favoriteMessage}</div> : null}

      <Hero
        latestCases={heroCases}
        language={language}
        repoUrl={repoUrl}
        totalCases={siteData.totalCases}
        categoryCount={siteData.categories.length}
        onOpenCase={(item) => setPreview({ type: 'case', item })}
      />

      <section className="hotStrip">
        {hotStripCases.map((caseItem) => (
          <button
            type="button"
            aria-label={`${language === 'ko' ? '사례 열기' : 'Open case'} ${caseItem.id}: ${caseItem.title}`}
            onClick={() => setPreview({ type: 'case', item: caseItem })}
            key={caseItem.id}
          >
            <img src={caseItem.image} alt={caseItem.imageAlt} />
            <span>#{caseItem.id}</span>
          </button>
        ))}
      </section>

      <section className="gallerySection" id="gallery">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">{t.sectionEyebrow}</span>
            <h2>{t.sectionTitle}</h2>
          </div>
          <div className="searchBox">
            <Search size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.search}
            />
          </div>
        </div>

        <div className="filterPanel">
          <div>
            <strong>{t.category}</strong>
            <div className="filterRow">
              <FilterPill active={category === 'All'} onClick={() => setCategory('All')}>{t.all}</FilterPill>
              {orderedCategories.map((item) => (
                <FilterPill key={item} active={category === item} onClick={() => setCategory(item)}>
                  {localizeLabel(item, language, styleLibrary)}
                </FilterPill>
              ))}
            </div>
          </div>
          <div>
            <strong>{t.style}</strong>
            <div className="filterRow">
              <FilterPill active={style === 'All'} onClick={() => setStyle('All')}>{t.all}</FilterPill>
              {orderedStyles.map((item) => (
                <FilterPill key={item} active={style === item} onClick={() => setStyle(item)}>
                  {localizeLabel(item, language, styleLibrary)}
                </FilterPill>
              ))}
            </div>
          </div>
          <div>
            <strong>{t.scene}</strong>
            <div className="filterRow">
              <FilterPill active={scene === 'All'} onClick={() => setScene('All')}>{t.all}</FilterPill>
              {orderedScenes.map((item) => (
                <FilterPill key={item} active={scene === item} onClick={() => setScene(item)}>
                  {localizeLabel(item, language, styleLibrary)}
                </FilterPill>
              ))}
            </div>
          </div>
        </div>

        <div className="resultBar">
          <span>{`${filteredCases.length} ${t.matching}`}</span>
          <a href={repoUrl} target="_blank" rel="noreferrer">
            {t.openGithub}
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="caseGrid">
          {visibleCases.map((caseItem) => (
            <PromptCard
              caseItem={caseItem}
              copied={copiedId === `case-${caseItem.id}`}
              favorited={favoriteCaseIds.has(caseItem.id)}
              favoriteBusy={favoriteBusyId === caseItem.id}
              language={language}
              onCopy={copyPrompt}
              onOpen={(item) => setPreview({ type: 'case', item })}
              onGenerate={(item) => setPreview({ type: 'case', item })}
              onToggleFavorite={handleToggleFavorite}
              styleLibrary={styleLibrary}
              key={caseItem.id}
            />
          ))}
        </div>

        {filteredCases.length > visibleCases.length && (
          <p className="limitNote">
            {t.limit(visibleCases.length)}
          </p>
        )}
      </section>

      <TemplateSection
        language={language}
        styleLibrary={styleLibrary}
        onOpenTemplate={(item) => setPreview({ type: 'template', item })}
      />

      <SkillSection language={language} repoUrl={repoUrl} />
      <PreviewDialog
        preview={preview}
        language={language}
        styleLibrary={styleLibrary}
        copiedId={copiedId}
        session={session}
        profile={profile}
        apimartKey={apimartKey}
        apimartPrice={apimartPrice}
        apimartPriceMeta={apimartPriceMeta}
        favorite={preview?.type === 'case' ? favoriteCaseIds.has(preview.item.id) : false}
        favoriteBusy={preview?.type === 'case' && favoriteBusyId === preview.item.id}
        onClose={() => setPreview(null)}
        onCopyText={copyText}
        onToggleFavorite={handleToggleFavorite}
        onAuthRequired={openAuth}
        onBillingRequired={() => {
          setBillingNotice(t.creditsRequired);
          setBillingOpen(true);
        }}
        onApiKeySettings={() => setApiKeyOpen(true)}
        onProfileChange={handleProfileChange}
      />
      <AuthModal
        open={authOpen}
        language={language}
        initialErrorCode={authErrorCode}
        onClose={() => {
          setAuthOpen(false);
          setAuthErrorCode('');
        }}
      />
      <AccountPanel
        open={accountOpen}
        language={language}
        session={session}
        profile={profile}
        casesById={casesById}
        favoriteRows={favoriteRows}
        initialSection={accountInitialSection}
        apimartKey={apimartKey}
        apimartPrice={apimartPrice}
        onClose={handleCloseAccount}
        onProfileChange={handleProfileChange}
        onOpenCase={handleOpenCaseFromAccount}
        onApiKeySettings={() => setApiKeyOpen(true)}
        onBilling={() => {
          setAccountOpen(false);
          setBillingNotice('');
          setBillingOpen(true);
        }}
      />
      <AdminPanel
        open={adminOpen}
        language={language}
        session={session}
        casesById={casesById}
        onClose={() => setAdminOpen(false)}
        onOpenCase={handleOpenCaseFromAdmin}
      />
      <BillingPanel
        open={billingOpen}
        language={language}
        session={session}
        profile={profile}
        notice={billingNotice}
        casesById={casesById}
        onClose={() => setBillingOpen(false)}
        onAuthRequired={openAuth}
        onProfileChange={handleProfileChange}
        onOpenCase={handleOpenCaseFromAccount}
      />
      <ApiKeyModal
        open={apiKeyOpen}
        language={language}
        apiKey={apimartKey}
        price={apimartPrice}
        priceMeta={apimartPriceMeta}
        onClose={() => setApiKeyOpen(false)}
        onSaved={setApimartKey}
        onCleared={() => setApimartKey('')}
      />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
