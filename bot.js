const { createTables } = require('./functions/dbSetup');
const { setDefaultCommands } = require('./utils/setBotCommands');
const bot = require('./loader').bot;
require('./handlers/user');
require('./handlers/admin');

const startServer = async () => {
    await createTables();
    await setDefaultCommands(bot);
};

startServer();
