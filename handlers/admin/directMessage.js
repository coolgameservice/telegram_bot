const { bot } = require('../../loader');
const config = require('../../data/config');

bot.onText(/\/direct (.+)/, async (msg, match) => {
    const userId = msg.from.id;
    const isAdmin = config.ADMINS.includes(String(userId));
    const args = match[1].trim().split(' ');

    if (!isAdmin) {
        return;
    }

    if (args.length >= 2) {
        const chatId = args[0];
        args.shift();
        const answer = args.join(' ');

        await bot.sendMessage(msg.chat.id, '✅ Вы успешно отправили сообщение пользователю!');
        await bot.sendMessage(chatId, `✉ Новое уведомление!\nСообщение от тех.поддержки:\n\n${answer}`, {
            parse_mode: 'Markdown'
        });
    } else {
        await bot.sendMessage(msg.chat.id, '⚠ Укажите аргументы команды\nПример: `/direct 516712732 Ваш ответ`', {
            parse_mode: 'Markdown'
        });
    }
});