import { UserCouponInfo } from '@/types';
import { apiRequest } from './apiRequest';

export const couponService = {
  getUserCoupons: () => apiRequest<UserCouponInfo[]>('/coupons'),
};
