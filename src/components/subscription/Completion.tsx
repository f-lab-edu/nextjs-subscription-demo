'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { User } from '@/types';
import { useValidatedCheckout } from '@/hooks/useCheckoutCalculation';

interface CompletionProps {
  user: User;
}

export function Completion({ user }: CompletionProps) {
  const payment = useValidatedCheckout();

  return (
    <div className='max-w-2xl mx-auto px-4 text-center'>
      <div className='mb-8'>
        <div className='w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
          <CheckCircle className='w-10 h-10 text-primary' />
        </div>
        <h2 className='text-3xl font-bold text-foreground mb-2'>구독이 완료되었습니다!</h2>
        <p className='text-muted-foreground text-lg'>
          {user.name}님, {payment.selectedPlan.name} 플랜에 성공적으로 가입하셨습니다.
        </p>
      </div>

      <Card className='bg-card mb-8'>
        <CardContent className='pt-6'>
          <div className='space-y-4'>
            <div className='text-center'>
              <h3 className='text-xl font-semibold text-card-foreground mb-2'>{payment.selectedPlan.name}</h3>
              {payment.selectedCoupon ? (
                <div>
                  <p className='text-lg text-muted-foreground line-through'>
                    ₩{payment.originalPrice.toLocaleString()}/월
                  </p>
                  <p className='text-2xl font-bold text-primary'>₩{payment.finalPrice.toLocaleString()}/월</p>
                  <p className='text-sm text-primary mt-1'>
                    {payment.selectedCoupon.coupons?.name} 적용됨 ({payment.selectedCoupon.coupons?.discount}% 할인)
                  </p>
                </div>
              ) : (
                <p className='text-2xl font-bold text-primary'>₩{payment.originalPrice.toLocaleString()}/월</p>
              )}
            </div>
            <div className='border-t border-border pt-4'>
              <h4 className='font-medium text-card-foreground mb-3'>포함된 기능:</h4>
              <ul className='space-y-2'>
                {payment.selectedPlan.features.map((feature, index) => (
                  <li key={index} className='flex items-center gap-2 text-sm text-muted-foreground'>
                    <CheckCircle className='w-4 h-4 text-primary flex-shrink-0' />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='space-y-4'>
        <div className='bg-muted/20 p-4 rounded-lg'>
          <p className='text-sm text-muted-foreground'>
            확인 이메일이 <span className='font-medium text-foreground'>{user.email}</span>로 발송되었습니다.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3'>
          <Button
            className='flex-1'
            size='lg'
            onClick={() => {
              window.location.href = '/dashboard';
            }}
          >
            대시보드로 이동
            <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
          <Button
            variant='outline'
            className='flex-1 bg-transparent'
            size='lg'
            onClick={() => {
              window.location.href = '/help';
            }}
          >
            도움말 보기
          </Button>
        </div>

        <p className='text-xs text-muted-foreground mt-6'>
          문의사항이 있으시면 언제든지{' '}
          <a href='/support' className='text-primary hover:underline'>
            고객지원
          </a>
          으로 연락해주세요.
        </p>
      </div>
    </div>
  );
}
