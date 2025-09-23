import { useMemo, useEffect } from 'react';
import { useSubscriptionParams } from './useSubscriptionParams';
import { plans } from '@/data/card-data';
import { usePaymentMethods } from './api/usePaymentMethods';
import { useCoupons } from './api/useCoupons';

export function useCheckoutCalculation() {
  const { planId, cardId, couponId, updateParam } = useSubscriptionParams();
  const { data: paymentMethods = [] } = usePaymentMethods();
  const { data: coupons = [] } = useCoupons();

  useEffect(() => {
    if (paymentMethods.length === 0) return;

    const currentCardExists = cardId && paymentMethods.some((card) => card.id === cardId);

    if (!currentCardExists) {
      const defaultCard = paymentMethods.find((card) => card.isDefault);
      const targetCardId = defaultCard?.id || paymentMethods[0]?.id;

      if (targetCardId && targetCardId !== cardId) {
        updateParam('cardId', targetCardId);
      }
    }
  }, [cardId, paymentMethods, updateParam]);

  return useMemo(() => {
    const selectedPlan = plans.find((plan) => plan.id === planId);
    const selectedCoupon = coupons.find((c) => c.coupon_id === couponId);

    const originalPrice = selectedPlan?.price || 0;
    const discountAmount = selectedCoupon?.coupons?.discount
      ? Math.floor((originalPrice * selectedCoupon.coupons.discount) / 100)
      : 0;
    const finalPrice = originalPrice - discountAmount;

    return {
      selectedPlan,
      selectedCardId: cardId,
      selectedCoupon,
      originalPrice,
      discountAmount,
      finalPrice,
    };
  }, [planId, cardId, couponId, coupons]);
}
