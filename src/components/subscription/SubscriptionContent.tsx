import { useUser } from '@/hooks/api/useUser';
import { useFunnel } from '@/hooks/useFunnel';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';
import { ProgressIndicator } from './ProgressIndicator';
import PlanSelection from './PlanSelection';
import UserInfo from './UserInfo';
import Payment from './Payment';
import { Checkout } from './Checkout';
import { Completion } from './Completion';

export default function SubscriptionContent() {
  const { step } = useSubscriptionParams();
  const { data: user } = useUser();

  const Funnel = useFunnel(step);

  return (
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
  );
}
