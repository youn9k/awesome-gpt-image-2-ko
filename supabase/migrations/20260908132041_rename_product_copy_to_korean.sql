-- Rename the display-language columns in place so existing product rows,
-- references, constraints, and RLS policies remain intact.
alter table public.membership_plans
  rename column name_zh to name_ko;

alter table public.membership_plans
  rename column description_zh to description_ko;

alter table public.credit_packs
  rename column name_zh to name_ko;

alter table public.credit_packs
  rename column description_zh to description_ko;

-- Backfill the current catalog after the column rename. Inactive legacy packs
-- are included so an administrator never sees Chinese copy when reactivating
-- one later.
update public.membership_plans
   set name_ko = case id
         when 'starter' then '입문 멤버십'
         when 'creator' then '크리에이터 멤버십'
         when 'studio' then '스튜디오 멤버십'
         else name_ko
       end,
       description_ko = case id
         when 'starter' then '매월 700 크레딧으로 가벼운 프롬프트 테스트와 일상 이미지 실험에 적합합니다.'
         when 'creator' then '매월 1,800 크레딧으로 사례 재활용, 콘텐츠 제작, 프롬프트 테스트를 자주 하는 데 적합합니다.'
         when 'studio' then '매월 5,200 크레딧으로 고빈도 GPT-Image2 워크플로와 소규모 팀에 적합합니다.'
         else description_ko
       end
 where id in ('starter', 'creator', 'studio');

update public.credit_packs
   set name_ko = case id
         when 'pack_30' then '30 크레딧 팩'
         when 'pack_120' then '120 크레딧 팩'
         when 'pack_360' then '360 크레딧 팩'
         when 'pack_300' then '300 크레딧 팩'
         when 'pack_1000' then '1,000 크레딧 팩'
         when 'pack_3000' then '3,000 크레딧 팩'
         else name_ko
       end,
       description_ko = case id
         when 'pack_30' then '더 많은 사례를 계속 시도하기에 적합합니다.'
         when 'pack_120' then '정기적인 프롬프트 테스트에 적합합니다.'
         when 'pack_360' then '대량 콘텐츠 제작과 소규모 팀에 적합합니다.'
         when 'pack_300' then '더 많은 GPT-Image2 사례를 테스트하기 위한 입문 팩입니다.'
         when 'pack_1000' then '정기적인 프롬프트 테스트와 시각적 반복을 위한 크리에이터 팩입니다.'
         when 'pack_3000' then '대량 콘텐츠 제작과 소규모 팀을 위한 고빈도 팩입니다.'
         else description_ko
       end
 where id in ('pack_30', 'pack_120', 'pack_360', 'pack_300', 'pack_1000', 'pack_3000');

-- Preserve existing orders and refund records. Only the default and the
-- function used for subsequently created community orders are localized.
alter table public.community_orders
  alter column subject set default 'GPT-Image2 유료 커뮤니티 평생 이용권';

create or replace function public.create_or_reuse_community_order(
  p_user_id uuid,
  p_terms_version text
)
returns public.community_orders
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.community_orders%rowtype;
begin
  if p_user_id is null then
    raise exception 'COMMUNITY_USER_REQUIRED' using errcode = 'P0001';
  end if;
  if p_terms_version is null or btrim(p_terms_version) = '' then
    raise exception 'COMMUNITY_TERMS_REQUIRED' using errcode = 'P0001';
  end if;

  perform pg_advisory_xact_lock(hashtext(p_user_id::text));

  select co.*
    into v_order
    from public.community_orders as co
   where co.user_id = p_user_id
     and co.status in ('PENDING', 'PAID')
   order by co.created_at desc
   limit 1
   for update;

  if found then
    return v_order;
  end if;

  insert into public.community_orders (
    user_id,
    status,
    amount_cents,
    currency,
    subject,
    terms_version
  )
  values (
    p_user_id,
    'PENDING',
    990,
    'CNY',
    'GPT-Image2 유료 커뮤니티 평생 이용권',
    p_terms_version
  )
  returning * into v_order;

  return v_order;
end;
$$;
