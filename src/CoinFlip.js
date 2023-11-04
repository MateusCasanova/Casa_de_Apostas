import React, { useState, useEffect } from 'react'; 
import './Coinflip.css';

const CoinFlip = ({ loggedInUser }) => {

    const [selectedOption, setSelectedOption] = useState('coroa');
    const [betAmount, setBetAmount] = useState('');
    const [coinSide, setCoinSide] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const [winningMessage, setWinningMessage] = useState(null);


    useEffect(() => {
        let timerId;
        if (spinning) {
            timerId = setTimeout(() => {
                const randomSide = Math.random() > 0.5 ? 'cara' : 'coroa';
                setCoinSide(randomSide);
                setSpinning(false);

                if (randomSide === selectedOption) {
                    setWinningMessage('Você venceu!');
                } else {
                    setWinningMessage('Você perdeu.');
                }
            }, 1000);
        }
        return () => clearTimeout(timerId);
    }, [spinning, selectedOption]);

    const flipCoin = () => {
        if (!selectedOption || !betAmount) {
            alert('Por favor, selecione uma opção e insira uma quantia antes de jogar.');
            return;
        }
        setWinningMessage(null);
        setSpinning(true);
    };
    return (
        <div className="coinflip-container">
            {!loggedInUser ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', color: '#bbbec6', marginTop: '19%' }}>
                    Por favor, faça login para jogar!
                </div>
            ) : (
                <>
                    <div className="coin-side">
                        <div className={`coin ${spinning ? 'spinning' : ''} ${coinSide}`}>
                            <div className="heads">
                                <img src="/cara.png" alt="Cara" />
                            </div>
                            <div className="tails">
                                <img src="/coroa.png" alt="Coroa" />
                            </div>
                        </div>
                        {winningMessage && <div className="winning-message">{winningMessage}</div>}
                    </div>
                    <div className="controls">
                        <input
                            type="number"
                            placeholder="Quantia"
                            value={betAmount}
                            onChange={e => setBetAmount(e.target.value)}
                        />
                        <button
                            className={`select-button stylish-text ${selectedOption === 'cara' ? 'selected' : ''}`}
                            onClick={() => setSelectedOption('cara')}
                        >
                            Cara
                        </button>
                        <button
                            className={`select-button yellow stylish-text ${selectedOption === 'coroa' ? 'selected' : ''}`}
                            onClick={() => setSelectedOption('coroa')}
                        >
                            Coroa
                        </button>
                        <button className="stylish-text" onClick={flipCoin}>Iniciar Jogo</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CoinFlip;
