import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import frontImage from '../front.jpg'; // Import obrazu

// Stylowanie komponentów
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: url(${frontImage}) no-repeat center center; /* Ustawienie obrazu */
  background-size: contain; /* Obraz będzie cały widoczny */
  background-color: #000; /* Dodanie czarnego tła dla kontrastu */
  position: relative;

  @media (max-width: 768px) {
    background-size: contain; /* Obraz zawsze cały widoczny */
    background-position: center center;
  }

  @media (max-width: 480px) {
    background-size: contain;
    background-position: center center;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: rgba(0, 0, 0, 0.7); /* Przyciemniony przycisk */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 50px; /* Odstęp od dolnej krawędzi */
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    padding: 12px 25px;
    font-size: 1rem; /* Zmniejszenie rozmiaru czcionki na mniejszych ekranach */
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
  width: 90%;
  max-width: 400px;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #34495e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    background-color: #2c3e50;
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 8px 16px;
  }
`;

const Home = ({ setNickname }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); // Czy modal jest otwarty
  const [nickname, setLocalNickname] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (nickname.trim() === '') {
      alert('Proszę podać swój nick.');
      return;
    }
    setNickname(nickname);
    setIsModalOpen(false);
    navigate('/quiz');
  };

  return (
    <>
      <Container>
        <Button onClick={handleOpenModal}>Zacznij kurs</Button>
      </Container>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>Powodzenia!</ModalTitle>
            <Input
              type="text"
              placeholder="Wpisz swój nick"
              value={nickname}
              onChange={(e) => setLocalNickname(e.target.value)}
            />
            <ModalButton onClick={handleCloseModal}>Start</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Home;
