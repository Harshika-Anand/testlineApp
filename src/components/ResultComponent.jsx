import { motion } from "framer-motion";
import styles from './ResultComponent.module.css';

const getBadge = (score, total) => {
  const percentage = (score / total) * 100;
  if (percentage >= 80) return { label: "Expert", emoji: "🏆" };
  if (percentage >= 50) return { label: "Intermediate", emoji: "⭐" };
  return { label: "Beginner", emoji: "🎓" };
};

const ResultComponent = ({ score, total, answers, restartQuiz }) => {
  const { label, emoji } = getBadge(score, total);

  return (
    <motion.div 
      className={styles.resultContainer}
      initial={{ scale: 0.8, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score} / {total}</p>

      {/* Badge Display */}
      <p className={styles.badge}>Badge: {emoji} {label}</p>

      <h3>Review Your Answers:</h3>
      <ul className={styles.answerList}>
        {answers.map((answer, idx) => (
          <li key={idx} className={styles.answerItem}>
            <strong>{answer.question}</strong>
            <p>
              Your Answer: <span className={answer.selected === answer.correct ? styles.correct : styles.wrong}>
                {answer.selected}
              </span>
            </p>
            <p>Correct Answer: <span className={styles.correct}>{answer.correct}</span></p>
          </li>
        ))}
      </ul>

      <button onClick={restartQuiz} className={styles.button}>Restart Quiz</button>
    </motion.div>
  );
};

export default ResultComponent;
