const config = require('../data/config.js');
const keyboards = require('../keyboards');

function getStartKeyboard(userId) {
    if (config.ADMINS.includes(String(userId))) {
        return keyboards.AdminKeyboard.keyboard;
    } else {
        return keyboards.StartKeyboard.keyboard;
    }
}

module.exports = { getStartKeyboard };
