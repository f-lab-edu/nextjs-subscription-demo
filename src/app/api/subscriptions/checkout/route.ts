import { getDevUserId } from '@/utils/dev-auth';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface UserSubscriptionInfo {
  subscriptionId: string;
  cardId: string;
  couponId?: string;
  originalPrice: number;
  discountedPrice: number;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const userId = getDevUserId();
    const body: UserSubscriptionInfo = await request.json();

    const startDate = new Date().toISOString();
    const nextBillingDate = new Date();
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

    const newSubscription = {
      user_id: userId,
      subscription_id: body.subscriptionId,
      card_id: body.cardId,
      coupon_id: body.couponId || null,
      status: 'active' as const,
      start_date: startDate,
      end_date: null,
      next_billing_date: nextBillingDate.toISOString(),
      original_price: body.originalPrice,
      discounted_price: body.discountedPrice,
      created_at: startDate,
      updated_at: startDate,
    };
    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert(newSubscription)
      .select(
        `
        *,
        subscriptions(name, description, price),
        cards(last4, brand, card_owner),
        coupons(code, discount_type, discount_value)
      `,
      )
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
