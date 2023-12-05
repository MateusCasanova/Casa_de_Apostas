import React, { useState } from 'react';
import './RegisterPopup.css';

function RegisterPopup({ onClose, onUserRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('https://betpixoficialapi-3907ceb27584.herokuapp.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      if (data.success) {
        console.log("Usuário registrado com sucesso!");
        onUserRegister(username);
        onClose();
      } else {
        alert("Erro ao registrar: " + data.message);
      }
    } catch (error) {
      console.error("Erro na chamada da API:", error);
    }
  };
  

  return (
    <div className="register-popup">
      <div className="register-box">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <input 
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="default-btn" onClick={handleRegister}>Registrar</button>
      </div>
    </div>
  );
}

export default RegisterPopup;
