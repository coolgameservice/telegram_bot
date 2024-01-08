const { get_connection } = require('./dbConnection');

function createTables() {
    const connection = get_connection();
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            telegram_id INT,
            banned INT NOT NULL DEFAULT 0
        ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    const createContentsTable = `
        CREATE TABLE IF NOT EXISTS screen_contents (
            id INT AUTO_INCREMENT PRIMARY KEY,
            content VARCHAR(2000),
            name VARCHAR(255) NOT NULL,
            img_id VARCHAR(255)
        ) DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    return new Promise((resolve, reject) => {
        if (connection) {
            connection.query(createUsersTable, (error) => {
                if (error) {
                    console.error(`Table creation failed: ${error}`);
                    connection.end();
                    reject(false);
                } else {
                    connection.query(createContentsTable, (error) => {
                        if (error) {
                            console.error(`Table creation failed: ${error}`);
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
        } else {
            reject(false);
        }
    });
}

module.exports = { createTables };
