import React from 'react';
import ReactDOM from 'react-dom/client'; // Użyj `react-dom/client` zamiast `react-dom`
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Stwórz "root" za pomocą createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);