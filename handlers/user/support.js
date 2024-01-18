const config = require("../../data/config");
const keyboards = require("../../keyboards");
const { fetchSectionInfo } = require("../../functions/fetchSectionInfo");
const { checkUserBanned } = require("../../functions/checkUserAccess");
const { getStartKeyboard } = require("../../functions/defaultKeyboard.js");
const { bot } = require("../../loader");

const SupportStates = {
  send_message_support: "send_message_support",
};

let userState = {};

bot.on("callback_query", async (callbackQuery) => {
  if (callbackQuery.data === "support") {
    const supportInfo = await fetchSectionInfo("support");
    let caption, replyMarkup;

    if (await checkUserBanned(callbackQuery.from.id)) {
      caption =
        "Вы забанены в этом боте, вы не можете писать в тех. поддержку.🚫";
      replyMarkup = keyboards.InnerKeyboard.keyboard;
    } else {
      caption = supportInfo.content;
      replyMarkup = keyboards.FinishSupportKeyboard.keyboard;
      userState[callbackQuery.from.id] = SupportStates.send_message_support;
    }

    await bot.editMessageMedia(
      {
        type: "photo",
        media: supportInfo.img_id,
        caption: caption,
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.message_id,
        reply_markup: replyMarkup,
      }
    );
  }

  if (callbackQuery.data.startsWith("finish_support")) {
    delete userState[callbackQuery.from.id];
    let replyMarkup;
    const startInfo = await fetchSectionInfo("start");
    if (await checkUserBanned(callbackQuery.from.id)) {
        replyMarkup = keyboards.StartKeyboardForBannedUser.keyboard;
    } else {
        replyMarkup = getStartKeyboard(callbackQuery.from.id);
    }
    await bot.editMessageMedia(
        {
          type: "photo",
          media: startInfo.img_id,
          caption: startInfo.content,
        },
        {
          chat_id: callbackQuery.message.chat.id,
          message_id: callbackQuery.message.message_id,
          reply_markup: replyMarkup,
        }
      );
  }
});

bot.on("message", async (msg) => {
  if (userState[msg.from.id] === SupportStates.send_message_support) {
    if(msg.text === '/start') {
      delete userState[msg.from.id];
      return;
    }

    const text = `📨 Новый вопрос!\n ID юзера: <code>${msg.from.id}</code>\n Ответить в директ: <code>/direct ${msg.from.id}</code>\n Вопрос:\n`;
    await bot.sendMessage(config.GROUP_ID, text, { parse_mode: "HTML" });
    await bot.forwardMessage(config.GROUP_ID, msg.from.id, msg.message_id);
    await bot.sendMessage(
      msg.chat.id,
      "Ваше сообщение отправлено.✉️ Ожидайте ответа."
    );
  }
});
