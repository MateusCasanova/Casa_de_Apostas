import React from 'react';
import './BurgerMenu.css';
import { FaChessRook } from 'react-icons/fa6';
import { PiCoinsFill } from 'react-icons/pi';
import { BsFillRocketFill } from 'react-icons/bs';


const BurgerMenu = ({ isOpen, onClose, onGameChange }) => {
    return (
        <div className={`burger-menu ${isOpen ? 'open' : 'minimized'}`}>
            <div className='original'>ORIGINAIS BETPIX</div>
            <ul>
                <li className="nav-link stylish-text"><BsFillRocketFill/> Crash</li>
                <li className="nav-link stylish-text" onClick={() => onGameChange('Limbo')}><FaChessRook/>  Limbo</li>
                <li className="nav-link stylish-text" onClick={() => onGameChange('CoinFlip')}><PiCoinsFill/> CoinFlip</li>
            </ul>
        </div>
    );
};

export default BurgerMenu;
