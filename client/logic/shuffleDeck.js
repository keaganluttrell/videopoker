export default function shuffleDeck(deck) {
  const newDeck = [];
  while (deck.length > 0) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const randomCard = deck.splice(randomIndex, 1);
    newDeck.push(randomCard[0]);
  }
  return newDeck;
};