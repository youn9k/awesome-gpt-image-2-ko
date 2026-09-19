# GPT-Image2 유료 커뮤니티 출시 안내

현재 구현은 유료 커뮤니티를 크레딧 팩 및 멤버십 결제와 완전히 분리합니다. 알리페이에서 `¥9.90`을 한 번 결제하면 자격이 Supabase 사용자 계정에 연결됩니다. 서버가 주문을 `PAID`로 확인한 경우에만 보호된 커뮤니티 QR 코드를 읽을 수 있습니다.

## 로컬 기능

- 페이지: `/community`
- 결제 리디렉션: `/community/result`
- 결제 방식: 알리페이 웹 결제 `alipay.trade.page.pay`
- 고정 금액: `990`펀, `CNY`
- 주문 상태: `PENDING`, `PAID`, `CLOSED`, `REFUNDED`, `REVOKED`
- 환불 처리 상태: `NONE`, `PROCESSING`, `SUCCEEDED`, `FAILED`
- 자격 규칙: `PAID`만 유효합니다. 환불 처리 중에는 `PAID`를 유지하고, 알리페이가 환불 성공을 확인하면 `REFUNDED`로 바꿉니다.
- 커뮤니티 코드: 데이터베이스 `bytea` 리소스이며 PNG/JPEG/WebP만, 최대 2 MB를 허용합니다. 관리자는 트랜잭션 RPC로 원자적으로 교체합니다.

## API

공개 및 현재 사용자:

- `GET /api/community/config`
- `GET /api/community/status`
- `GET /api/community/qr`

알리페이:

- `POST /api/community/alipay/checkout`
- `GET /api/community/alipay/query`
- `POST /api/community/alipay/close`
- `POST /api/community/alipay/notify`

최고 관리자:

- `GET /api/admin/community/orders`
- `GET|POST /api/admin/community/qr`
- `POST /api/admin/community/refund`
- `GET /api/admin/community/refund-query`
- `POST /api/admin/community/revoke`

## 환경 변수

프로덕션 배포 전에는 다음 값을 유지합니다.

```dotenv
COMMUNITY_PAYMENT_ENABLED=false
COMMUNITY_ALIPAY_NOTIFY_URL=https://gpt-image2.canghe.ai/api/community/alipay/notify
COMMUNITY_SUPPORT_TEXT=위챗(WeChat)에서 창허(苍何)를 검색하세요
```

알리페이 프로덕션 변수는 기존 `ALIPAY_APP_ID`, `ALIPAY_PRIVATE_KEY`, `ALIPAY_PUBLIC_KEY`, `ALIPAY_SELLER_ID`와 프로덕션 게이트웨이 구성을 사용합니다. 프로덕션 개인 키는 Vercel Sensitive Environment Variables에만 두며, 저장소·문서·대화에 기록하지 마세요.

## 첫 배포 순서

1. `COMMUNITY_PAYMENT_ENABLED=false`를 유지합니다.
2. 대상 Supabase 프로젝트에 `supabase/migrations/20260722090000_paid_community.sql`을 적용합니다.
3. 같은 버전의 코드를 배포하고 `/community`, `/community/result`, 읽기 전용 상태 API가 정상인지 확인합니다.
4. `super_admin`이 관리 패널에서 공개된 적 없는 새 커뮤니티 QR 코드를 올립니다.
5. 알리페이 오픈 플랫폼에서 웹 결제 계약·앱 구성·게시를 완료하고, 공개 HTTPS 알림 주소에 리디렉션이 없는지 확인합니다.
6. 같은 프로덕션 앱에 속한 App ID, 앱 공개 키, 앱 개인 키, 알리페이 공개 키를 구성합니다. Node.js에는 PKCS#1 개인 키 원문을 사용합니다.
7. `COMMUNITY_PAYMENT_ENABLED=true`를 켭니다.
8. 같은 프로덕션 버전으로 실제 `¥9.90` 결제와 원래 결제 수단 환불을 한 건씩 검수합니다.

## 프로덕션 검수

실제 결제에서는 다음 항목을 모두 확인해야 합니다.

- 프런트엔드가 금액을 제출하거나 덮어쓸 수 없어야 합니다.
- 별도의 `community_orders`를 만들며 크레딧 팩 이행을 실행하지 않아야 합니다.
- 알리페이 능동 주문 조회와 비동기 알림 모두 `PAID`를 멱등적으로 기록해야 합니다.
- 동기 리디렉션은 서버의 주문 조회만 실행하며 URL 매개변수를 신뢰하지 않아야 합니다.
- 결제한 계정은 커뮤니티 코드를 읽고, 미결제 계정은 거절 응답을 받아야 합니다.
- 관리자 환불은 안정적인 환불 요청 번호를 사용하고, 처리 중에도 자격이 유지되어야 합니다.
- 환불 조회가 `REFUND_SUCCESS`를 받으면 `REFUNDED`로 기록하고 이후 커뮤니티 코드 접근이 막혀야 합니다.
- 핵심 항목이 하나라도 실패하면 즉시 `COMMUNITY_PAYMENT_ENABLED`를 `false`로 되돌립니다.

## 커뮤니티 코드 교체 및 일상 운영

- 커뮤니티 QR 코드가 만료되면 관리 패널에서 새 이미지를 올립니다. RPC는 같은 트랜잭션에서 기존 이미지를 비활성화하고 새 이미지를 활성화합니다.
- 보호된 커뮤니티 코드를 GitHub, README, 공개 객체 스토리지, 프런트엔드 정적 디렉터리에 올리지 마세요.
- 환불은 “위챗(WeChat)에서 창허(苍何)를 검색하세요” 안내를 통해 수동 검토합니다. 관리자 작업 전에는 계정, 주문 번호, 환불 상태를 확인합니다.
- 수동 자격 철회는 자동 환불을 하지 않습니다. 환불이 필요하면 철회로 대체하지 말고 환불 절차를 사용합니다.
