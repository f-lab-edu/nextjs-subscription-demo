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
  user_id: string;
  last4: string;
  card_owner: string;
  expiry: string;
  brand: string;
  is_default: boolean;
  pg_token: string;
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
  user_id: string;
  subscription_id: string;
  card_id: string;
  coupon_id?: string;
  status: 'active' | 'cancelled' | 'paused' | 'expired';
  start_date: string;
  end_date?: string;
  next_billing_date: string;
  original_price: number;
  discounted_price: number;
}

export interface CheckoutRequest {
  subscriptionId: string;
  cardId: string;
  couponId?: string;
  originalPrice: number;
  discountedPrice: number;
}

export interface UserCouponInfo {
  id: string;
  user_id: string;
  coupon_id: string;
  is_used: boolean;
  used_at?: string;
  coupons: {
    code: string;
    name: string;
    discount: number;
  };
}
