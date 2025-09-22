import { Subscription, UserSubscription, UserSubscriptionInfo } from '@/types';
import { apiRequest } from './apiRequest';

export const subscriptionService = {
  getSubscriptions: () => apiRequest<Subscription[]>('/subscriptions'),

  checkout: (subscriptionData: UserSubscriptionInfo) =>
    apiRequest<UserSubscription>('/subscriptions/checkout', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    }),
};
