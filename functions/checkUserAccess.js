const { get_connection } = require('./dbConnection');

function checkUserBanned(userId) {
    const connection = get_connection();
    const selectQuery = 'SELECT banned FROM users WHERE telegram_id = ? LIMIT 1';

    return new Promise((resolve, reject) => {
        connection.query(selectQuery, [userId], (error, results) => {
            if (error) {
                console.error(`Database operation failed: ${error}`);
                connection.end();
                reject(false);
            } else {
                connection.end();
                if (results.length > 0 && results[0].banned === 1) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });
    });
}

module.exports = { checkUserBanned };
