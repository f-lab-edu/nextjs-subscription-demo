import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { CreditCard, Plus } from 'lucide-react';
import { useAddPaymentMethods } from '@/hooks/api/useAddPaymentMethods';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCardFormData, addCardSchema } from '@/schemas/addCardSchema';

interface AddCardModalProps {
  onCardAdded?: () => void;
}

export function AddCardModal({ onCardAdded }: AddCardModalProps) {
  const { updateParam } = useSubscriptionParams();
  const addPaymentMethodMutation = useAddPaymentMethods();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddCardFormData>({
    resolver: zodResolver(addCardSchema),
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      cardOwner: '',
      expiry: '',
      cvv: '',
    },
  });

  const onSubmit = async (data: AddCardFormData) => {
    try {
      const result = await addPaymentMethodMutation.mutateAsync({
        cardNumber: data.cardNumber,
        cardOwner: data.cardOwner,
        expiry: data.expiry,
        brand: 'New Card',
        isDefault: false,
      });
      reset();

      if (result.data) {
        updateParam('cardId', result.data.id);
        onCardAdded?.();
      }
    } catch (error) {
      console.error('카드 추가 실패:', error);
    }
  };

  return (
    <Dialog>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='cardNumber'>카드 번호</Label>
              <Input
                id='cardNumber'
                placeholder='1234 5678 9012 3456'
                {...register('cardNumber')}
                className={`bg-input text-foreground border-2 focus:border-primary ${
                  errors.cardNumber ? 'border-destructive' : 'border-border'
                }`}
              />
              {errors.cardNumber && <p className='text-sm text-destructive'>{errors.cardNumber.message}</p>}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='cardOwner'>카드 소유자명</Label>
              <Input
                id='cardOwner'
                placeholder='홍길동'
                {...register('cardOwner')}
                className={`bg-input text-foreground border-2 focus:border-primary ${
                  errors.cardOwner ? 'border-destructive' : 'border-border'
                }`}
              />
              {errors.cardOwner && <p className='text-sm text-destructive'>{errors.cardOwner.message}</p>}
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='expiry'>만료일</Label>
                <Input
                  id='expiry'
                  placeholder='MM/YY'
                  {...register('expiry')}
                  className={`bg-input text-foreground border-2 focus:border-primary ${
                    errors.expiry ? 'border-destructive' : 'border-border'
                  }`}
                />
                {errors.expiry && <p className='text-sm text-destructive'>{errors.expiry.message}</p>}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cvv'>CVV</Label>
                <Input
                  id='cvv'
                  placeholder='123'
                  {...register('cvv')}
                  className={`bg-input text-foreground border-2 focus:border-primary ${
                    errors.cvv ? 'border-destructive' : 'border-border'
                  }`}
                />
                {errors.cvv && <p className='text-sm text-destructive'>{errors.cvv.message}</p>}
              </div>
            </div>
            <div className='flex gap-2 pt-4'>
              <Button type='button' variant='outline' className='flex-1'>
                취소
              </Button>
              <Button type='submit' className='flex-1' disabled={addPaymentMethodMutation.isPending}>
                {addPaymentMethodMutation.isPending ? '등록 중...' : '등록'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
