import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  const [nickname, setNickname] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setNickname={setNickname} />} />
        <Route path="/quiz" element={<Quiz nickname={nickname} />} />
      </Routes>
    </Router>
  );
}

export default App;
