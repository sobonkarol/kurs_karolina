import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Stylowanie komponentów
const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #f5f5f5, #d9d9d9);
  font-family: 'Poppins', sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #2c3e50;
`;

const Description = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 40px;
  line-height: 1.6;
  max-width: 600px;
  color: #4a4a4a;
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

  &:hover {
    background-color: #2c3e50;
    transform: scale(1.05);
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <Container>
      <Title>Witamy na kursie rachunkowości i finansów</Title>
      <Description>
        Odkryj, jak dobrze znasz zagadnienia finansowe i księgowe, rozwiązując nasz elegancki quiz!
        Zdobądź nową wiedzę i sprawdź swoje umiejętności.
      </Description>
      <Button onClick={startQuiz}>Zacznij kurs</Button>
    </Container>
  );
};

export default Home;