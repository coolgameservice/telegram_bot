const mysql = require('mysql2');
const { get_connection } = require('./dbConnection');

async function updateScreenContent(section, field, value) {
    if (!field) return false;

    const connection = get_connection();
    const queryUpdate = `UPDATE screen_contents SET ${mysql.escapeId(field)} = ? WHERE name = ?`;

    return new Promise((resolve, reject) => {
        connection.query(queryUpdate, [value.trim(), section], (error, results) => {
            if (error) {
                console.error(`Database operation failed: ${error}`);
                connection.end();
                reject(false);
            } else {
                connection.commit(() => {
                    connection.end();
                    resolve(true);
                });
            }
        });
    });
}

module.exports = { updateScreenContent };
