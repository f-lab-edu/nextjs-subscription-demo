'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Badge } from '@/components/ui/Badge';
import { CreditCard, Tag, X } from 'lucide-react';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';
import { usePaymentMethods } from '@/hooks/api/usePaymentMethods';
import { useCoupons } from '@/hooks/api/useCoupons';
import { useValidatedCheckout } from '@/hooks/useCheckoutCalculation';
import { AddCardModal } from './AddCardModal';
import { useValidatedCardSelection } from '@/hooks/useValidatedCardSelection';

export default function Payment() {
  const { goToStep, updateParam } = useSubscriptionParams();
  const { data: cards } = usePaymentMethods();
  const { data: userCoupons = [] } = useCoupons();

  const selectedCard = useValidatedCardSelection();

  const payment = useValidatedCheckout();

  return (
    <div className='max-w-2xl mx-auto px-4'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>결제 정보</h2>
        <p className='text-muted-foreground'>결제 방법을 선택하고 쿠폰을 적용하세요.</p>
      </div>

      <div className='space-y-6'>
        {/* 결제 방법 선택 */}
        <Card className='bg-card border-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-card-foreground'>
              <CreditCard className='w-5 h-5' />
              결제 방법
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <RadioGroup value={selectedCard} onValueChange={(value) => updateParam('cardId', value)}>
              {cards.map((card) => (
                <div
                  key={card.id}
                  className='flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors'
                >
                  <RadioGroupItem value={card.id} id={card.id} />
                  <Label
                    htmlFor={card.id}
                    className='flex items-center gap-3 cursor-pointer text-card-foreground flex-grow'
                  >
                    <div className='p-2 bg-primary/10 rounded-md'>
                      <CreditCard className='w-4 h-4 text-primary' />
                    </div>
                    <div>
                      <div className='font-medium'>
                        {card.brand} •••• {card.last4}
                      </div>
                      <div className='text-sm text-muted-foreground'>만료일: {card.expiry}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <AddCardModal />
          </CardContent>
        </Card>

        {/* 쿠폰 선택 */}
        <Card className='bg-card border-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-card-foreground'>
              <Tag className='w-5 h-5' />
              사용 가능한 쿠폰
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <RadioGroup
              value={payment.selectedCoupon?.couponId || ''}
              onValueChange={(value) => updateParam('couponId', value)}
            >
              <div className='flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors'>
                <RadioGroupItem value='' id='no-coupon' />
                <Label htmlFor='no-coupon' className='cursor-pointer text-card-foreground flex-grow'>
                  쿠폰 사용 안함
                </Label>
              </div>
              {userCoupons?.map((userCoupon) => (
                <div
                  key={userCoupon.id}
                  className='flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors'
                >
                  <RadioGroupItem value={userCoupon.couponId} id={userCoupon.couponId} />
                  <Label
                    htmlFor={userCoupon.couponId}
                    className='flex items-center gap-3 cursor-pointer text-card-foreground flex-grow'
                  >
                    <Badge variant='secondary' className='bg-primary/10 text-primary border-primary/20'>
                      {userCoupon.coupons?.discount || 0}% 할인
                    </Badge>
                    <div>
                      <div className='font-medium'>{userCoupon.coupons?.name}</div>
                      <div className='text-sm text-muted-foreground'>
                        ₩
                        {Math.floor(
                          (payment.originalPrice * (userCoupon.coupons?.discount || 0)) / 100,
                        ).toLocaleString()}
                        절약
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {/* 선택된 쿠폰 표시 */}
            {payment.selectedCoupon && (
              <div className='p-4 bg-primary/10 rounded-lg border border-primary/20'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-primary'>{payment.selectedCoupon.coupons.name} 적용됨</p>
                    <p className='text-sm text-primary/80'>₩{payment.discountAmount.toLocaleString()} 할인</p>
                  </div>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => updateParam('couponId', '')}
                    className='text-primary hover:text-primary/80'
                  >
                    <X className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 결제 요약 */}
        <Card className='bg-card border-2 border-primary/20'>
          <CardContent className='pt-6'>
            <div className='space-y-3'>
              <div className='flex justify-between items-center text-card-foreground'>
                <span className='font-medium'>{payment.selectedPlan?.name}</span>
                <span className='font-medium'>₩{payment.originalPrice.toLocaleString()}</span>
              </div>
              {payment.selectedCoupon && (
                <div className='flex justify-between items-center text-primary'>
                  <span className='font-medium'>할인 ({payment.selectedCoupon?.coupons.discount || 0}%)</span>{' '}
                  <span className='font-medium'>-₩{payment.discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className='border-t border-border pt-3'>
                <div className='flex justify-between items-center text-lg font-bold text-card-foreground'>
                  <span>총 결제 금액</span>
                  <span className='text-xl'>₩{payment.finalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type='submit' className='w-full' size='lg' onClick={() => goToStep('Summary')} disabled={!selectedCard}>
          다음 단계
        </Button>
      </div>
    </div>
  );
}
