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

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
