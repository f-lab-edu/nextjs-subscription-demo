'use client';

import { SuspenseBoundary } from '@/components/SuspenseBoundary';
import SubscriptionContent from '@/components/subscription/SubscriptionContent';

export default function Home() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className='min-h-screen bg-background'>
      <SuspenseBoundary
        onReset={handleRetry}
        fallback={
          <div className='min-h-screen bg-background flex items-center justify-center'>
            <div className='text-center'>
              <div className='w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4' />
              <div className='text-lg font-medium text-foreground'>사용자 정보를 불러오는 중...</div>
            </div>
          </div>
        }
      >
        <SubscriptionContent />
      </SuspenseBoundary>
    </div>
  );
}
