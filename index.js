const beeper = require('beeper');
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');
const token = '1120306040:AAEISRSSASu1we2_25r8EAcN0bvQh_bnzJY';
const bot = new TelegramBot(token, {polling: true});

bot.on('message', function (msg) {
    const chatId = msg.chat.id;

    console.log("\x1b[36m%s\x1b[0m", "Имя: " + msg.from.first_name);
    console.log("\x1b[33m%s\x1b[0m", "Сообщение: " + msg.text);
    beeper(2);

    bot.sendMessage(chatId, "Hello! ", {caption: "I'm a bot!"});
});