'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { CreditCard, Plus, Tag, X } from 'lucide-react';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';
import { usePaymentMethods } from '@/hooks/api/usePaymentMethods';
import { useCoupons } from '@/hooks/api/useCoupons';
import { useAddPaymentMethods } from '@/hooks/api/useAddPaymentMethods';
import { useCheckoutCalculation } from '@/hooks/useCheckoutCalculation';

export default function Payment() {
  const { goToStep, updateParam } = useSubscriptionParams();

  const { data: cards, isLoading: cardsLoading } = usePaymentMethods();
  const { data: coupons = [], isLoading: couponsLoading } = useCoupons();
  const addPaymentMethodMutation = useAddPaymentMethods();

  const payment = useCheckoutCalculation();

  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  if (cardsLoading || couponsLoading) {
    return (
      <div className='max-w-2xl mx-auto px-4 text-center'>
        <div className='text-lg font-medium'>결제 정보를 불러오는 중...</div>
      </div>
    );
  }

  if (cards === undefined) {
    return <div>카드가 없습니다</div>;
  }

  const handleAddNewCard = async () => {
    try {
      const result = await addPaymentMethodMutation.mutateAsync({
        cardNumber: newCard.number,
        cardOwner: newCard.name,
        expiry: newCard.expiry,
        brand: 'New Card',
        isDefault: false,
      });

      setNewCard({ number: '', expiry: '', cvv: '', name: '' });
      setIsCardModalOpen(false);

      if (result.data) {
        updateParam('cardId', result.data.id);
      }
    } catch (error) {
      console.error('카드 추가 실패:', error);
    }
  };

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
            <RadioGroup value={payment.selectedCardId} onValueChange={(value) => updateParam('cardId', value)}>
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

            {/* 새 카드 등록 다이얼로그 */}
            <Dialog open={isCardModalOpen} onOpenChange={setIsCardModalOpen}>
              <DialogTrigger asChild>
                <Button
                  type='button'
                  variant='outline'
                  className='w-full border-dashed border-2 hover:border-primary bg-transparent'
                >
                  <Plus className='w-4 h-4 mr-2' />새 카드 등록
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                  <DialogTitle className='flex items-center gap-2'>
                    <CreditCard className='w-5 h-5' />새 카드 등록
                  </DialogTitle>
                </DialogHeader>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='cardNumber'>카드 번호</Label>
                    <Input
                      id='cardNumber'
                      placeholder='1234 5678 9012 3456'
                      value={newCard.number}
                      onChange={(e) => setNewCard((prev) => ({ ...prev, number: e.target.value }))}
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='cardName'>카드 소유자명</Label>
                    <Input
                      id='cardName'
                      placeholder='홍길동'
                      value={newCard.name}
                      onChange={(e) => setNewCard((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='expiry'>만료일</Label>
                      <Input
                        id='expiry'
                        placeholder='MM/YY'
                        value={newCard.expiry}
                        onChange={(e) => setNewCard((prev) => ({ ...prev, expiry: e.target.value }))}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='cvv'>CVV</Label>
                      <Input
                        id='cvv'
                        placeholder='123'
                        value={newCard.cvv}
                        onChange={(e) => setNewCard((prev) => ({ ...prev, cvv: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className='flex gap-2 pt-4'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setIsCardModalOpen(false)}
                      className='flex-1'
                    >
                      취소
                    </Button>
                    <Button
                      type='button'
                      onClick={handleAddNewCard}
                      className='flex-1'
                      disabled={addPaymentMethodMutation.isPending}
                    >
                      {addPaymentMethodMutation.isPending ? '등록 중...' : '등록'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
              value={payment.selectedCoupon?.coupon_id || ''}
              onValueChange={(value) => updateParam('couponId', value)}
            >
              <div className='flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors'>
                <RadioGroupItem value='' id='no-coupon' />
                <Label htmlFor='no-coupon' className='cursor-pointer text-card-foreground flex-grow'>
                  쿠폰 사용 안함
                </Label>
              </div>
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className='flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors'
                >
                  <RadioGroupItem value={coupon.coupon_id} id={coupon.coupon_id} />
                  <Label
                    htmlFor={coupon.coupon_id}
                    className='flex items-center gap-3 cursor-pointer text-card-foreground flex-grow'
                  >
                    <Badge variant='secondary' className='bg-primary/10 text-primary border-primary/20'>
                      {coupon.coupons?.discount || 0}% 할인
                    </Badge>
                    <div>
                      <div className='font-medium'>{coupon.coupons?.name}</div>
                      <div className='text-sm text-muted-foreground'>
                        ₩{Math.floor((payment.originalPrice * (coupon.coupons?.discount || 0)) / 100).toLocaleString()}
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
                    <p className='font-medium text-primary'>{payment.selectedCoupon.coupons?.name} 적용됨</p>
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
                  <span className='font-medium'>할인 ({payment.selectedCoupon.coupons?.discount || 0}%)</span>{' '}
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

        <Button
          type='submit'
          className='w-full'
          size='lg'
          onClick={() => goToStep('Summary')}
          disabled={!payment.selectedCardId}
        >
          다음 단계
        </Button>
      </div>
    </div>
  );
}
