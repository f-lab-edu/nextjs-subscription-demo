'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { userData } from '@/data/user-data';

interface UserInfoProps {
  onNext?: () => void;
}

export default function UserInfo({ onNext }: UserInfoProps) {
  const originalUserInfo = {
    name: userData?.name,
    email: userData?.email,
    phone: userData?.phone,
  };

  const [userInfo, setUserInfo] = useState(originalUserInfo);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof userInfo>>({});

  const hasChanges = JSON.stringify(userInfo) !== JSON.stringify(originalUserInfo);

  const handleInputChange = (field: keyof typeof userInfo, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<typeof userInfo> = {};

    if (!userInfo.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!userInfo.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!userInfo.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) {
      return;
    }

    if (hasChanges) {
      setIsSaving(true);
      try {
        onNext?.();
      } finally {
        setIsSaving(false);
      }
    } else {
      onNext?.();
    }
  };

  return (
    <div className='max-w-2xl mx-auto px-4'>
      <div className='text-center mb-6'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>사용자 정보</h2>
        <p className='text-muted-foreground'>정보를 확인하고 필요시 수정해주세요.</p>
      </div>

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
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder='이름을 입력하세요'
                className={`bg-input text-foreground border-2 focus:border-primary ${errors.name ? 'border-destructive' : 'border-border'}`}
              />
              {errors.name && <p className='text-sm text-destructive'>{errors.name}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>이메일</Label>
              <Input
                id='email'
                type='email'
                value={userInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder='이메일을 입력하세요'
                className={`bg-input text-foreground border-2 focus:border-primary ${errors.name ? 'border-destructive' : 'border-border'}`}
              />
              {errors.email && <p className='text-sm text-destructive'>{errors.email}</p>}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='phone'>전화번호</Label>
              <Input
                id='phone'
                type='tel'
                value={userInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder='전화번호를 입력하세요'
                className={`bg-input text-foreground border-2 focus:border-primary ${errors.name ? 'border-destructive' : 'border-border'}`}
              />
              {errors.phone && <p className='text-sm text-destructive'>{errors.phone}</p>}
            </div>
          </div>

          {hasChanges && (
            <div className='flex items-center gap-2 p-3 dark:bg-blue-950/20 rounded-md border  dark:border-blue-800'>
              <div className='w-2 h-2 bg-blue-500 rounded-full animate-pulse' />
              <span className='text-sm text-blue-700 dark:text-blue-300'>변경사항이 있습니다</span>
            </div>
          )}

          <Button onClick={handleNext} className='w-full' size='lg' disabled={isSaving}>
            {isSaving ? '저장 중...' : hasChanges ? '저장 후 다음 단계' : '다음 단계'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
