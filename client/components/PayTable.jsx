import React from 'react';
import '../styles/paytable.css'

export default function PayTable({ bet, max }) {
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

  return (
    <table>
      <tbody>
        {pays.map(p => {
          const arr = new Array(max).fill(1);
          let ct = 0;
          return (
            <tr key={p.name + ' ' + p.pay}>
              <td>{p.name}</td>
              {arr.map(a => {
                ct += a;
                return (
                  <td
                    key={p.name + ' ' + p.pay + ct}
                    className={bet === ct ? 'bet' : 'blank'}
                  >
                    {p.pay * ct}
                  </td>
                );
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
}