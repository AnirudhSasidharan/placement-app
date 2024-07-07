import React from 'react';
import './intropage.css'; 

const IntroPage = ({ onStart }) => {
  const handleStartQuiz = (difficulty) => {
    
    onStart(difficulty);
  };

  return (
    <div className="intro-container">
      <h1>Welcome to the Grammar Quiz</h1>
      <p>Choose your difficulty level:</p>
      <div className="difficulty-buttons">
        <button onClick={() => handleStartQuiz('easy')}>Easy</button>
        <button onClick={() => handleStartQuiz('intermediate')}>Intermediate</button>
        <button onClick={() => handleStartQuiz('hard')}>Hard</button>
      </div>
    </div>
  );
};

export default IntroPage;
