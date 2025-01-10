import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Stylowanie komponentów
const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f7f7, #eaeaea);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;

const QuizBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 600;
`;

const Question = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #34495e;
`;

const AnswerLabel = styled.label`
  display: block;
  margin-bottom: 15px;
  font-size: 1.1rem;
  font-weight: 400;
  color: #555;
  cursor: pointer;

  input {
    margin-right: 10px;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #34495e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #2c3e50;
    transform: scale(1.05);
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Quiz = ({ nickname }) => {
  const questions = [
    {
      question: 'Co to jest aktywa?',
      answers: ['Zobowiązania firmy', 'Majątek firmy', 'Przychody firmy'],
      correct: 1,
    },
    {
      question: 'Co to jest bilans?',
      answers: ['Zestawienie przychodów i kosztów', 'Zestawienie aktywów i pasywów', 'Dokument podatkowy'],
      correct: 1,
    },
  ];

  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ranking, setRanking] = useState([]);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (userAnswers.some((answer) => answer === null)) {
      alert('Odpowiedz na wszystkie pytania przed zakończeniem testu.');
      return;
    }

    const score = calculateScore();
    const newRanking = [...ranking, { nickname, score }];
    newRanking.sort((a, b) => b.score - a.score); // Sortowanie wyników malejąco
    setRanking(newRanking);

    localStorage.setItem('quizRanking', JSON.stringify(newRanking));
    setIsSubmitted(true);
  };

  const resetRanking = () => {
    if (window.confirm('Czy na pewno chcesz zresetować ranking?')) {
      setRanking([]);
      localStorage.removeItem('quizRanking');
    }
  };

  const restartQuiz = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setIsSubmitted(false);
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      if (answer === questions[index].correct) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  useEffect(() => {
    const savedRanking = JSON.parse(localStorage.getItem('quizRanking')) || [];
    setRanking(savedRanking);
  }, []);

  return (
    <Container>
      <QuizBox>
        {!isSubmitted ? (
          <>
            <Title>Quiz dla {nickname}</Title>
            {questions.map((q, questionIndex) => (
              <div key={questionIndex}>
                <Question>{q.question}</Question>
                {q.answers.map((answer, answerIndex) => (
                  <AnswerLabel key={answerIndex}>
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={answerIndex}
                      checked={userAnswers[questionIndex] === answerIndex}
                      onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                    />
                    {String.fromCharCode(65 + answerIndex)}. {answer}
                  </AnswerLabel>
                ))}
              </div>
            ))}
            <Button onClick={handleSubmit}>Zakończ test</Button>
          </>
        ) : (
          <>
            <Title>Twój wynik: {calculateScore()} / {questions.length}</Title>
            <h2>Ranking:</h2>
            <ul>
              {ranking.map((entry, index) => (
                <li key={index}>
                  {index + 1}. {entry.nickname} - {entry.score} punktów
                </li>
              ))}
            </ul>
            <div>
              <Button onClick={restartQuiz}>Spróbuj ponownie</Button>
              <Button onClick={resetRanking}>Resetuj ranking</Button>
            </div>
          </>
        )}
      </QuizBox>
    </Container>
  );
};

export default Quiz;