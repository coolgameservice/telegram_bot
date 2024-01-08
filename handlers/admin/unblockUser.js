const { bot } = require('../../loader');
const config = require('../../data/config');
const { unblockUserDb  } = require('../../functions/unblockUser');

bot.onText(/\/unblock (.+)/, async (msg, match) => {
    const userId = msg.from.id;
    const isAdmin = config.ADMINS.includes(String(userId));
    const args = match[1].trim().split(' ');

    if (!isAdmin) {
        return;
    }

    if (args.length >= 1) {
        const userToUnblockId = args[0];
        if (await unblockUserDb(userToUnblockId)) {
            await bot.sendMessage(msg.chat.id, `✅ Пользователь с ID: ${userToUnblockId} разблокирован.`);
            await bot.sendMessage(userToUnblockId, '✅ Вы были разблокированы. Вам снова доступен весь функционал бота.');
        } else {
            await bot.sendMessage(msg.chat.id, 'Произошла ошибка при работе с базой данных, попробуйте позже.');
        }
    } else {
        await bot.sendMessage(msg.chat.id, '⚠ Укажите аргументы команды\nПример: `/unblock 516712732`', { parse_mode: 'Markdown' });
    }
});