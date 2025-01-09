import React, { useState } from 'react';

const Quiz = () => {
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
    {
      question: 'Co oznacza termin "kapitał własny"?',
      answers: ['Zobowiązania wobec banków', 'Majątek właścicieli firmy', 'Należności od klientów'],
      correct: 1,
    },
    // Dodaj inne pytania w podobnym formacie
  ];

  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answerIndex;
    setUserAnswers(newAnswers);
    setErrorMessage(''); // Usunięcie błędu po zaznaczeniu odpowiedzi
  };

  const handleSubmit = () => {
    // Sprawdzenie, czy wszystkie pytania zostały odpowiedziane
    if (userAnswers.some((answer) => answer === null)) {
      setErrorMessage('Odpowiedz na wszystkie pytania przed zakończeniem testu.');
      return;
    }
    setIsSubmitted(true);
  };

  const restartQuiz = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setIsSubmitted(false);
    setErrorMessage('');
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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {!isSubmitted ? (
        <div>
          <h1>Quiz z rachunkowości i finansów</h1>
          <form>
            {questions.map((q, questionIndex) => (
              <div key={questionIndex} style={{ marginBottom: '20px' }}>
                <h2>{q.question}</h2>
                {q.answers.map((answer, answerIndex) => (
                  <label key={answerIndex} style={{ display: 'block', margin: '10px 0' }}>
                    <input
                      type="radio"
                      name={`question-${questionIndex}`}
                      value={answerIndex}
                      checked={userAnswers[questionIndex] === answerIndex}
                      onChange={() => handleAnswerChange(questionIndex, answerIndex)}
                    />
                    {String.fromCharCode(65 + answerIndex)}. {answer}
                  </label>
                ))}
              </div>
            ))}
            {errorMessage && (
              <p style={{ color: 'red', fontWeight: 'bold' }}>{errorMessage}</p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}
            >
              Zakończ test
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Twój wynik: {calculateScore()} / {questions.length}</h2>
          <button
            onClick={restartQuiz}
            style={{ padding: '10px 20px', fontSize: '18px', cursor: 'pointer' }}
          >
            Spróbuj ponownie
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
