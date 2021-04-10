const SUITS = ['♥', '♦', '♠', '♣'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export default function createDeck() {
  const newDeck = [];
  for (const s of SUITS) {
    for (const v of VALUES) {
      newDeck.push({
        value: v,
        suit: s,
        color: s === '♥' || s === '♦' ? 'red' : 'black',
        hold: false
      });
    }
  }
  return newDeck;
};