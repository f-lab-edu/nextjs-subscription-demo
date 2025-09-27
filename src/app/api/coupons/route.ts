import { getDevUserId } from '@/utils/dev-auth';
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const userId = getDevUserId();

    const { data, error } = await supabase
      .from('user_coupons')
      .select(
        `
        *,
        coupons(*)
      `,
      )
      .eq('user_id', userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const transformedData = data.map((item) => ({
      id: item.id,
      userId: item.user_id,
      couponId: item.coupon_id,
      isUsed: item.is_used,
      usedAt: item.used_at,
      obtainedAt: item.obtained_at,
      coupons: item.coupons
        ? {
            id: item.coupons.id,
            name: item.coupons.name,
            discount: item.coupons.discount,
            isActive: item.coupons.is_active,
            createdAt: item.coupons.created_at,
            expirationDate: item.coupons.expiration_date,
          }
        : null,
    }));

    return NextResponse.json({ data: transformedData });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
