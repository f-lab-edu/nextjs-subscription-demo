import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';
import { Check } from 'lucide-react';

type Step = {
  id: number;
  name: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  { id: 1, name: 'PlanSelection', title: '플랜 선택', description: '요금제를 선택하세요' },
  { id: 2, name: 'UserInfo', title: '사용자 정보', description: '정보를 입력하세요' },
  { id: 3, name: 'Payment', title: '결제 정보', description: '결제 방법을 선택하세요' },
  { id: 4, name: 'Summary', title: '주문 확인', description: '주문 내용을 확인하세요' },
  { id: 5, name: 'Completion', title: '완료', description: '구독이 완료되었습니다' },
];

export function ProgressIndicator() {
  const { step } = useSubscriptionParams();

  const currentStepId = steps.find((s) => s.name === step)?.id || 1;

  return (
    <div className='flex items-center justify-between mb-8'>
      {steps.map((stepItem, index) => (
        <div key={stepItem.id} className='flex items-center'>
          <div className='flex flex-col items-center'>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                stepItem.id < currentStepId
                  ? 'bg-primary border-primary text-primary-foreground'
                  : stepItem.id === currentStepId
                    ? 'border-primary text-primary bg-background'
                    : 'border-muted text-muted-foreground bg-background'
              }`}
            >
              {stepItem.id < currentStepId ? (
                <Check className='w-5 h-5' />
              ) : (
                <span className='text-sm font-medium'>{stepItem.id}</span>
              )}
            </div>
            <div className='mt-2 text-center'>
              <div
                className={`text-sm font-medium ${
                  stepItem.id <= currentStepId ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {stepItem.title}
              </div>
              <div className='text-xs text-muted-foreground hidden sm:block'>{stepItem.description}</div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-4 transition-colors ${
                stepItem.id < currentStepId ? 'bg-primary' : 'bg-border'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
