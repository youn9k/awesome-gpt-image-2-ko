# 알리페이 웹 결제

이 프로젝트는 Stripe를 유지하면서 일회성 크레딧 팩에 알리페이 웹 결제를 추가합니다. 멤버십 구독은 계속 Stripe에서 처리하여, 알리페이의 일회성 결제를 자동 갱신으로 오인하지 않도록 합니다.

## API

| 경로 | 용도 | 권한 |
| --- | --- | --- |
| `POST /api/billing/alipay/checkout` | 주문을 만들고 알리페이 POST 양식을 반환 | 로그인한 사용자 |
| `GET /api/billing/alipay/query` | 거래를 능동 조회하고 멱등적으로 크레딧 지급 | 주문 소유 사용자 |
| `POST /api/billing/alipay/notify` | 서명을 검증하고 주문을 확인해 비동기 알림 처리 | 알리페이 서버 |
| `POST /api/billing/alipay/refund` | 전액 환불을 시작하고 해당 크레딧을 선차감 | 최고 관리자 |
| `GET /api/billing/alipay/refund-query` | 환불 결과 조회 | 최고 관리자 |
| `POST /api/billing/alipay/close` | 미결제 주문 닫기 | 최고 관리자 |

결제 결과는 서명이 검증된 비동기 알림 또는 `alipay.trade.query`의 능동 조회만 수용합니다. 브라우저의 동기 리디렉션은 결과 페이지를 열기 위한 용도이며, 결제 성공을 직접 판정하지 않습니다.

## 데이터베이스 및 위안화 가격

먼저 `supabase/migrations/20260721090000_alipay_webpay.sql` 마이그레이션을 적용하세요. 결제 채널, 알리페이 거래 번호, 환불 상태, 원자적 크레딧 적립·환불 함수를 추가합니다.

알리페이 구매를 열 크레딧 팩은 각각 `credit_packs.alipay_amount_cents`에 비즈니스 검증을 거친 위안화 금액을 넣어야 합니다. 별도 위안화 가격이 없는 팩에는 사용할 수 있는 알리페이 버튼을 표시하지 않습니다. 기존 USD 가격을 1:1 위안화 가격으로 취급하지도 않습니다.

## 로컬 샌드박스

로컬 코드는 프로젝트 루트의 `.alipay-sandbox.json`을 직접 읽습니다. 이 파일은 알리페이 AI 결제 Skill이 만들고 검증한 파일입니다.

- Node.js는 `appIds[0].appPrivatePkcsKey`(PKCS#1)를 사용합니다.
- 게이트웨이는 `https://openapi-sandbox.dl.alipaydev.com/gateway.do`로 고정합니다.
- 구성 파일은 Git에서 무시하며 현재 사용자만 읽고 쓸 수 있어야 합니다.
- 로컬에 공개 HTTPS 주소가 없으면 `notify_url`을 보내지 않습니다. 결제 결과는 거래 조회로 확인하며, 알림 처리 코드는 그대로 둡니다.

## 프로덕션 구성

프로덕션 환경은 서버 측 환경 변수로 설정합니다.

- `ALIPAY_APP_ID`
- `ALIPAY_PRIVATE_KEY`
- `ALIPAY_PUBLIC_KEY`
- `ALIPAY_SELLER_ID`
- `ALIPAY_GATEWAY`
- `ALIPAY_NOTIFY_URL`
- `ALIPAY_NOTIFY_ENABLED`

`ALIPAY_APP_ID`, 앱 공개 키, 앱 개인 키는 동일한 프로덕션 앱 키 세트에 속해야 합니다. Node.js에는 PEM 머리말과 꼬리말을 붙이지 않은 PKCS#1 원문 개인 키 문자열을 사용하고, 키를 로그·프런트엔드·저장소에 저장하지 마세요.

실제 운영에서는 공개 HTTPS `notify_url`을 사용하고, 알림 서명 검증·멱등 처리·`app_id`·`seller_id`·주문 번호·금액 검증을 완료해야 합니다. 능동 조회는 보완 경로로 유지합니다.
