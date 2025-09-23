'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { User, CreditCard, Tag, Package } from 'lucide-react';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';
import { User as UserType } from '@/types';
import { useCheckoutCalculation } from '@/hooks/useCheckoutCalculation';
import { useCheckout } from '@/hooks/api/useCheckout';

interface CheckoutProps {
  user: UserType;
}

export function Checkout({ user }: CheckoutProps) {
  const { goToStep } = useSubscriptionParams();
  const payment = useCheckoutCalculation();
  const checkoutMutation = useCheckout();

  const handleConfirm = async () => {
    if (!payment.selectedPlan) {
      throw new Error('플랜이 선택되지 않았습니다. 플랜을 선택해주세요.');
    }

    if (!payment.selectedCardId) {
      throw new Error('결제 방법이 선택되지 않았습니다. 결제 정보를 입력해주세요.');
    }

    await checkoutMutation.mutateAsync({
      subscriptionId: payment.selectedPlan.id,
      cardId: payment.selectedCardId,
      couponId: payment.selectedCoupon?.coupon_id,
      originalPrice: payment.originalPrice,
      discountedPrice: payment.finalPrice,
    });

    goToStep('Completion');
  };

  return (
    <div className='max-w-2xl mx-auto px-4'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>주문 확인</h2>
        <p className='text-muted-foreground'>주문 내용을 확인하고 구독을 완료하세요.</p>
      </div>

      <div className='space-y-6'>
        {payment.selectedPlan && (
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
                  <h3 className='font-semibold text-card-foreground'>{payment.selectedPlan.name}</h3>
                  <p className='text-sm text-muted-foreground'>{payment.selectedPlan.description}</p>
                </div>
                <div className='text-right'>
                  <div className='text-lg font-bold text-card-foreground'>
                    ₩{payment.originalPrice.toLocaleString()}/월
                  </div>
                  {payment.selectedPlan.isPopular && (
                    <Badge variant='secondary' className='mt-1'>
                      추천
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                <span className='text-card-foreground'>선택된 카드 {/* TODO: 실제 카드 정보 표시 */}</span>
              </div>
              {payment.selectedCoupon && (
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>적용된 쿠폰</span>
                  <div className='text-right'>
                    <Badge variant='secondary' className='bg-primary/10 text-primary'>
                      {payment.selectedCoupon.coupons?.discount}% 할인
                    </Badge>
                    <p className='text-xs text-muted-foreground mt-1'>{payment.selectedCoupon.coupons?.name}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

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
                <span>{payment.selectedPlan?.name}</span>
                <span>₩{payment.originalPrice.toLocaleString()}</span>
              </div>
              {payment.discountAmount > 0 && (
                <div className='flex justify-between text-primary'>
                  <span>할인 ({payment.selectedCoupon?.coupons?.discount}%)</span>
                  <span>-₩{payment.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className='border-t border-border pt-2'>
                <div className='flex justify-between text-xl font-bold text-card-foreground'>
                  <span>총 결제 금액</span>
                  <span>₩{payment.finalPrice.toLocaleString()}</span>
                </div>
                <p className='text-sm text-muted-foreground mt-1'>매월 자동 결제됩니다</p>
              </div>
            </div>
          </CardContent>
        </Card>

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

        <div className='flex gap-4'>
          <Button
            variant='outline'
            onClick={() => goToStep('Payment')}
            className='flex-1'
            disabled={checkoutMutation.isPending}
          >
            이전 단계
          </Button>
          <Button onClick={handleConfirm} className='flex-1' size='lg' disabled={checkoutMutation.isPending}>
            {checkoutMutation.isPending ? '결제 처리 중...' : '구독 확인 및 결제'}
          </Button>
        </div>
      </div>
    </div>
  );
}
