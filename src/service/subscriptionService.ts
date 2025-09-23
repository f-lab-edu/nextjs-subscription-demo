import { CheckoutRequest, Subscription, UserSubscriptionInfo } from '@/types';
import { apiRequest } from './apiRequest';

export const subscriptionService = {
  getSubscriptions: () => apiRequest<Subscription[]>('/subscriptions'),

  checkout: (subscriptionData: CheckoutRequest) =>
    apiRequest<UserSubscriptionInfo>('/subscriptions/checkout', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    }),
};
