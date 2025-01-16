import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Ranking from './components/Ranking';

function App() {
  const [nickname, setNickname] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setNickname={setNickname} />} />
        <Route path="/quiz" element={<Quiz nickname={nickname} />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </Router>
  );
}

export default App;