import React, { useState } from 'react';
import './Limbo.css';

function Limbo({ loggedInUser }) {
    const [chance, setChance] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [multiplierResult, setMultiplierResult] = useState(1.00);
    const [resultColor, setResultColor] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [history, setHistory] = useState([]);


    if (!loggedInUser) {
        return (
            <div className="limbo-container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '2rem',
                color: '#bbbec6'
            }}>
                Por favor, faça login para jogar!
            </div>
        );
    }

    const handleMultiplierChange = (event) => {
        const multiplier = parseFloat(event.target.value);
        if (multiplier && multiplier >= 1.01) {
            const rawChance = (1 / multiplier) * 100;
            const adjustedChance = rawChance - 0.5;
            setChance(adjustedChance);
            setHasError(false);
        } else {
            setHasError(true);
        }
    };

    const handleAposta = () => {
        setIsAnimating(true);
    
        const animationDuration = 300;
        const updateInterval = 10; 
    
        const animationSteps = animationDuration / updateInterval;
        let stepsTaken = 0;
    
        const animation = setInterval(() => {
            const randomMultiplier = parseFloat((Math.random() * (2 - 0.01) + 0.01).toFixed(2));
            setMultiplierResult(randomMultiplier);
    
            stepsTaken++;
            if (stepsTaken >= animationSteps) {
                clearInterval(animation);
    
                const randomChance = Math.random() * 100;
                let finalMultiplier;
                if (randomChance <= chance) {
                    finalMultiplier = parseFloat((Math.random() * (2 - 1.01) + 1.01).toFixed(2));
                    setMultiplierResult(finalMultiplier);
                    setResultColor('green');
                } else {
                    finalMultiplier = parseFloat((Math.random() * (1.01 - 0.01) + 0.01).toFixed(2));
                    setMultiplierResult(finalMultiplier);
                    setResultColor('red');
                }
    
                setHistory(prevHistory => [finalMultiplier.toFixed(2), ...prevHistory].slice(0, 5));
    
                setIsAnimating(false);
            }
        }, updateInterval);
    };
    


    return (
        <div className="limbo-container">
            <div className="controls-container">
                <div className="input-group">
                    <label>Valor da Aposta</label>
                    <input type="number" placeholder="0.00" />
                    <button className="aposta-btn" onClick={handleAposta}>Começar o jogo</button>
                </div>
            </div>
            <div className="game-container">
                <div className="history-container">
                    {history.map((multiplier, index) => (
                        <div key={index} className="history-item">
                            {multiplier}×
                        </div>
                    ))}
                </div>
                <div className="game-display">
                    <h2 className={resultColor}>{multiplierResult.toFixed(2)}×</h2>
                </div>
                <div className="game-inputs">
                    <div className="inputs-box">
                        <div className="input-group">
                            <label>Multiplicador Alvo</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                onChange={handleMultiplierChange}
                                className={hasError ? "error" : ""}
                            />
                        </div>
                        <div className="input-group">
                            <label>Chance de Vitória</label>
                            <input
                                type="number"
                                value={chance.toFixed(9)}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Limbo;
