const { program } = require('commander');
const { create, list, view, remove } = require('./notes.commands');
const { NOTE_VALIDATION_ERROR } = require('./errors');

program
  .command('create <title> <content>')
  .description('Создать заметку')
  .action(async (title, content) => {
    await create(title, content);
    console.log('Заметка создана');
  })
  .showHelpAfterError(NOTE_VALIDATION_ERROR);

program
  .command('list')
  .description('Список заметок')
  .action(async () => console.log(await list()));

program
  .command('view <title>')
  .description('Показать заметку')
  .action(async (title) => console.log(await view(title)));

program
  .command('remove <title>')
  .description('Удалить заметку')
  .action(async (title) => {
    await remove(title);
    console.log('Заметка удалена');
  });

program.parseAsync(process.argv).catch((err) => console.log(err.message));