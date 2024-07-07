import React, { useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import Quiz from './components/Quiz/Quiz';
import CustomVideoPlayer from './components/video-player/video-player';
import IntroPage from './components/intropage/intropage'; // Import IntroPage component
import { db } from './firebase';
import './App.css';
import { shuffleArray } from './utils';

const App = () => {
  const [showIntro, setShowIntro] = useState(true); // State to manage showing intro page or quiz
  const [showQuiz, setShowQuiz] = useState(false);
  const [videoSrc, setVideoSrc] = useState([]);

  const fetchData = async () => {
    const q = query(collection(db, "video-links"));
    const querySnapshot = await getDocs(q);
    const allDocs = querySnapshot.docs;
    const shuffledDocs = shuffleArray(allDocs);
    const selectedDocs = shuffledDocs.slice(0, 2);
    const videoLinks = selectedDocs.map((doc) => doc.data().link);

    setVideoSrc(videoLinks);
  };

  const handleQuizComplete = async (score) => {
    await fetchData();
    setShowQuiz(true); // After quiz completion, show the video player
    setShowIntro(false); // Hide the intro page
  };

  const handleStartQuiz = (difficulty) => {
    setShowIntro(false); // Hide intro page when starting the quiz
    setShowQuiz(true); // Show the quiz component
  };

  return (
    <div className="app-container">
      {showIntro && <IntroPage onStart={handleStartQuiz} />} 
      {showQuiz && <Quiz onComplete={handleQuizComplete} />} 
      {videoSrc.length > 0 && <CustomVideoPlayer src={videoSrc} />} 
    </div>
  );
};

export default App;
