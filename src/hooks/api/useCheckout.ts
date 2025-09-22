import { subscriptionService } from '@/service/subscriptionService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subscriptionService.checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/subscriptions/checkout'] });
    },
  });
}
