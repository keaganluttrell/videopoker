import React, { useEffect, useState } from 'react';
import Card from './Card';
import createDeck from '../logic/createDeck';
import shuffleDeck from '../logic/shuffleDeck';
import '../styles/single.css';
import checkHand from '../logic/checkHand';
import PayTable from './PayTable';

export default function Single() {
  const MAX_BET = 10;
  const DEFAULT_DECK = createDeck();
  const EMPTY_HAND = [{}, {}, {}, {}, {}];
  const [msg, setMsg] = useState('Welcome to video poker classic');
  const [deck, setDeck] = useState(reShuffleDeck());
  const [hand, setHand] = useState(EMPTY_HAND);
  const [balance, setBalance] = useState(100);
  const [paidOut, setPaidOut] = useState(0);
  const [bet, setBet] = useState(1);
  const [deal, setDeal] = useState(true);

  function reShuffleDeck() {
    return shuffleDeck(JSON.parse(JSON.stringify(DEFAULT_DECK)));
  }

  const betDown = () => {
    if (deal && bet > 1) setBet(bet - 1);
  };

  const betUp = () => {
    if (deal && bet < MAX_BET) setBet(bet + 1);
  };

  const betMax = () => { if (deal) setBet(MAX_BET) };

  const onDealOrDraw = () => {
    if (deal) {
      if (balance < bet) {
        setMsg('Please enter more credits');
        return;
      }
      setPaidOut(0);
      setBalance(balance - bet);
      setDeal(false);
      const newDeck = reShuffleDeck();
      setDeck(newDeck);
      const newHand = [];
      for (let i = 0; i < 5; i++) newHand.push(newDeck.pop());
      setHand(newHand);
      setMsg(checkHand(newHand).name || 'Good Luck!');
    } else {
      setDeal(true);
      const newHand = [];
      for (let i = 0; i < hand.length; i++) {
        if (!hand[i].hold) hand[i] = deck.pop();
        else hand[i].hold = false;
        newHand.push(hand[i]);
      }
      setHand(newHand);
      const status = checkHand(newHand);
      if (status.pay) {
        setPaidOut(bet * status.pay);
        setBalance(bet * status.pay + balance)
      };
      setMsg(status.name ? 'WINNER: ' + status.name : 'Game Over');
      setTimeout(() => { if (deal) setMsg('Place another bet') }, 2000);
      setDeck(reShuffleDeck())
    }
  };

  return (
    <div id="single">
      <PayTable bet={bet} max={MAX_BET} />
      <div id="msg">{msg}</div>
      <div id="hand">
        {hand.map((c, i) => <Card item={c} key={i} deal={deal} />)}
      </div>
      <div id="balance">
        <div className="info">Cash: {balance}</div>
        <div className="info">Paid: {paidOut}</div>
      </div>
      <div id="buttons">
        <div className="btn">Menu</div>
        <div className="btn">Payouts</div>
        <div className="info">
          <button onClick={betDown}>&#9661;</button>
          <div className="bet">{bet}</div>
          <button onClick={betUp}>&#9651;</button>
        </div>
        <div className="btn" onClick={betMax}>Bet Max</div>
        <div className="btn" onClick={onDealOrDraw}>{deal ? 'Deal' : 'Draw'}</div>
      </div>

    </div>
  )
}