'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useSubscriptionParams } from '@/hooks/useSubscriptionParams';
import { User } from '@/types';
import { useUpdateUser } from '@/hooks/api/useUpdateUser';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserInfoFormData, userInfoSchema } from '@/schemas/userInfoSchema';

interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  const { goToStep } = useSubscriptionParams();
  const updateUserMutation = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
    mode: 'onChange',
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
    },
  });

  const onSubmit = async (data: UserInfoFormData) => {
    const hasChanges = isDirty;

    if (hasChanges) {
      await updateUserMutation.mutateAsync(data);
    }
    goToStep('Payment');
  };

  return (
    <div className='max-w-2xl mx-auto px-4'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>사용자 정보</h2>
        <p className='text-muted-foreground'>정보를 확인하고 필요시 수정해주세요.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>개인 정보</CardTitle>
            <CardDescription>필요한 정보를 직접 수정할 수 있습니다</CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>이름</Label>
                <Input
                  id='name'
                  {...register('name')}
                  placeholder='이름을 입력하세요'
                  className={`bg-input text-foreground border-2 focus:border-primary ${
                    errors.name ? 'border-destructive' : 'border-border'
                  }`}
                />
                {errors.name && <p className='text-sm text-destructive'>{errors.name.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>이메일</Label>
                <Input
                  id='email'
                  type='email'
                  {...register('email')}
                  placeholder='이메일을 입력하세요'
                  className={`bg-input text-foreground border-2 focus:border-primary ${
                    errors.email ? 'border-destructive' : 'border-border'
                  }`}
                />
                {errors.email && <p className='text-sm text-destructive'>{errors.email.message}</p>}
              </div>

              <div className='space-y-2'>
                <Label htmlFor='phone'>전화번호</Label>
                <Input
                  id='phone'
                  type='tel'
                  {...register('phone')}
                  placeholder='전화번호를 입력하세요'
                  className={`bg-input text-foreground border-2 focus:border-primary ${
                    errors.phone ? 'border-destructive' : 'border-border'
                  }`}
                />
                {errors.phone && <p className='text-sm text-destructive'>{errors.phone.message}</p>}
              </div>
            </div>

            {isDirty && (
              <div className='flex items-center gap-2 p-3 dark:bg-blue-950/20 rounded-md border dark:border-blue-800'>
                <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
                <span className='text-sm text-blue-700 dark:text-blue-300'>변경사항이 있습니다</span>
              </div>
            )}

            <Button type='submit' className='w-full' size='lg' disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? '저장 중...' : isDirty ? '저장 후 다음 단계' : '다음 단계'}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
