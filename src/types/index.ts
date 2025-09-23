export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export interface Card {
  id: string;
  userId: string;
  last4: string;
  cardOwner: string;
  expiry: string;
  brand: string;
  isDefault: boolean;
  pgToken: string;
}

export interface CreateCardRequest {
  cardNumber: string;
  cardOwner: string;
  expiry: string;
  brand: string;
  isDefault?: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface UserSubscription {
  id: string;
  userId: string;
  subscriptionId: string;
  cardId: string;
  couponId?: string;
  status: 'active' | 'cancelled' | 'paused' | 'expired';
  startDate: string;
  endDate?: string;
  nextBillingDate: string;
  originalPrice: number;
  discountedPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutRequest {
  subscriptionId: string;
  cardId: string;
  couponId?: string;
  originalPrice: number;
  discountedPrice: number;
}

export interface CreateSubscriptionRequest {
  userId: string;
  subscriptionId: string;
  cardId: string;
  couponId?: string;
  originalPrice: number;
  discountedPrice: number;
  status: 'active' | 'cancelled' | 'paused' | 'expired';
  startDate: string;
  nextBillingDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutResponse {
  success: boolean;
  data?: UserSubscription;
  error?: string;
}

export interface UserCouponInfo {
  id: string;
  userId: string;
  couponId: string;
  isUsed: boolean;
  usedAt?: string;
  coupons: {
    code: string;
    name: string;
    discount: number;
  };
}
