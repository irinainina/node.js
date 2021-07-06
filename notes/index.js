const fs = require('fs');

const command = process.argv[2];
const title = process.argv[3];
const content = process.argv[4];

switch(command) {
  case 'list': 
    list();
    break;
  case 'view': 
    view(title);
    break;
  case 'create': 
    create(title, content);
    break;
  case 'remove': 
    remove(title);
    break;
  default: console.log('Неизвестная команда');
}

function init() {
  fs.writeFile('notes.json', '[]', (error, data) => {
    if(error) return console.error(error.message);
  });
}

function create(title, content) {
  fs.exists('notes.json', (exists)=> {
      if (!exists) init();

      fs.readFile('notes.json', (error, data)=> {
          if(error) return console.error(error.message);
          const notes=JSON.parse(data);
          notes.push({title, content});
          const json=JSON.stringify(notes);

          fs.writeFile('notes.json', json, (error, data)=> {
              if(error) return console.error(error.message);
              console.log('Заметка создана');
            });
        });
    });
}

function list() {
  fs.readFile('notes.json', (error, data) => {
    if(error) return console.error(error.message);
    const notes = JSON.parse(data);    
    notes.forEach((note, index) => console.log(`${index} ${note.title}`))
  });
}

function view() {
  fs.readFile('notes.json', (error, data) => {
    if(error) return console.error(error.message);
    const notes = JSON.parse(data);
    const note = notes.find(note => note.title === title);
    if(!note) {
      console.log('Заметка не найдена');
      return;
    } else {
      console.log(note.content);
    }
  });
} 

function remove(title) {
  fs.readFile('notes.json', (error, data) => {
    if(error) return console.error(error.message);
    let notes = JSON.parse(data);
    notes = notes.filter(note => note.title !== title);
    const json = JSON.stringify(notes);
    fs.writeFile('notes.json', json, (error, data) => {
      if(error) return console.error(error.message);
      console.log('Заметка удалена');
    });
  });
}

