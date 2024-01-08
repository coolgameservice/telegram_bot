const { get_connection } = require('./dbConnection');

async function banUserDb(userId) {
    const connection = get_connection();
    const queryInsert = 'INSERT INTO users(telegram_id, banned) VALUES (?, ?)';
    const queryUpdate = 'UPDATE users SET banned = ? WHERE telegram_id = ?';
    const selectQuery = 'SELECT 1 FROM users WHERE telegram_id = ? LIMIT 1';

    return new Promise((resolve, reject) => {
        connection.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error(`Database operation failed: ${error}`);
                connection.end();
                reject(false);
            } else if (results.length === 0) {
                // User does not exist, insert new user
                connection.query(queryInsert, [userId, 1], (error) => {
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
                // User exists, update existing user
                connection.query(queryUpdate, [1, userId], (error) => {
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
            }
        });
    });
}

module.exports = { banUserDb };
