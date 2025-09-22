import { couponService } from '@/service/couponService';
import { useQuery } from '@tanstack/react-query';

export function useCoupons() {
  return useQuery({
    queryKey: ['/api/coupons'],
    queryFn: couponService.getUserCoupons,
    select: (response) => response.data,
  });
}
