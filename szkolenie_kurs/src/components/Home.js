import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import backgroundImage from '../front.jpg'; // Upewnij się, że ścieżka do obrazu jest poprawna

// Stylowanie kontenera strony głównej
const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: url(${backgroundImage}) no-repeat center center fixed;
  background-size: cover;
`;

// Stylowanie przycisku "Zacznij kurs"
const StartButton = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
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
`;

// Stylowanie zawartości modala
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

// Stylowanie przycisku w modalu
const ModalButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = ({ setNickname }) => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [nickname, setNicknameInput] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleStart = () => {
    if (nickname.trim()) {
      setNickname(nickname);
      navigate('/quiz');
    } else {
      alert('Proszę wprowadzić nick.');
    }
  };

  return (
    <HomeContainer>
      <StartButton onClick={openModal}>Zacznij kurs</StartButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Wprowadź swój nick"
        ariaHideApp={false} // Dodaj to, jeśli nie ustawiasz elementu głównego aplikacji
      >
        <h2>Wprowadź swój nick</h2>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNicknameInput(e.target.value)}
          placeholder="Twój nick"
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            fontSize: '1rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <ModalButton onClick={handleStart}>Rozpocznij</ModalButton>
      </Modal>
    </HomeContainer>
  );
};

export default Home;