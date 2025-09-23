'use client';

import { Completion } from '@/components/subscription/Completion';
import Payment from '@/components/subscription/Payment';
import PlanSelection from '@/components/subscription/PlanSelection';
import { ProgressIndicator } from '@/components/subscription/ProgressIndicator';
import { Checkout } from '@/components/subscription/Checkout';
import UserInfo from '@/components/subscription/UserInfo';
import { useUser } from '@/hooks/api/useUser';
import { useFunnel } from '@/hooks/useFunnel';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';

export default function Home() {
  const { step } = useSubscriptionParams();
  const { data: user } = useUser();

  const Funnel = useFunnel(step);

  //TODO: 다음 PR에서 Suspense로 구현 예정
  if (user === null || user === undefined) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-lg font-medium'>사용자 정보를 찾을 수 없습니다</div>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-primary text-primary-foreground rounded'
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-foreground mb-2'>구독 서비스</h1>
            <p className='text-muted-foreground'>
              {user.name}님, 간편하게 시작하세요. 언제든지 업그레이드하거나 취소할 수 있습니다.
            </p>
          </div>

          <ProgressIndicator />

          <div className='mt-8'>
            <Funnel>
              <Funnel.Step name='PlanSelection'>
                <PlanSelection />
              </Funnel.Step>
              <Funnel.Step name='UserInfo'>
                <UserInfo user={user} />
              </Funnel.Step>
              <Funnel.Step name='Payment'>
                <Payment />
              </Funnel.Step>
              <Funnel.Step name='Summary'>
                <Checkout user={user} />
              </Funnel.Step>
              <Funnel.Step name='Completion'>
                <Completion user={user} />
              </Funnel.Step>
            </Funnel>
          </div>
        </div>
      </div>
    </div>
  );
}
