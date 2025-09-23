import { CheckoutRequest, UserSubscriptionInfo } from '@/types';
import { getDevUserId } from '@/utils/dev-auth';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const userId = getDevUserId();
    const body: CheckoutRequest = await request.json();

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
      next_billing_date: nextBillingDate.toISOString(),
      original_price: body.originalPrice,
      discounted_price: body.discountedPrice,
      created_at: startDate,
      updated_at: startDate,
    };
    const { data, error } = await supabase.from('user_subscriptions').insert(newSubscription).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const responseData: UserSubscriptionInfo = {
      id: data.id,
      userId: data.user_id,
      subscriptionId: data.subscription_id,
      cardId: data.card_id,
      couponId: data.coupon_id,
      status: data.status,
      startDate: data.start_date,
      nextBillingDate: data.next_billing_date,
      originalPrice: data.original_price,
      discountedPrice: data.discounted_price,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };

    return NextResponse.json({ data: responseData }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
