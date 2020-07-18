# node.js
Устанавливаем модуль ansi

```javascript
  npm install ansi
```

В файле app.js пишем код

```javascript
  const ansi = require("ansi");
  const cursor = ansi(process.stdout);
  cursor.beep();
```

Запускаем

```javascript
  node app 
```

Домашнее задание

Создать с помощью Node.js API консольную программу, которая будет выводить что-либо в консоль разными цветами и издавать звук(и) с помощью модуля или модулей, отличных от рассмотренного на уроке
