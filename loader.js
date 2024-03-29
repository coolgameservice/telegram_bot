const TelegramBot = require("node-telegram-bot-api");
const config = require("./data/config.js");
const fs = require("fs");

const bot = new TelegramBot(config.BOT_TOKEN, {
  polling: true,
  parse_mode: "HTML",
});

bot.on("polling_error", (error) => {
  const errorMessage = `Polling error: ${error.code} - ${error.message}\n`;
  fs.appendFile("error.txt", errorMessage, (err) => {
    if (err) {
      console.error("Ошибка при записи в файл:", err);
    }
  });
});

module.exports = { bot };
