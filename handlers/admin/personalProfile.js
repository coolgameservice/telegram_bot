const { bot } = require('../../loader');
const { updateScreenContent  } = require('../../functions/adminUpdateData');

const EDIT_PROFILE_CAPTION = 'Измените фотографию раздела Личный кабинет:';
const userStates = {};

bot.on('callback_query', async (callbackQuery) => {
    if (callbackQuery.data === 'edit_personal_profile') {
        const img = 'AgACAgIAAxkBAAMUZZwjrrQXHGOwuYDcFn1mVXpiQwMAAlXbMRuQVuBIWXoqAZYwUFgBAAMCAAN5AAM0BA';
        await bot.editMessageMedia({
            type: 'photo',
            media: img,
            caption: EDIT_PROFILE_CAPTION,
        }, {
            chat_id: callbackQuery.message.chat.id,
            message_id: callbackQuery.message.message_id
        });
        userStates[callbackQuery.from.id] = 'wait_for_profile_edit';
    }
});

bot.on('message', async (msg) => {
    if (userStates[msg.from.id] === 'wait_for_profile_edit') {
        const newImg = msg.photo && msg.photo.length > 0 ? msg.photo[0].file_id : '';

        if (newImg) {
            if (await updateScreenContent('personal_profile', 'img_id', newImg)) {
                await bot.sendMessage(msg.chat.id, 'Фотография раздела сохранена.');
            } else {
                await bot.sendMessage(msg.chat.id, 'Произошла ошибка при обновлении фотографии, попробуйте позже.');
            }
        }

        delete userStates[msg.from.id];
    }
});