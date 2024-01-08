require('dotenv').config();

const GROUP_ID = process.env.GROUP_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMINS = process.env.ADMINS ? process.env.ADMINS.split(',') : [];
const IP = process.env.IP;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = parseInt(process.env.DB_PORT, 10);
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const WEBSITE_WEBHOOK_URL = process.env.WEBSITE_WEBHOOK_URL;

module.exports = {
    GROUP_ID,
    BOT_TOKEN,
    ADMINS,
    IP,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    WEBSITE_WEBHOOK_URL
};
