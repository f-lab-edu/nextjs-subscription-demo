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

// 임시 데이터
const existingCards = [
  { id: 'card1', last4: '1234', brand: 'Visa', expiry: '12/25' },
  { id: 'card2', last4: '5678', brand: 'MasterCard', expiry: '08/26' },
];

const availableCoupons = [
  { id: 'WELCOME20', name: '신규 가입 20% 할인', discount: 20 },
  { id: 'STUDENT10', name: '학생 할인 10%', discount: 10 },
  { id: 'FRIEND15', name: '친구 추천 15% 할인', discount: 15 },
];

// 임시 플랜 데이터
const mockPlan = {
  id: 'pro',
  name: '프로 플랜',
  price: 50000,
  description: '전문가를 위한 고급 기능',
};

interface PaymentProps {
  onNext?: () => void;
}

export default function Payment({ onNext }: PaymentProps) {
  const [selectedCard, setSelectedCard] = useState('card1');
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [cards, setCards] = useState(existingCards);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const selectedCouponData = availableCoupons.find((c) => c.id === selectedCoupon);
  const discount = selectedCouponData?.discount || 0;
  const originalPrice = mockPlan.price;
  const discountAmount = Math.floor((originalPrice * discount) / 100);
  const finalPrice = originalPrice - discountAmount;

  const handleAddNewCard = () => {
    const newCardData = {
      id: `card${Date.now()}`,
      last4: newCard.number.slice(-4),
      brand: 'New Card',
      expiry: newCard.expiry,
    };

    setCards((prev) => [...prev, newCardData]);
    setNewCard({ number: '', expiry: '', cvv: '', name: '' });
    setIsCardModalOpen(false);
    setSelectedCard(newCardData.id);

    console.log('새 카드 추가됨:', newCardData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const paymentData = {
      selectedCard: selectedCard,
      coupon: selectedCoupon,
      discount: discount,
      finalPrice: finalPrice,
    };

    console.log('결제 정보:', paymentData);

    // TODO: API 호출하여 결제 처리
    onNext?.();
  };

  return (
    <div className='max-w-2xl mx-auto px-4'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>결제 정보</h2>
        <p className='text-muted-foreground'>결제 방법을 선택하고 쿠폰을 적용하세요.</p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* 결제 방법 선택 */}
        <Card className='bg-card border-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-card-foreground'>
              <CreditCard className='w-5 h-5' />
              결제 방법
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <RadioGroup value={selectedCard} onValueChange={setSelectedCard}>
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
                    <Button type='button' onClick={handleAddNewCard} className='flex-1'>
                      등록
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
            <RadioGroup value={selectedCoupon} onValueChange={setSelectedCoupon}>
              <div className='flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors'>
                <RadioGroupItem value='' id='no-coupon' />
                <Label htmlFor='no-coupon' className='cursor-pointer text-card-foreground flex-grow'>
                  쿠폰 사용 안함
                </Label>
              </div>
              {availableCoupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className='flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors'
                >
                  <RadioGroupItem value={coupon.id} id={coupon.id} />
                  <Label
                    htmlFor={coupon.id}
                    className='flex items-center gap-3 cursor-pointer text-card-foreground flex-grow'
                  >
                    <Badge variant='secondary' className='bg-primary/10 text-primary border-primary/20'>
                      {coupon.discount}% 할인
                    </Badge>
                    <div>
                      <div className='font-medium'>{coupon.name}</div>
                      <div className='text-sm text-muted-foreground'>
                        ₩{Math.floor((originalPrice * coupon.discount) / 100).toLocaleString()} 절약
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* 선택된 쿠폰 표시 */}
            {selectedCouponData && (
              <div className='p-4 bg-primary/10 rounded-lg border border-primary/20'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-medium text-primary'>{selectedCouponData.name} 적용됨</p>
                    <p className='text-sm text-primary/80'>₩{discountAmount.toLocaleString()} 할인</p>
                  </div>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => setSelectedCoupon('')}
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
                <span className='font-medium'>{mockPlan.name}</span>
                <span className='font-medium'>₩{originalPrice.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className='flex justify-between items-center text-primary'>
                  <span className='font-medium'>할인 ({discount}%)</span>
                  <span className='font-medium'>-₩{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className='border-t border-border pt-3'>
                <div className='flex justify-between items-center text-lg font-bold text-card-foreground'>
                  <span>총 결제 금액</span>
                  <span className='text-xl'>₩{finalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type='submit' className='w-full' size='lg'>
          다음 단계
        </Button>
      </form>
    </div>
  );
}
