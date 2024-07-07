import React, { useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import Quiz from './components/Quiz/Quiz';
import CustomVideoPlayer from './components/video-player/video-player';
import { db } from './firebase';
import './App.css';
import { shuffleArray } from './utils'; // Ensure you have this utility function

const App = () => {
  const [showQuiz, setShowQuiz] = useState(true);
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
