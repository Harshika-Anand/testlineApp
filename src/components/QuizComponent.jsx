import { useEffect, useState } from "react";
import { fetchQuizData } from "../services/fetchQuizData";
import ResultComponent from "./ResultComponent";
import styles from "./QuizComponent.module.css";

const QuizComponent = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const loadQuizData = async () => {
      const data = await fetchQuizData();
      setQuizData(data);
    };
    loadQuizData();
  }, []);

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === quizData[currentQuestion].correctAnswer;
    if (isCorrect) setScore(score + 1);
    
    setAnswers([...answers, {
      question: quizData[currentQuestion].question,
      selected: selectedAnswer,
      correct: quizData[currentQuestion].correctAnswer
    }]);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  return (
    <>
    <div className={styles.quizContainer}>
      
      {quizData.length > 0 ? (
        showResult ? (
          <ResultComponent score={score} total={quizData.length} answers={answers} restartQuiz={restartQuiz} />
        ) : (
            <><h1>Testline Quiz App</h1>
          <div className={styles.questionContainer}>
            <h2>{quizData[currentQuestion].question}</h2>
            <ul>
              {quizData[currentQuestion].options.map((option, idx) => (
                <li 
                  key={idx} 
                  className={`${styles.option} ${selectedAnswer === option ? styles.selected : ""}`}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <button onClick={handleNextQuestion} disabled={!selectedAnswer} className={styles.button}>
              {currentQuestion + 1 < quizData.length ? "Next Question" : "Finish Quiz"}
            </button>
            <div className={styles.progressBarContainer}>
  <div className={styles.progressBar} style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}></div>
</div>

          </div>
          </>
        )
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </div>
    </>
  );
};

export default QuizComponent;