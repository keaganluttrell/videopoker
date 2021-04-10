import React, { useEffect, useState } from 'react';

export default function Card({ item, deal }) {
  const [hold, setHold] = useState(item.hold);
  const [msg, setMsg] = useState('');
  const toggleHold = () => {
    if (item.suit && !deal) {
      item.hold = !item.hold;
      setHold(item.hold);
      item.hold ? setMsg('HOLD') : setMsg('');
    }
  }

  useEffect(() => {
    setMsg('');
  }, [deal])

  return (
    <div className={item.color === 'red' ? 'redCard' : 'blackCard'} onClick={toggleHold}>
      <div className="name">{item.value || ''}{item.suit || ''}</div>
      <div className="cardMsg">{msg||'✶'}</div>
      <div className="suit">{item.suit || ''}</div>
    </div>
  );
}