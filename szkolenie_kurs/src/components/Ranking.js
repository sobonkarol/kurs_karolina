import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: 600;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  max-width: 600px;
  width: 100%;
`;

const ListItem = styled.li`
  background: white;
  margin: 10px 0;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get('https://szkoleniekostarskak.netlify.app/.netlify/functions/getResults'); // Upewnij się, że port backendu jest prawidłowy
        setRanking(response.data);
      } catch (err) {
        console.error('Błąd podczas pobierania rankingu:', err);
      }
    };

    fetchRanking();
  }, []);

  return (
    <Container>
      <Title>Ranking użytkowników</Title>
      <List>
        {ranking.map((entry, index) => (
          <ListItem key={index}>
            <span>{index + 1}. {entry.nickname}</span>
            <span>{entry.score} punktów</span>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Ranking;