import { cardService } from '@/service/paymentMethods';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddPaymentMethods() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cardService.createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/payment-methods'] });
    },
  });
}
