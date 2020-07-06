import React from 'react';
import './styles.css';

export default function Modal(props) {
  return (
    props.open ?
      <div className="div-modal-content">
        <div className="div-modal">
          {props.children}
        </div>
      </div>
    : false
  );
}