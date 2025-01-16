import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../front.jpg'; // Upewnij się, że obraz jest w odpowiednim miejscu

// Stylowanie kontenera
const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${backgroundImage});
  background-size: cover; /* Dopasowanie obrazu do całego ekranu */
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    background-size: contain; /* Dopasowanie do ekranów smartfonów */
    background-color: #000; /* Dodanie czarnego tła, gdy obraz nie pokrywa całego ekranu */
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

// Stylowanie przycisku
const StartButton = styled.button`
  padding: 15px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 12px 30px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 10px 25px;
  }
`;

const Home = ({ setNickname }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    const nickname = prompt('Podaj swój nick:');
    if (nickname) {
      setNickname(nickname);
      navigate('/quiz');
    }
  };

  return (
    <HomeContainer>
      <StartButton onClick={handleStart}>Zacznij kurs</StartButton>
    </HomeContainer>
  );
};

export default Home;