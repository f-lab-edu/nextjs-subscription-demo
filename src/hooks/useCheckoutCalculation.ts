import { useMemo } from 'react';
import { useSubscriptionParams } from './useSubscriptionParams';
import { plans } from '@/data/card-data';
import { useSelectedCoupon } from './useSelectedCoupon';

type CheckoutCalculation = {
  selectedPlan: (typeof plans)[number] | undefined;
  selectedCoupon: ReturnType<typeof useSelectedCoupon>;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
};

export function useCheckoutCalculation(): CheckoutCalculation {
  const { planId } = useSubscriptionParams();
  const selectedCoupon = useSelectedCoupon();

  return useMemo(() => {
    const selectedPlan = plans.find((plan) => plan.id === planId);

    if (!selectedPlan) {
      return {
        selectedPlan: undefined,
        selectedCoupon,
        originalPrice: 0,
        discountAmount: 0,
        finalPrice: 0,
      };
    }

    const originalPrice = selectedPlan.price;
    const discountRate = selectedCoupon?.coupons.discount ?? 0;
    const discountAmount = Math.floor((originalPrice * discountRate) / 100);
    const finalPrice = originalPrice - discountAmount;

    return {
      selectedPlan,
      selectedCoupon,
      originalPrice,
      discountAmount,
      finalPrice,
    };
  }, [planId, selectedCoupon]);
}

type ValidatedCheckout = Omit<CheckoutCalculation, 'selectedPlan'> & {
  selectedPlan: NonNullable<CheckoutCalculation['selectedPlan']>;
};

export function useValidatedCheckout(): ValidatedCheckout {
  const checkout = useCheckoutCalculation();

  if (!checkout.selectedPlan) {
    throw new Error('플랜이 선택되지 않았습니다.');
  }

  return checkout as ValidatedCheckout;
}
