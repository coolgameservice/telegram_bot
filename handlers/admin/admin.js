const { bot } = require("../../loader");
const { AdminEditKeyboard } = require("../../keyboards");

const ADMIN_CAPTION = "Админка";

bot.on("callback_query", async (callbackQuery) => {
  if (callbackQuery.data === "bot_admin") {
    const img =
      "AgACAgIAAxkBAAMUZZwjrrQXHGOwuYDcFn1mVXpiQwMAAlXbMRuQVuBIWXoqAZYwUFgBAAMCAAN5AAM0BA";

    await bot.editMessageMedia(
      {
        type: "photo",
        media: img,
        caption: ADMIN_CAPTION,
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.message_id,
        reply_markup: AdminEditKeyboard.keyboard,
      }
    );
  }
});
