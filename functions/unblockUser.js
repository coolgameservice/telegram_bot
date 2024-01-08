const { get_connection } = require('./dbConnection');

function unblockUserDb(userId) {
    const connection = get_connection();
    const queryUpdate = 'UPDATE users SET banned = ? WHERE telegram_id = ?';
    const selectQuery = 'SELECT 1 FROM users WHERE telegram_id = ? LIMIT 1';

    return new Promise((resolve, reject) => {
        connection.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error(`Database operation failed: ${error}`);
                connection.end();
                reject(false);
            } else if (results.length > 0) {
                // User exists, update their banned status
                connection.query(queryUpdate, [0, userId], (error) => {
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
            } else {
                connection.end();
                resolve(true);
            }
        });
    });
}

module.exports = { unblockUserDb };
