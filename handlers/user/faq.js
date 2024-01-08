const keyboards = require('../../keyboards');
const { fetchSectionInfo } = require('../../functions/fetchSectionInfo');
const { bot } = require('../../loader');

bot.on('callback_query', async (callbackQuery) => {
    const data = callbackQuery.data;

    if (data === 'faq') {
        const faqInfo = await fetchSectionInfo('faq');

        if (faqInfo && faqInfo.img_id && faqInfo.content) {
            const options = {
                chat_id: callbackQuery.message.chat.id,
                message_id: callbackQuery.message.message_id,
                parse_mode: 'HTML',
                reply_markup: keyboards.InnerKeyboard.keyboard
            };

            await bot.editMessageMedia({
                type: 'photo',
                media: faqInfo.img_id,
                caption: faqInfo.content,
            }, options);
        }
    }
});
