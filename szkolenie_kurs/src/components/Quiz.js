import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Stylowanie komponentów
const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2f3, #8e9eab);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;

const QuizBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
`;

const Title = styled.h1`
  text-align: center;
  color: #34495e;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 600;
`;

const Question = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #4a4a4a;
`;

const AnswerLabel = styled.label`
  display: block;
  margin-bottom: 15px;
  font-size: 1rem;
  font-weight: 400;
  color: #555;
  cursor: pointer;

  input {
    margin-right: 10px;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  background-color: #5a9fd4;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
  margin-top: 20px;

  &:hover {
    background-color: #4682b4;
    transform: scale(1.05);
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #34495e;
  text-align: center;
`;

const Quiz = () => {
  const { state } = useLocation();
  const { nickname } = state || { nickname: 'Nieznany użytkownik' }; // Domyślna wartość

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

  // Sprawdź, czy test został już przesłany
  useEffect(() => {
    const submitted = localStorage.getItem('quizSubmitted');
    if (submitted === 'true') {
      setIsSubmitted(true);
    }
  }, []);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (userAnswers.some((answer) => answer === null)) {
      alert('Odpowiedz na wszystkie pytania przed zakończeniem testu.');
      return;
    }

    const score = calculateScore();

    // Zapis wyniku do bazy
    try {
      await axios.post('https://szkoleniekostarskak.netlify.app/.netlify/functions/saveResults', { nickname, score });
      setIsSubmitted(true);
      localStorage.setItem('quizSubmitted', 'true'); // Zapis do localStorage
    } catch (err) {
      console.error('Błąd podczas zapisywania wyniku:', err);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      if (answer === questions[index].correct) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  return (
    <Container>
      {isSubmitted ? (
        <Message>Odpowiedzi zostały wysłane.</Message>
      ) : (
        <QuizBox>
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
        </QuizBox>
      )}
    </Container>
  );
};

export default Quiz;