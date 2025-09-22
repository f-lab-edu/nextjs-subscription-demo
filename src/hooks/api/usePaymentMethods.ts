import { paymentMethodsService } from '@/service/paymentMethodsService';
import { useQuery } from '@tanstack/react-query';

export function usePaymentMethods() {
  return useQuery({
    queryKey: ['/api/payment-methods'],
    queryFn: paymentMethodsService.getCards,
    select: (response) => response.data || [],
  });
}
