import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Witamy na kursie!</h1>
      <button onClick={startQuiz} style={{ padding: '10px 20px', fontSize: '18px' }}>
        Zacznij kurs
      </button>
    </div>
  );
};

export default Home;