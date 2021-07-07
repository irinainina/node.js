const https = require('https');

function getRepos(username, done) {
  if (!username) return done(new Error('Необходимо указать имя пользователя'));
  const option = {
    hostname: 'api.github.com',
    path: `/users/${username}/repos`,
    headers: {
      'User-Agent': 'github-app',
    },
  };
  const req = https.get(option, (res) => {
    res.setEncoding('utf-8');
    if (res.statusCode === 200) {
      let body = '';
      res.on('data', (data) => (body += data));
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          done(null, result);
        } catch (error) {
          done(new Error('Не удалось обработать данные'));
        }
      });
    } else {
      done(new Error(`Ошибка при работе с сервером ${res.statusCode} ${res.statusMessage}`));
    }
  });
  req.on('error', (error) => done(new Error('Не удалось отправить запрос')));
}

module.exports = { getRepos };
