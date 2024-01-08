const { bot } = require("../../loader");
const { updateScreenContent } = require("../../functions/adminUpdateData");

const EDIT_FAQ_CAPTION = "Измените содержание и фотографию раздела FAQ:";
const userStates = {};

bot.on("callback_query", async (callbackQuery) => {
  if (callbackQuery.data === "edit_faq") {
    const img =
      "AgACAgIAAxkBAAMUZZwjrrQXHGOwuYDcFn1mVXpiQwMAAlXbMRuQVuBIWXoqAZYwUFgBAAMCAAN5AAM0BA";
    await bot.editMessageMedia(
      {
        type: "photo",
        media: img,
        caption: EDIT_FAQ_CAPTION,
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.message_id,
      }
    );
    userStates[callbackQuery.from.id] = "wait_for_faq_edit";
  }
});

bot.on("message", async (msg) => {
  if (userStates[msg.from.id] === "wait_for_faq_edit") {
    const newContent = msg.text || "";
    const newImg =
      msg.photo && msg.photo.length > 0 ? msg.photo[0].file_id : "";

    if (newContent) {
      if (await updateScreenContent("faq", "content", newContent)) {
        await bot.sendMessage(msg.chat.id, "Описание успешно сохранено.");
      } else {
        await bot.sendMessage(
          msg.chat.id,
          "Произошла ошибка при обновлении описания, попробуйте позже."
        );
      }
    }

    if (newImg) {
      if (await updateScreenContent("faq", "img_id", newImg)) {
        await bot.sendMessage(msg.chat.id, "Фотография раздела сохранена.");
      } else {
        await bot.sendMessage(
          msg.chat.id,
          "Произошла ошибка при обновлении фотографии, попробуйте позже."
        );
      }
    }

    delete userStates[msg.from.id];
  }
});
