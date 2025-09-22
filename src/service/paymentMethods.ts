import { Card, CreateCardRequest } from '@/types';
import { apiRequest } from './apiRequest';

export const paymentMethodsService = {
  getCards: () => apiRequest<Card[]>('/payment-methods'),

  createCard: (cardData: CreateCardRequest) =>
    apiRequest<Card>('/cards', {
      method: 'POST',
      body: JSON.stringify(cardData),
    }),
};
