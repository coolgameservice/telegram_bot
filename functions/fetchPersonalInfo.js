const { get_connection } = require('./dbConnection');

const PROFILE_NOT_EXIST = 'Ваш профиль не привязан.\nВы это можете сделать на https://coolgameservice.com/my-account/';

async function fetchPersonalInfo(userId) {
    const connection = get_connection();
    let personalInfoStr = '';

    return new Promise((resolve, reject) => {
        connection.query('SELECT username, email FROM users WHERE telegram_id = ? LIMIT 1', [userId], (error, results) => {
            if (error) {
                console.error(`Database operation failed: ${error}`);
                connection.end();
                reject(PROFILE_NOT_EXIST);
            } else {
                const userInfo = results[0];
                if (!userInfo || (!userInfo.username && !userInfo.email)) {
                    personalInfoStr = PROFILE_NOT_EXIST;
                } else {
                    personalInfoStr += userInfo.username ? `Имя: ${userInfo.username}\n` : 'Имя: [Не указано]\n';
                    personalInfoStr += `Email: ${userInfo.email || '[Не указано]'}`;
                }

                connection.end();
                resolve(personalInfoStr);
            }
        });
    });
}

module.exports = { fetchPersonalInfo };
