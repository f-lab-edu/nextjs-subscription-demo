import { useMemo } from 'react';
import { UserCouponInfo } from '@/types';
import { useCoupons } from './api/useCoupons';
import { useSubscriptionParams } from './useSubscriptionParams';

export function useSelectedCoupon(): UserCouponInfo | null {
  const { couponId } = useSubscriptionParams();
  const { data: userCoupons = [] } = useCoupons();

  return useMemo(() => {
    if (couponId == null) return null;
    return userCoupons.find((c) => c.couponId === couponId) || null;
  }, [userCoupons, couponId]);
}
