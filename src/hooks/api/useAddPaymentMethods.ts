import { paymentMethodsService } from '@/service/paymentMethodsService';
import { Card, CreateCardRequest } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useAddPaymentMethods() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentMethodsService.createCard,
    onMutate: async (newData: CreateCardRequest) => {
      await queryClient.cancelQueries({ queryKey: ['/api/payment-methods'] });
      const previousData = queryClient.getQueryData(['/api/payment-methods']);

      queryClient.setQueryData(['/api/payment-methods'], (old: { data: Card[] } | undefined) => {
        if (old == null) {
          return { data: [newData] };
        }

        return {
          ...old,
          data: [...old.data, newData],
        };
      });

      return { previousData };
    },
    onError: (_error, _newData, onMutateResult) => {
      queryClient.setQueryData(['/api/payment-methods'], onMutateResult?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/payment-methods'] });
    },
  });
}
