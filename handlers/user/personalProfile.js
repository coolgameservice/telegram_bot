const { bot } = require("../../loader");
const keyboards = require("../../keyboards");
const { fetchSectionInfo } = require("../../functions/fetchSectionInfo");
const { fetchPersonalInfo } = require("../../functions/fetchPersonalInfo");

bot.on("callback_query", async (callbackQuery) => {
  if (callbackQuery.data === "personal_profile") {
    const personalProfileInfo = await fetchSectionInfo("personal_profile");
    const personalInfoStr = await fetchPersonalInfo(callbackQuery.from.id);

    const options = {
      chat_id: callbackQuery.message.chat.id,
      message_id: callbackQuery.message.message_id,
      reply_markup: keyboards.InnerKeyboard.keyboard,
    };

    await bot.editMessageMedia(
      {
        type: "photo",
        parse_mode: "HTML",
        media: personalProfileInfo.img_id,
        caption: `<b>Личный кабинет</b>\n\n${personalInfoStr}`,
      },
      options
    );
  }
});
