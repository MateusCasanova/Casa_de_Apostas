import React, { useState } from 'react';
import './DepositPopup.css';

function DepositPopup({ onClose, onDeposit }) {
  const [amount, setAmount] = useState('');

  const handleDeposit = async () => {
    onDeposit(parseFloat(amount));
    onClose();
  };

  return (
    <div className="popup-deposit">
      <div className="popup-box-deposit">
        <div className='close-deposit'>
          <button className="close-btn-deposit" onClick={onClose}>&times;</button>
        </div>
        <input 
          type="number" 
          placeholder="Quantia"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="default-btn-deposit" onClick={handleDeposit}>Depositar</button>
      </div>
    </div>
  );
}

export default DepositPopup;