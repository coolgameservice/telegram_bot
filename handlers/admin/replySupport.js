const { bot } = require('../../loader');
const config = require('../../data/config');

bot.on('message', async (msg) => {
    if (msg.reply_to_message && config.ADMINS.includes(String(msg.from.id))) {
        let userQuestion = '';
        let messageText = '';
        const replyToMessage = msg.reply_to_message;

        if (replyToMessage.text) {
            userQuestion = replyToMessage.text;
        } else if (replyToMessage.photo) {
            userQuestion = 'Фотография🖼';
            userQuestion += replyToMessage.caption ? `\nПодпись: ${replyToMessage.caption}` : '';
        }

        if (msg.text) {
            messageText = msg.text;
        } else if (msg.photo) {
            messageText = 'Фотография(смотреть ниже)⬇️';
        }

        const supportAnswer = `📨 Новое сообщение от тех. поддержки:\n\n❓Вопрос:\n<i>${userQuestion}</i>\n\n✅ Ответ:\n${messageText}`;
        if(msg?.reply_to_message.forward_from?.id) {
            await bot.sendMessage(msg.reply_to_message.forward_from.id, supportAnswer, { parse_mode: 'HTML' });
            
            if (msg.photo && msg.photo.length > 0) {
            await bot.sendPhoto(msg.chat.id, msg.photo[0].file_id, { caption: msg.caption });
            }

            await bot.sendMessage(msg.chat.id, "Ответ успешно отправлен.✉️");
        } else {
            await bot.sendMessage(msg.chat.id, "Аккаунт пользователя закрыт. Воспользуйтесь командой /direct, чтобы отправить ответ.");
        }
    }
});
