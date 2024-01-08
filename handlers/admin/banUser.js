const { bot } = require('../../loader');
const config = require('../../data/config');
const { banUserDb } = require('../../functions/banUser');

bot.onText(/\/ban (.+)/, async (msg, match) => {
    const userId = msg.from.id;
    const isAdmin = config.ADMINS.includes(String(userId));
    const args = match[1].trim().split(' ');

    if (!isAdmin) {
        return;
    }

    if (args.length >= 1) {
        const userToBanId = args[0];
        if (await banUserDb(userToBanId)) {
            await bot.sendMessage(msg.chat.id, `✅ Пользователь с ID: ${userToBanId} заблокирован.`);
            await bot.sendMessage(userToBanId, '🚫 Вы были забанены. Свяжитесь с админами, чтобы вас разблокировали.');
        } else {
            await bot.sendMessage(msg.chat.id, 'Произошла ошибка при работе с базой данных, попробуйте позже.');
        }
    } else {
        await bot.sendMessage(msg.chat.id, '⚠ Укажите аргументы команды\nПример: `/ban 516712732`', { parse_mode: 'Markdown' });
    }
});