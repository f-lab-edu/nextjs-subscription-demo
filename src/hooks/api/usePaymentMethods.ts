import { paymentMethodsService } from '@/service/paymentMethodsService';
import { useSuspenseQuery } from '@tanstack/react-query';

export function usePaymentMethods() {
  return useSuspenseQuery({
    queryKey: ['/api/payment-methods'],
    queryFn: paymentMethodsService.getCards,
    select: (response) => response.data || [],
  });
}
