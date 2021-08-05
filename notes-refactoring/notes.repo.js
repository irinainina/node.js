const { readFile, writeFile } = require('fs/promises');
const { writeFileSync, existsSync } = require('fs');
const path = require('path');
const { NOTE_NOT_FOUND_ERROR, NOTE_ALREADY_EXITS_ERROR } = require('./errors');

const STORAGE_FILE_PATH = path.join(__dirname, 'storage.json');

if (!existsSync(STORAGE_FILE_PATH)) {
  const defaultContent = '[]';
  writeFileSync(STORAGE_FILE_PATH, defaultContent);
}

exports.getAll = async () => JSON.parse(await readFile(STORAGE_FILE_PATH));

exports.getOne = async (noteTitle) => {
  const notes = await this.getAll();
  const note = notes.find((note) => note.title === noteTitle);
  if (!note) {
    throw new Error(NOTE_NOT_FOUND_ERROR);
  }
  return note;
};

exports.create = async (note) => {
  const notes = await this.getAll();
  if(notes.some(el => el.title === note.title)) {
    throw new Error(NOTE_ALREADY_EXITS_ERROR);
  }
  notes.push(note);
  await writeFile(STORAGE_FILE_PATH, JSON.stringify(notes));
};

exports.deleteOne = async (noteTitle) => {
  const notes = await this.getAll();
  const filtredNotes = notes.filter((note) => note.title !== noteTitle);
  await writeFile(STORAGE_FILE_PATH, JSON.stringify(filtredNotes));
};