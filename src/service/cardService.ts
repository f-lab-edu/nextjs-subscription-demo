import { Card, CreateCardRequest } from '@/types';
import { apiRequest } from './apiRequest';

export const cardService = {
  getCards: () => apiRequest<Card[]>('/cards'),

  createCard: (cardData: CreateCardRequest) =>
    apiRequest<Card>('/cards', {
      method: 'POST',
      body: JSON.stringify(cardData),
    }),
};
