import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import CoinFlip from './CoinFlip';
import Limbo from './Limbo';
import RegisterPopup from './RegisterPopup';
import LoginPopup from './LoginPopup';
import DepositPopup from './DepositPopup';
import WithdrawPopup from './WithdrawPopup';
import Footer from './Footer';
import Crash from './Crash';


function App() {


  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentGame, setCurrentGame] = useState('CoinFlip');

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!burgerMenuOpen);
  };


  let gameComponent;
  if (currentGame === 'CoinFlip') {
    gameComponent = <CoinFlip loggedInUser={loggedInUser} />;
  } else if (currentGame === 'Limbo') {
    gameComponent = <Limbo loggedInUser={loggedInUser} />;
  } else if (currentGame === 'Crash') {
    gameComponent = <Crash loggedInUser={loggedInUser} />;
  }



  const handleLogin = async (username) => {
    try {
      const response = await fetch(`https://betpixoficialapi-3907ceb27584.herokuapp.com/api/users/getBalance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (data.success) {
        setLoggedInUser(username);
        setBalance(data.balance);
        console.log('Saldo atualizado para:', data.balance);
      } else {
        console.error('Erro ao obter saldo:', data.message);
      }
    } catch (error) {
      console.error('Erro na chamada da API:', error);
    }
  };



  const handleDeposit = async (amount) => {

    const response = await fetch('https://betpixoficialapi-3907ceb27584.herokuapp.com/api/users/deposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: loggedInUser, amount }),
    });

    const data = await response.json();
    if (data.success) {
      setBalance(data.balance);
    } else {
      console.error('Erro ao depositar:', data.message);
    }
  };

  const handleWithdraw = async (amount) => {

    const response = await fetch('https://betpixoficialapi-3907ceb27584.herokuapp.com/api/users/withdraw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: loggedInUser, amount }),
    });

    const data = await response.json();
    if (data.success) {
      setBalance(data.balance);
    } else {
      console.error('Erro ao sacar:', data.message);
    }
  };

  function checkScreenSize() {
    const warningElement = document.getElementById('screen-size-warning');
    if (window.innerWidth < 1000) {
      document.body.classList.add('blurred');
    } else {
      document.body.classList.remove('blurred');
    }
  }

  window.onload = checkScreenSize;
  window.onresize = checkScreenSize;


  return (
    <div className="App">
      <Header
        setBalance={setBalance}
        balance={balance}
        onRegisterClick={() => setShowRegister(true)}
        onLoginClick={() => setShowLogin(true)}
        loggedInUser={loggedInUser}
        onLogout={() => setLoggedInUser(null)}
        currentGame={currentGame}
        onGameChange={(game) => setCurrentGame(game)}
        onDepositClick={() => setShowDeposit(true)}
        onWithdrawClick={() => setShowWithdraw(true)}
        isBurgerMenuOpen={burgerMenuOpen}
        onToggleBurgerMenu={toggleBurgerMenu}
      />
      {gameComponent}
      {showRegister && <RegisterPopup onClose={() => setShowRegister(false)} onUserRegister={setLoggedInUser} />}
      {showLogin && <LoginPopup onClose={() => setShowLogin(false)} onUserLogin={handleLogin} />}
      {showDeposit && <DepositPopup onClose={() => setShowDeposit(false)} onDeposit={handleDeposit} />}
      {showWithdraw && <WithdrawPopup onClose={() => setShowWithdraw(false)} onWithdraw={handleWithdraw} />}
      <Footer />
      <div id="screen-size-warning">
        Tamanho da tela não é suportado.
      </div>
    </div>

  );
}

export default App;






