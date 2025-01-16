import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../front.jpg'; // Ścieżka do obrazu tła

// Stylizacja głównego kontenera
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: contain; /* Obraz będzie dopasowany w całości */
  background-color: #f0f0f0; /* Tło jako zapas */
  @media (max-width: 768px) {
    background-size: cover; /* Dla smartfonów wypełnij ekran */
  }
`;

// Stylizacja przycisku
const StartButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px; /* Przycisk nieco nad krawędzią ekranu */
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 10px 20px;
  }
`;

// Funkcja główna
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