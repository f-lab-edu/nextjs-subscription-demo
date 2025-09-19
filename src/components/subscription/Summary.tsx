'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, CreditCard, Tag, Package } from 'lucide-react';

interface SummaryProps {
  onNext?: () => void;
}

export function Summary({ onNext }: SummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  // 임시 구독 데이터
  const mockSubscriptionData = {
    plan: {
      id: 'pro',
      name: '프로 플랜',
      price: 50000,
      description: '전문가를 위한 고급 기능',
      recommended: true,
    },
    user: {
      name: '김철수',
      email: 'kimcs@example.com',
      phone: '010-1234-5678',
    },
    payment: {
      selectedCard: 'card1',
      coupon: 'WELCOME20',
      discount: 20,
      newCard: false,
    },
  };

  const { plan, user, payment } = mockSubscriptionData;

  const originalPrice = plan.price;
  const discount = payment.discount;
  const discountAmount = Math.floor((originalPrice * discount) / 100);
  const finalPrice = originalPrice - discountAmount;

  const handleConfirm = async () => {
    setIsProcessing(true);

    console.log('구독 확인 및 결제 처리 중...', {
      plan: plan.name,
      user: user.name,
      finalPrice: finalPrice,
    });

    // 결제 처리 시뮬레이션 (1초 대기)
    setTimeout(() => {
      setIsProcessing(false);
      console.log('결제 완료!');
      onNext?.();
    }, 1000);
  };

  return (
    <div className='max-w-2xl mx-auto px-4'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>주문 확인</h2>
        <p className='text-muted-foreground'>주문 내용을 확인하고 구독을 완료하세요.</p>
      </div>

      <div className='space-y-6'>
        {/* 선택한 플랜 */}
        <Card className='bg-card'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-card-foreground'>
              <Package className='w-5 h-5' />
              선택한 플랜
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between'>
              <div>
                <h3 className='font-semibold text-card-foreground'>{plan.name}</h3>
                <p className='text-sm text-muted-foreground'>{plan.description}</p>
              </div>
              <div className='text-right'>
                <div className='text-lg font-bold text-card-foreground'>₩{originalPrice.toLocaleString()}/월</div>
                {plan.recommended && (
                  <Badge variant='secondary' className='mt-1'>
                    추천
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 사용자 정보 */}
        <Card className='bg-card'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-card-foreground'>
              <User className='w-5 h-5' />
              사용자 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>이름</span>
                <span className='text-card-foreground'>{user.name}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>이메일</span>
                <span className='text-card-foreground'>{user.email}</span>
              </div>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>전화번호</span>
                <span className='text-card-foreground'>{user.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 결제 정보 */}
        <Card className='bg-card'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-card-foreground'>
              <CreditCard className='w-5 h-5' />
              결제 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <span className='text-muted-foreground'>결제 방법</span>
                <span className='text-card-foreground'>{payment.newCard ? '새 카드' : 'Visa •••• 1234'}</span>
              </div>
              {payment.coupon && (
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>적용된 쿠폰</span>
                  <Badge variant='secondary' className='bg-primary/10 text-primary'>
                    {payment.discount}% 할인
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 결제 내역 */}
        <Card className='bg-card border-2 border-primary/20'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-card-foreground'>
              <Tag className='w-5 h-5' />
              결제 내역
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <div className='flex justify-between text-card-foreground'>
                <span>{plan.name}</span>
                <span>₩{originalPrice.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className='flex justify-between text-primary'>
                  <span>할인 ({discount}%)</span>
                  <span>-₩{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className='border-t border-border pt-2'>
                <div className='flex justify-between text-xl font-bold text-card-foreground'>
                  <span>총 결제 금액</span>
                  <span>₩{finalPrice.toLocaleString()}</span>
                </div>
                <p className='text-sm text-muted-foreground mt-1'>매월 자동 결제됩니다</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 약관 동의 안내 */}
        <div className='bg-muted/20 p-4 rounded-lg'>
          <p className='text-sm text-muted-foreground text-center'>
            구독을 확인하면{' '}
            <a href='#' className='text-primary hover:underline'>
              이용약관
            </a>
            {' 및 '}
            <a href='#' className='text-primary hover:underline'>
              개인정보처리방침
            </a>
            에 동의하는 것으로 간주됩니다.
          </p>
        </div>

        {/* 확인 버튼 */}
        <Button onClick={handleConfirm} className='w-full' size='lg' disabled={isProcessing}>
          {isProcessing ? '결제 처리 중...' : '구독 확인 및 결제'}
        </Button>
      </div>
    </div>
  );
}
