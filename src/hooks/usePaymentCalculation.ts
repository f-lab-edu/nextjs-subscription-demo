import { useMemo } from 'react';
import { useSubscriptionParams } from './useSubscriptionParams';
import { plans } from '@/data/card-data';
import { usePaymentMethods } from './api/usePaymentMethods';
import { useCoupons } from './api/useCoupons';

export function usePaymentCalculation() {
  const { planid, cardid, couponid } = useSubscriptionParams();
  const { data: paymentMethods = [] } = usePaymentMethods();
  const { data: coupons = [] } = useCoupons();

  return useMemo(() => {
    const selectedPlan = plans.find((plan) => plan.id === planid);
    const selectedCardId = cardid || paymentMethods[0]?.id || '';
    const selectedCoupon = coupons.find((c) => c.coupon_id === couponid);

    const originalPrice = selectedPlan?.price || 0;
    const discountAmount = selectedCoupon?.coupons?.discount
      ? Math.floor((originalPrice * selectedCoupon.coupons.discount) / 100)
      : 0;
    const finalPrice = originalPrice - discountAmount;

    return {
      selectedPlan,
      selectedCardId,
      selectedCoupon,
      originalPrice,
      discountAmount,
      finalPrice,
    };
  }, [planid, cardid, couponid, paymentMethods, coupons]);
}
