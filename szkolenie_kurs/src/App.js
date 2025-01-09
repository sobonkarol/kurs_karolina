import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        {/* Strona wstępna */}
        <Route path="/" element={<Home />} />

        {/* Strona quizu */}
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;