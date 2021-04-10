import React from 'react';
import '../styles/modal';

export default function Modal({ msg, modal }) {
  return (
    <div id="modal-bg" style={{display: modal ? 'block' : 'none'}}>
      <div id="modal-fg">{msg + '!'}</div>
    </div>
  );
}