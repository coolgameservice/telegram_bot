const { get_connection } = require('./dbConnection');

function fetchSectionInfo(sectionName) {
    const connection = get_connection();
    const selectQuery = 'SELECT content, img_id FROM screen_contents WHERE name = ? LIMIT 1';

    return new Promise((resolve, reject) => {
        connection.query(selectQuery, [sectionName], (error, results) => {
            if (error) {
                console.error(`Database operation failed: ${error}`);
                connection.end();
                reject(error);
            } else {
                connection.end();
                resolve(results[0] || {});
            }
        });
    });
}

module.exports = { fetchSectionInfo };
