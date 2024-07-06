import React, { useState } from 'react';
import Quiz from './components/Quiz/Quiz';
import CustomVideoPlayer from './components/video-player/video-player';
import './App.css';

const App = () => {
  const [showQuiz, setShowQuiz] = useState(true);
  const [videoSrc, setVideoSrc] = useState('');

  const handleQuizComplete = (score) => {
    let videoUrl = '';
    if (score <= 2) {
      videoUrl = 'https://www.youtube.com/watch?v=6LFjVC3cHjI';
    } else if (score >= 3 && score <= 4) {
      videoUrl = 'https://www.youtube.com/watch?v=NxzuC46mTm0&t=205s';
    } else if (score === 5) {
      videoUrl = 'https://www.youtube.com/watch?v=BaX7xwa8Vh4';
    }
    setVideoSrc(videoUrl);
    setShowQuiz(false);
  };

  return (
    <div className="app-container">
      {showQuiz ? (
        <Quiz onComplete={handleQuizComplete} />
      ) : (
        <CustomVideoPlayer src={videoSrc} />
      )}
    </div>
  );
};

export default App;
