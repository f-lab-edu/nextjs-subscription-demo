import { useEffect, useMemo } from 'react';
import { usePaymentMethods } from './api/usePaymentMethods';
import { useSubscriptionParams } from './useSubscriptionParams';

export function useValidatedCardSelection() {
  const { cardId, updateParam } = useSubscriptionParams();
  const { data: cards } = usePaymentMethods();

  const selectedCard = useMemo(() => {
    if (cards.length === 0) {
      return null;
    }

    const currentcardExists = cardId && cards.some((card) => card.id === cardId);
    if (currentcardExists) return cardId;

    const defaultCard = cards.find((card) => card.isDefault);
    return defaultCard?.id || cards[0]?.id || null;
  }, [cardId, cards]);

  useEffect(() => {
    if (selectedCard && selectedCard !== cardId) {
      updateParam('cardId', selectedCard);
    }
  }, [selectedCard, cardId, updateParam]);

  return selectedCard;
}
