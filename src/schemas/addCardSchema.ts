import z from 'zod';

export const addCardSchema = z.object({
  cardNumber: z.string().min(16, '16자리 카드번호를 입력해주세요'),
  cardOwner: z.string().min(1, '카드 소유자명을 입력해주세요'),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'MM/YY 형식으로 입력해주세요'),
  cvv: z.string().regex(/^\d{3}$/, '3자리 CVV를 입력해주세요'),
});

export type AddCardFormData = z.infer<typeof addCardSchema>;
