import React, { useState } from 'react';
import './Spinthewheel.css';

const constitutionTopics = [
  { id: 1, title: 'Fundamental Rights', color: '#FF6B6B' },
  { id: 2, title: 'Directive Principles', color: '#4ECDC4' },
  { id: 3, title: 'Preamble', color: '#45B7D1' },
  { id: 4, title: 'Federal Structure', color: '#96CEB4' },
  { id: 5, title: 'Constitutional Bodies', color: '#FFEEAD' },
  { id: 6, title: 'Amendment Process', color: '#D4A5A5' },
  { id: 7, title: 'Citizenship', color: '#9DE0AD' },
  { id: 8, title: 'Emergency Provisions', color: '#FF9999' }
];

const Spinthewheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const spinWheel = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      const newRotation = rotation + Math.floor(Math.random() * 1440) + 1440; // At least 4 full spins
      setRotation(newRotation);
      
      // Calculate which topic was selected
      setTimeout(() => {
        const degrees = newRotation % 360;
        const sectorSize = 360 / constitutionTopics.length;
        const selectedIndex = Math.floor(degrees / sectorSize);
        setSelectedTopic(constitutionTopics[selectedIndex]);
        setIsSpinning(false);
      }, 3000);
    }
  };

  return (
    <div className="wheel-container">
        <div className='left'>
            <div >
      <h1 className='heading'>Indian Constitution Spin Wheel</h1>
      <div 
        className="wheel"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {constitutionTopics.map((topic, index) => {
          const rotation = (360 / constitutionTopics.length) * index;
          return (
            <div
              key={topic.id}
              className="wheel-sector"
              style={{
                transform: `rotate(${rotation}deg)`,
                backgroundColor: topic.color
              }}
            >
              <span className="topic-text">{topic.title}</span>
            </div>
          );
        })}
      </div>
      <button 
        className="spin-button" 
        onClick={spinWheel}
        disabled={isSpinning}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>
      </div>
      </div>
     <div className='right'>
      {selectedTopic && !isSpinning && (
        
        <div className="topic-info">
          <h2>You have chosen {selectedTopic.title}</h2>
          <p>Let's learn more about {selectedTopic.title}!</p>
        </div>
       
      )}
      </div>
    </div>
  );
};

export default Spinthewheel;