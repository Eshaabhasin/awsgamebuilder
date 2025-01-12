import React, { useState, useEffect } from 'react';
import './Cards.css';
// Import audio files
const flipSound = new Audio('/sounds/card-flip.mp3');
const matchSound = new Audio('/sounds/match.mp3');
const victorySound = new Audio('/sounds/victory.mp3');
const bgMusic = new Audio('/sounds/background-music.mp3');

const FlipCardGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Extended card data with more pairs
  const cardData = [
    { id: 1, value: '🎮', matched: false },
    { id: 2, value: '🎮', matched: false },
    { id: 3, value: '🎨', matched: false },
    { id: 4, value: '🎨', matched: false },
    { id: 5, value: '🎭', matched: false },
    { id: 6, value: '🎭', matched: false },
    { id: 7, value: '🎪', matched: false },
    { id: 8, value: '🎪', matched: false },
    { id: 9, value: '🌟', matched: false },
    { id: 10, value: '🌟', matched: false },
    { id: 11, value: '🎲', matched: false },
    { id: 12, value: '🎲', matched: false },
    { id: 13, value: '🎯', matched: false },
    { id: 14, value: '🎯', matched: false },
    { id: 15, value: '🎸', matched: false },
    { id: 16, value: '🎸', matched: false },
  ];

  // Initialize game
  useEffect(() => {
    shuffleCards();
    setupBackgroundMusic();
    return () => {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isPlaying && !gameComplete) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, gameComplete]);

  const setupBackgroundMusic = () => {
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
  };

  const playSound = (sound) => {
    if (!isMuted) {
      sound.currentTime = 0;
      sound.play();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    bgMusic.muted = !isMuted;
  };

  const shuffleCards = () => {
    const shuffledCards = [...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setScore(0);
    setTimeElapsed(0);
    setGameComplete(false);
    setIsPlaying(true);
    bgMusic.play();
  };

  const handleCardClick = (clickedCard) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(clickedCard.id) ||
      matchedPairs.includes(clickedCard.id)
    ) {
      return;
    }

    playSound(flipSound);
    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.value === secondCard.value) {
        playSound(matchSound);
        setMatchedPairs([...matchedPairs, firstId, secondId]);
        setScore(score + 100);
        setFlippedCards([]);
        
        if (matchedPairs.length + 2 === cards.length) {
          setGameComplete(true);
          setIsPlaying(false);
          playSound(victorySound);
          bgMusic.pause();
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>🎮 Memory Master 🎮</h1>
        <div className="game-controls">
          <div className="game-stats">
            <div className="stat-box">
              <span className="stat-label">Time</span>
              <span className="stat-value">{formatTime(timeElapsed)}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Moves</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score}</span>
            </div>
          </div>
          <div className="control-buttons">
            <button className="game-button" onClick={shuffleCards}>
              New Game
            </button>
            <button className="game-button" onClick={toggleMute}>
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${
              flippedCards.includes(card.id) || matchedPairs.includes(card.id)
                ? 'flipped'
                : ''
            }`}
            onClick={() => handleCardClick(card)}
          >
            <div className="card-inner">
              <div className="card-front">
                <span className="card-symbol">?</span>
              </div>
              <div className="card-back">
                <span className="card-symbol">{card.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {gameComplete && (
        <div className="game-complete-overlay">
          <div className="game-complete-modal">
            <h2>🎉 Congratulations! 🎉</h2>
            <div className="final-stats">
              <p>Time: {formatTime(timeElapsed)}</p>
              <p>Moves: {moves}</p>
              <p>Score: {score}</p>
            </div>
            <button className="game-button" onClick={shuffleCards}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlipCardGame;
