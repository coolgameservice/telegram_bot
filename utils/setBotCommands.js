async function setDefaultCommands(bot) {
    await bot.setMyCommands([
        { command: 'start', description: 'Вернуться в главное меню' }
    ]);
}

module.exports = { setDefaultCommands };