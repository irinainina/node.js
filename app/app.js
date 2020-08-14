const express = require('express');
const consolidate = require('consolidate');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const { promisify } = require('util');
const promisifyRequest = promisify(request);

const app = express();

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.urlencoded({ extended: false }));

app.get('/news', (req, res) => {
  res.render('news');
});

app.post('/news', async (req, res) => {
  const { count = 10, source = 'bash' } = req.body;
  if (source === 'bash') {
    const { body } = await promisifyRequest('https://bash.im/');
    const $ = cheerio.load(body);
    const quotes = Array.prototype.slice.call(
      $('.quote__body').map((_, element) => $(element).text()),
      1,
      count
    );
    res.render('news', {
      news: quotes,
    });
  } else if (source === 'anekdot') {
    const { body } = await promisifyRequest('https://www.anekdot.ru/');
    const $ = cheerio.load(body);
    const quotes = Array.prototype.slice.call(
      $('.topicbox .text').map((_, element) => $(element).text()),
      1,
      count
    );
    res.render('news', {
      news: quotes,
    });
  } else {
    res.render('news', {
      err: 'Такой источник не поддерживается',
    });
  }
});

app.listen(3000, () => {
  console.log('Server has been started!');
});
