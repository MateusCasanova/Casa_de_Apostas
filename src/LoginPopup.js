import React, { useState } from 'react';
import './LoginPopup.css';

function LoginPopup({ onClose, onUserLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      try {
        const data = await response.json();
        console.log(data);
        if (data.success) {
          onUserLogin(username);  
          onClose();
        } else {
          console.log("Erro no login:", data.message);
        }
      } catch (error) {
        console.error("Erro ao parsear a resposta da API:", error);
      }
    } catch (error) {
      console.error("Erro na chamada da API:", error);
    }
  };

  return (
    <div className="login-popup">
      <div className="login-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn-login" onClick={onClose}>&times;</button>
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
        <button className="default-btn-login" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default LoginPopup;
