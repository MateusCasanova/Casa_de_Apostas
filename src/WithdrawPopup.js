import React, { useState } from 'react';
import './WithdrawPopup.css';


function WithdrawPopup({ onClose, onWithdraw }) {
  const [amount, setAmount] = useState('');

  const handleWithdraw = async () => {
    onWithdraw(parseFloat(amount));
    onClose();
  };

  return (
    <div className="popup-withdraw">
      <div className="popup-box-withdraw">
        <button className="close-btn-withdraw" onClick={onClose}>&times;</button>
        <input 
          type="number" 
          placeholder="Quantia"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="default-btn-withdraw" onClick={handleWithdraw}>Sacar</button>
      </div>
    </div>
  );
}

export default WithdrawPopup;