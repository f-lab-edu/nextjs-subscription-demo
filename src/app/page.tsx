'use client';

import { Completion } from '@/components/subscription/Completion';
import Payment from '@/components/subscription/Payment';
import PlanSelection from '@/components/subscription/PlanSelection';
import { ProgressIndicator } from '@/components/subscription/ProgressIndicator';
import { Summary } from '@/components/subscription/Summary';
import UserInfo from '@/components/subscription/UserInfo';
import { useFunnel } from '@/hooks/useFunnel';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';

export default function Home() {
  const { step } = useSubscriptionParams();

  const Funnel = useFunnel(step);

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-foreground mb-2'>구독 서비스</h1>
            <p className='text-muted-foreground'>
              {'간편하게 시작하세요. 언제든지 업그레이드하거나 취소할 수 있습니다.'}
            </p>
          </div>

          <ProgressIndicator />

          <div className='mt-8'>
            <Funnel>
              <Funnel.Step name='PlanSelection'>
                <PlanSelection />
              </Funnel.Step>
              <Funnel.Step name='UserInfo'>
                <UserInfo />
              </Funnel.Step>
              <Funnel.Step name='Payment'>
                <Payment />
              </Funnel.Step>
              <Funnel.Step name='Summary'>
                <Summary />
              </Funnel.Step>
              <Funnel.Step name='Completion'>
                <Completion />
              </Funnel.Step>
            </Funnel>
          </div>
        </div>
      </div>
    </div>
  );
}
