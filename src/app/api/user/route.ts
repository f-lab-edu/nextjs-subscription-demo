import { getDevUserId } from '@/utils/dev-auth';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone: string;
}

export async function GET(): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const userId = getDevUserId();

    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: UpdateUserRequest = await request.json();
    const userId = getDevUserId();

    const { data, error } = await supabase.from('users').update(body).eq('id', userId).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
