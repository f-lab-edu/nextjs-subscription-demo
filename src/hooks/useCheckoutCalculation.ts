import { useMemo } from 'react';
import { useSubscriptionParams } from './useSubscriptionParams';
import { plans } from '@/data/card-data';
import { useCoupons } from './api/useCoupons';

export function useCheckoutCalculation() {
  const { planId, couponId } = useSubscriptionParams();
  const { data: coupons = [] } = useCoupons();

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
      selectedCoupon,
      originalPrice,
      discountAmount,
      finalPrice,
    };
  }, [planId, couponId, coupons]);
}

export function useValidatedCheckout() {
  const checkout = useCheckoutCalculation();

  return useMemo(() => {
    if (!checkout.selectedPlan) {
      throw new Error('플랜이 선택되지 않았습니다.');
    }

    return {
      ...checkout,
      selectedPlan: checkout.selectedPlan,
    };
  }, [checkout]);
}
