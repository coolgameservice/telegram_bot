const TelegramBot = require("node-telegram-bot-api");
const config = require("./data/config.js");

const bot = new TelegramBot(config.BOT_TOKEN, {
  polling: true,
  parse_mode: "HTML",
});

bot.on("polling_error", (error) => {
  console.log(`Polling error: ${error.code} - ${error.message}`);
});

module.exports = { bot };
