const mysql = require('mysql2');
const config = require('../data/config');

function get_connection() {
    let connection = null;

    try {
        connection = mysql.createConnection({
            host: config.DB_HOST,
            port: config.DB_PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME
        });
    } catch (e) {
        console.error(e);
    }

    return connection;
}

module.exports = { get_connection };
