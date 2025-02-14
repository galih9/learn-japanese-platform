import { IHiragana } from '../pages/types';

// update play status
export function updatePlayStatus(list: IHiragana[], id: string): IHiragana[] {
  return list.map(item => {
    if (item.id === id) {
      return { ...item, played: true };
    }
    return item;
  });
}

export function refillDeck(deck: IHiragana[], allCards: IHiragana[], size: number): IHiragana[] {
  const unplayedCards = allCards.filter(card => !card.played);
  const newDeck = deck.filter(card => !card.played);
  while (newDeck.length < size && unplayedCards.length > 0) {
    const randomIndex = Math.floor(Math.random() * unplayedCards.length);
    newDeck.push(unplayedCards.splice(randomIndex, 1)[0]);
  }
  return newDeck;
}
