import React from 'react';
import BurgerMenu from './BurgerMenu';
import { RxHamburgerMenu } from 'react-icons/rx';
import './Header.css';

function Header({
    onRegisterClick,
    onLoginClick,
    loggedInUser,
    onLogout,
    currentGame,
    onGameChange,
    balance,
    onDepositClick,
    onWithdrawClick,
    setBalance,
    isBurgerMenuOpen,
    onToggleBurgerMenu
}) {
    return (
        <div className="header">
            <button className="burger-menu-button" onClick={onToggleBurgerMenu}><RxHamburgerMenu /></button>
            <BurgerMenu isOpen={isBurgerMenuOpen} onClose={onToggleBurgerMenu} onGameChange={onGameChange} />
            <span className="logo">BetPix</span>
            <div className="navigation">
                {loggedInUser ? (
                    <>
                        <div className="middle-content">
                            <div className="balance-box">
                                <span className="balance">Saldo: ${balance}</span>
                            </div>
                        </div>
                        <button className="button-deposit" onClick={onDepositClick}>Depositar</button>
                        <button className="button-withdraw" onClick={onWithdrawClick}>Sacar</button>
                        <button className="button-exit" onClick={() => { onLogout(); setBalance(0); }}>Sair</button>
                    </>
                ) : (
                    <>
                        <a href="#" onClick={onLoginClick} className='login-button'>Entrar</a>
                        <a href="#" onClick={onRegisterClick}>Cadastrar-se</a>
                    </>
                )}
            </div>
        </div>
    );
}


export default Header;
