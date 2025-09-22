import { paymentMethodsService } from '@/service/paymentMethodsService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddPaymentMethods() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentMethodsService.createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/payment-methods'] });
    },
  });
}
