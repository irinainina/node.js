const { getAll, getOne, create, deleteOne } = require('./notes.repo');

exports.create = async (title, content) => {
  await create({ title, content });
};

exports.list = async () => {
  const notes = await getAll();
  return notes;
};

exports.view = async (title) => {
  const note = await getOne(title);
  const { content } = note;
  return content;
};

exports.remove = async (title) => {
  await deleteOne(title);
};