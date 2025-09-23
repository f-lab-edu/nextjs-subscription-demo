import z from 'zod';

export const userInfoSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  email: z.string().email('올바른 이메일 형식이 아닙니다'),
  phone: z.string().min(1, '전화번호를 입력해주세요'),
});

export type UserInfoFormData = z.infer<typeof userInfoSchema>;
