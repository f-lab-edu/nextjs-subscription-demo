import { Card } from '@/types';
import { useEffect, useMemo } from 'react';

interface UseValidatedCardSelectionProps {
  cardId: string | null;
  cards: Card[];
  updateParam: (key: 'cardId', value: string) => void;
}

export function useValidatedCardSelection({ cardId, cards, updateParam }: UseValidatedCardSelectionProps) {
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
