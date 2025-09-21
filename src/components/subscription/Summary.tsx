'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, CreditCard, Tag, Package } from 'lucide-react';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';
import { plans } from '@/data/card-data';

const existingCards = [
  { id: 'card1', last4: '1234', brand: 'Visa', expiry: '12/25' },
  { id: 'card2', last4: '5678', brand: 'MasterCard', expiry: '08/26' },
];

const availableCoupons = [
  { id: 'WELCOME20', name: '신규 가입 20% 할인', discount: 20 },
  { id: 'STUDENT10', name: '학생 할인 10%', discount: 10 },
  { id: 'FRIEND15', name: '친구 추천 15% 할인', discount: 15 },
];

const user = {
  name: '김철수',
  email: 'kimcs@example.com',
  phone: '010-1234-5678',
};

export function Summary() {
  const { planid, cardid, couponid, goToStep } = useSubscriptionParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPlan = plans.find((plan) => plan.id === planid);
  const selectedCard = existingCards.find((card) => card.id === cardid);
  const selectedCoupon = availableCoupons.find((coupon) => coupon.id === couponid);

  const originalPrice = selectedPlan?.price || 0;
  const discount = selectedCoupon?.discount || 0;
  const discountAmount = Math.floor((originalPrice * discount) / 100);
  const finalPrice = originalPrice - discountAmount;

  const handleConfirm = async () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      goToStep('Completion');
    }, 2000);
  };

  if (!selectedPlan) {
    return (
      <div className='max-w-2xl mx-auto px-4 text-center'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>플랜을 선택해주세요</h2>
        <Button onClick={() => goToStep('PlanSelection')}>플랜 선택하러 가기</Button>
      </div>
    );
  }

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
                <h3 className='font-semibold text-card-foreground'>{selectedPlan.name}</h3>
                <p className='text-sm text-muted-foreground'>{selectedPlan.description}</p>
              </div>
              <div className='text-right'>
                <div className='text-lg font-bold text-card-foreground'>₩{originalPrice.toLocaleString()}/월</div>
                {selectedPlan.isPopular && (
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
                <span className='text-card-foreground'>
                  {selectedCard ? `${selectedCard.brand} •••• ${selectedCard.last4}` : '결제 방법 미선택'}
                </span>
              </div>
              {selectedCoupon && (
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>적용된 쿠폰</span>
                  <div className='text-right'>
                    <Badge variant='secondary' className='bg-primary/10 text-primary'>
                      {selectedCoupon.discount}% 할인
                    </Badge>
                    <p className='text-xs text-muted-foreground mt-1'>{selectedCoupon.name}</p>
                  </div>
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
                <span>{selectedPlan.name}</span>
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

        {/* 버튼들 */}
        <div className='flex gap-4'>
          <Button variant='outline' onClick={() => goToStep('Payment')} className='flex-1' disabled={isProcessing}>
            이전 단계
          </Button>
          <Button onClick={handleConfirm} className='flex-1' size='lg' disabled={isProcessing}>
            {isProcessing ? '결제 처리 중...' : '구독 확인 및 결제'}
          </Button>
        </div>
      </div>
    </div>
  );
}
