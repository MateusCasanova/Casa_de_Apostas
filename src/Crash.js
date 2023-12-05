import React, { useEffect, useState } from 'react';
import './Crash.css';

const Crash = ({ loggedInUser, onDepositClick, onWithdrawClick, onLogout }) => {
    const [crashed, setCrashed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [multiplier, setMultiplier] = useState(1);
    const [crashPoint, setCrashPoint] = useState(generateCrashPoint());
    const [countdown, setCountdown] = useState(10);
    const [bet, setBet] = useState(0);
    const [hasWithdrawn, setHasWithdrawn] = useState(false);
    const [winAmount, setWinAmount] = useState(0);


    useEffect(() => {
        let interval;
        let countdownInterval;

        if (loading) {
            countdownInterval = setInterval(() => {
                setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);

            setTimeout(() => {
                setLoading(false);
                clearInterval(countdownInterval);
            }, 10000);
        } else if (!crashed) {
            interval = setInterval(() => {
                setMultiplier((prev) => {
                    const newMultiplier = prev * 1.01;
                    if (newMultiplier >= crashPoint) {
                        setCrashed(true);
                        clearInterval(interval);
                        setTimeout(() => resetGame(), 3000);
                        return prev;
                    }
                    return newMultiplier;
                });
            }, 50);
        }

        return () => {
            clearInterval(interval);
            clearInterval(countdownInterval);
        };
    }, [crashed, crashPoint, loading]);

    function generateCrashPoint() {
        let random = Math.random();
    
        if (random < 0.95) {
            return 1 + Math.random() * 4;
        } else {
            return 5.01 + Math.random() * (39 - 5.01);
        }
    }

    function resetGame() {
        setMultiplier(1);
        setCrashPoint(generateCrashPoint());
        setCrashed(false);
        setLoading(true);
        setCountdown(10);
    }

    const handleBetChange = (event) => {
        setBet(Number(event.target.value));
    };

    const updatedBetValue = (bet * multiplier).toFixed(2);

    if (!loggedInUser) {
        return (
            <div className="crash-container">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2rem', color: '#bbbec6', marginTop: '50%' }}>
                    Por favor, faça login para jogar!
                </div>
            </div>
        );
    }

    return (
        <div className="crash-container">
            <div className="crash-game-container">
                <div className="crash-display">
                    {loading && (
                        <div className="loading-overlay">
                            <div className="loading-bar">
                                <div className="loading-progress"></div>
                                <div className="countdown">{countdown}</div>
                            </div>
                        </div>
                    )}
                    <div className={`multiplier ${crashed ? 'multiplier-crashed' : ''}`}>
                        <p>{multiplier.toFixed(2)}x</p>
                    </div>
                </div>
            </div>

            <div className="crash-controls-container">
            <div className="crash-input-group">
                <label htmlFor="bet">Aposta</label>
                <input 
                    type="number" 
                    id="bet" 
                    placeholder="Valor da Aposta" 
                    onChange={handleBetChange} 
                    value={bet} 
                    disabled={!loading} 
                />
            </div>
            <button className="crash-aposta-btn" disabled={!loading}>
                {loading ? 'Apostar' : `Retirar: $${updatedBetValue}`}
            </button>
            </div>
        </div>
    );
};

export default Crash;
