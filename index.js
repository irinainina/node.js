const request = require("request");
const readline = require("readline");
const colors = require("colors");

function requestWords() {
  console.log("Русско-Английский переводчик".green);
  const requestWords = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  requestWords.question(
    "Введите слово или фразу на русском языке - ".red,
    (answer) => {
      requestWords.close();
      const encodeWordUri = encodeURI(answer);
      request(
        "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=" +
          encodeWordUri +
          "&lang=ru-en",
        (err, res, body) => {
          if (!err && res.statusCode == 200) {
            let obj = JSON.parse(body);
            console.log("**************ПЕРЕВОД**************");
            console.log(obj.text[0]);
          }
        }
      );
    }
  );
}

requestWords();
