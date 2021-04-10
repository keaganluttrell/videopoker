const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['♥', '♦', '♠', '♣'];
const pays = [
  { name: 'Royal Flush', pay: 250 },
  { name: 'Straight Flush', pay: 50 },
  { name: '4 of a Kind', pay: 25 },
  { name: 'Full House', pay: 9 },
  { name: 'Flush', pay: 6 },
  { name: 'Straight', pay: 4 },
  { name: '3 of a Kind', pay: 3 },
  { name: 'Two Pair', pay: 2 },
  { name: 'Jacks or Better', pay: 1 }
];

const CARD_LOOKUP = {};

for (let i = 2; i < VALUES.length + 2; i++) {
  CARD_LOOKUP[VALUES[i - 2]] = i;
}

export default function checkHand(hand) {
  const reps = {};
  for (let i = 0; i < hand.length; i++) {
    reps[hand[i].value] ? reps[hand[i].value]++ : reps[hand[i].value] = 1;
  }
  if (checkRoyalFlush(hand)) return pays[0];
  if (checkStraightFlush(hand)) return pays[1];
  if (checkFour(reps)) return pays[2];
  if (checkFullHouse(reps)) return pays[3];
  if (checkFlush(hand)) return pays[4];
  if (checkStraight(hand)) return pays[5];
  if (checkTriple(reps)) return pays[6];
  if (checkPair(reps) === 2) return pays[7];
  if (checkJacksOrBetter(reps)) return pays[8];

  return {};
}

function checkFullHouse(hand) {
  let trip = false;
  let pair = false;
  for (const c in hand) {
    if (hand[c] === 3) trip = true;
    if (hand[c] === 2) pair = true;
  }
  return trip && pair;
}

function checkFour(hand) {
  for (const c in hand) {
    if (hand[c] === 4) return true;
  }
  return false;
}

function checkTriple(hand) {
  for (const c in hand) {
    if (hand[c] === 3) return true;
  }
  return false;
}

function checkPair(hand) {
  let ct = 0;
  for (const c in hand) {
    if (hand[c] === 2) ct++;
  }
  return ct;
}

function checkJacksOrBetter(hand) {
  for (const c in hand) {
    if ('JQKA'.includes(c) && hand[c] === 2) return true;
  }
  return false;
}

function checkStraight(hand) {
  hand = hand.slice().sort((a, b) => CARD_LOOKUP[a.value] < CARD_LOOKUP[b.value] ? -1 : 1);
  for (let i = 1; i < hand.length; i++) {
    const prev = CARD_LOOKUP[hand[i - 1].value];
    const curr = CARD_LOOKUP[hand[i].value];
    if (i === 4 && hand[0].value === '2' && hand[4].value === 'A') return true;
    if (curr - prev !== 1) return false;
  }
  return true;
}

function checkFlush(hand) {
  for (let i = 0; i < SUITS.length; i++) {
    if (hand.every(c => c.suit === SUITS[i])) return true;
  }
  return false;
}

function checkStraightFlush(hand) {
  return checkFlush(hand) && checkStraight(hand);
}

function checkRoyalFlush(hand) {
  hand = hand.slice().sort((a, b) => CARD_LOOKUP[a.value] < CARD_LOOKUP[b.value] ? -1 : 1);
  return checkFlush(hand) && checkStraight(hand) && hand[0].value === '10';
}

