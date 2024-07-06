import React, { useRef, useState, useEffect } from 'react';
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import './Quiz.css';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Quiz = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [data, setData] = useState([]);
  
  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "questions"));
      const querySnapshot = await getDocs(q);
      const allDocs = querySnapshot.docs;
      const shuffledDocs = shuffleArray(allDocs);

      const selectedDocs = shuffledDocs.slice(0, 5);
      const questions = selectedDocs.map(doc => ({
        question: doc.data().question,
        option1: doc.data().option1,
        option2: doc.data().option2,
        option3: doc.data().option3,
        option4: doc.data().option4,
        ans: doc.data().ans,
      }));

      setData(questions);
      setQuestion(questions[0]);
    };

    fetchData();
  }, []);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true);
        onComplete(score); 
      } else {
        setIndex(prev => prev + 1);
        setQuestion(data[index + 1]);
        setLock(false);
        option_array.forEach(option => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
      }
    }
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <h1>Grammar</h1>
      <hr/>
      {!result ? (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {data.length}</div>
        </>
      ) : (
        <>
          <h3>Score is {score} out of {data.length}</h3>
          <button onClick={() => onComplete(score)}>View Suggested Video</button>
        </>
      )}
    </div>
  );
};

export default Quiz;