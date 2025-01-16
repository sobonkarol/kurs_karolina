const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Inicjalizacja aplikacji
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Połączenie z MongoDB
mongoose.connect('mongodb+srv://karolsobon:NmwHdRNMFOcM5zW1@cluster0.pappf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Model wyniku
const Result = mongoose.model('Result', {
  nickname: String,
  score: Number,
});

// Endpoint: Zapisanie wyniku
app.post('/api/results', async (req, res) => {
  const { nickname, score } = req.body;
  const newResult = new Result({ nickname, score });
  await newResult.save();
  res.status(201).send('Wynik zapisany!');
});

// Endpoint: Pobranie rankingu
app.get('/api/results', async (req, res) => {
  const results = await Result.find().sort({ score: -1 }); // Sortowanie wyników malejąco
  res.status(200).json(results);
});

// Start serwera
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
