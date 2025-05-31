const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;
const DATA_FILE = './notes.json';

app.use(cors());
app.use(bodyParser.json());

// JSON dosyasından notları oku
const readNotes = () => {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Notları JSON dosyasına yaz
const writeNotes = (notes) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(notes, null, 2));
};

// Tüm notları al
app.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// Yeni not ekle
app.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: Date.now(),
    text: req.body.text,
  };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

// Not sil
app.delete('/notes/:id', (req, res) => {
  const notes = readNotes();
  const updated = notes.filter(note => note.id != req.params.id);
  writeNotes(updated);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`✅ Backend çalışıyor: http://localhost:${PORT}`);
});

// Not güncelle
app.put('/notes/:id', async (req, res) => {
  const notes = readNotes();
  const noteId = parseInt(req.params.id);
  const updatedText = req.body.text;

  const updatedNotes = notes.map(note =>
    note.id === noteId ? { ...note, text: updatedText } : note
  );

  writeNotes(updatedNotes);
  res.json({ id: noteId, text: updatedText });
});
