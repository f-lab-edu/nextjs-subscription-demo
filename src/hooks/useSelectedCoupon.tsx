import { useMemo } from 'react';
import { UserCouponInfo } from '@/types';

interface UseSelectedCouponProps {
  couponId: string | null;
  userCoupons: UserCouponInfo[];
}

export function useSelectedCoupon({ couponId, userCoupons }: UseSelectedCouponProps): UserCouponInfo | null {
  return useMemo(() => {
    if (couponId == null) return null;
    return userCoupons.find((c) => c.couponId === couponId) || null;
  }, [userCoupons, couponId]);
}
