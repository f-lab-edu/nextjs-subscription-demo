import { UserCoupon } from '@/types';
import { apiRequest } from './apiRequest';

export const couponService = {
  getUserCoupons: () => apiRequest<UserCoupon[]>('/user_coupons'),
};
