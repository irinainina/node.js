const express = require('express');
const { NOTE_VALIDATION_ERROR, NOTE_ALREADY_EXITS_ERROR, NOTE_NOT_FOUND_ERROR } = require('./errors');

const {list, view, create, remove} = require('./notes.commands');

const app = express();
const PORT = 3000;
const statuses = {};
statuses[NOTE_VALIDATION_ERROR] = 400;
statuses[NOTE_ALREADY_EXITS_ERROR] = 409;
statuses[NOTE_NOT_FOUND_ERROR] = 404;

app.use(express.json());

const asyncWrapper = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  }
};

app.get('/notes', asyncWrapper(async (req, res) => {
  const notes = await list();
  res.json(notes);
}));

app.get('/notes/:id', asyncWrapper(async (req, res) => {
  const noteTitle = req.params.id;
  const note = await view(noteTitle);
  res.json(note);
}));

app.post('/notes', asyncWrapper(async(req, res) => {
  const { title, content } = req.body.note;
  if(!title || !content) {
    throw new Error(NOTE_VALIDATION_ERROR);
  }
  await create(title, content);
  res.json({title, content});
}));

app.delete('/notes/:id', asyncWrapper(async(req, res) => {
  const noteTitle = req.params.id;
  await remove(noteTitle);
  res.json({ status: 'ok' });
}));

app.use(function (err, req, res, next) {
  const status = statuses[err.message] || 500;
  res.status(status).json({error: status === 500 ? 'internal server error' : err.message });
});

app.listen(PORT, () => {
  console.log(`Notes app listening at http://localhost:${PORT}`)
});