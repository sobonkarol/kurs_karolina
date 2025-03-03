const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicjalizacja aplikacji
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Połączenie z MongoDB
mongoose.connect(process.env.MANGOOSE);

// Model wyniku z dodatkowym timestamp
const Result = mongoose.model('Result', new mongoose.Schema({
  nickname: String,
  score: Number,
  timestamp: { type: Date, required: true }  // Dodanie pola timestamp
}));

// Endpoint: Zapisanie wyniku
app.post('/api/results', async (req, res) => {
  const { nickname, score, timestamp } = req.body;  // Oczekiwanie na timestamp
  const newResult = new Result({ nickname, score, timestamp: new Date(timestamp) });  // Zapisanie timestampu
  await newResult.save();
  res.status(201).send('Wynik zapisany!');
});

// Endpoint: Pobranie rankingu
app.get('/api/results', async (req, res) => {
  const results = await Result.find().sort({ score: -1 });  // Sortowanie wyników malejąco
  res.status(200).json(results);
});

// Start serwera
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
