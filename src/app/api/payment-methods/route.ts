import { getDevUserId } from '@/utils/dev-auth';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface CreateCardRequest {
  userId: string;
  cardNumber: string;
  cardOwner: string;
  expiry: string;
  brand: string;
  isDefault?: boolean;
}

export async function GET() {
  try {
    const supabase = await createClient();
    const userId = getDevUserId();

    const { data, error } = await supabase.from('cards').select('*').eq('user_id', userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const userId = getDevUserId();
    const body: CreateCardRequest = await request.json();

    const last4 = body.cardNumber.slice(-4);

    const { count } = await supabase.from('cards').select('*', { count: 'exact', head: true }).eq('user_id', userId);

    const nextIndex = (count || 0) + 1;
    const pgToken = `pg_token_${nextIndex}`;

    const newCard = {
      user_id: userId,
      last4: last4,
      card_owner: body.cardOwner,
      expiry: body.expiry,
      brand: body.brand,
      is_default: body.isDefault || false,
      pg_token: pgToken,
    };

    const { data, error } = await supabase.from('cards').insert(newCard).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
