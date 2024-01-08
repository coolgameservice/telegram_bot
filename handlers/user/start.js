const axios = require("axios");
const config = require("../../data/config.js");
const keyboards = require("../../keyboards.js");
const { getStartKeyboard } = require("../../functions/defaultKeyboard.js");
const { fetchSectionInfo } = require("../../functions/fetchSectionInfo.js");
const { checkUserBanned } = require("../../functions/checkUserAccess.js");
const { get_connection } = require("../../functions/dbConnection.js");
const { bot } = require("../../loader.js");

bot.onText(/\/start(.*)/, async (msg, match) => {
  const userId = msg.from.id;
  const startInfo = await fetchSectionInfo("start");
  let caption = startInfo.content;
  let replyMarkup = getStartKeyboard(userId);
  const args = match[1].trim();

  if (await checkUserBanned(userId)) {
    replyMarkup = keyboards.StartKeyboardForBannedUser.keyboard;
  } else if (args) {
    const status = await initUserInBot(args, userId, msg.from.username);
    if (!status) {
      caption = "Ошибка привязки. Попробуй еще раз";
      replyMarkup = keyboards.InnerKeyboard.keyboard;
    }
  }

  await bot.sendPhoto(userId, startInfo.img_id, {
    caption: caption,
    reply_markup: replyMarkup,
  });
});

bot.on("callback_query", async (callbackQuery) => {
  if (callbackQuery.data === "start") {
    const userId = callbackQuery.from.id;
    const userBanned = await checkUserBanned(userId);
    const replyMarkup = userBanned
      ? keyboards.StartKeyboardForBannedUser.keyboard
      : getStartKeyboard(userId);
    const startInfo = await fetchSectionInfo("start");

    await bot.editMessageMedia(
      {
        type: "photo",
        media: startInfo.img_id,
        caption: startInfo.content,
      },
      {
        chat_id: callbackQuery.message.chat.id,
        message_id: callbackQuery.message.message_id,
        reply_markup: replyMarkup,
      }
    );
  }
});

function upsertUserData(userData, userId) {
  const connection = get_connection();
  const queryInsert =
    "INSERT INTO users(username, email, telegram_id) VALUES (?, ?, ?)";
  const queryUpdate =
    "UPDATE users SET username = ?, email = ? WHERE telegram_id = ?";
  const selectQuery = "SELECT 1 FROM users WHERE telegram_id = ? LIMIT 1";

  return new Promise((resolve, reject) => {
    connection.query(selectQuery, [userId], (error, results) => {
      if (error) {
        console.error(`Database operation failed: ${error}`);
        connection.end();
        reject(false);
      } else if (results.length === 0) {
        connection.query(
          queryInsert,
          [userData.username, userData.email, userId],
          (error) => {
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
          }
        );
      } else {
        connection.query(
          queryUpdate,
          [userData.username, userData.email, userId],
          (error) => {
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
          }
        );
      }
    });
  });
}

async function initUserInBot(userToken, userId, userName) {
  const body = { user_token: userToken, user_name: userName };

  try {
    const response = await axios.post(config.WEBSITE_WEBHOOK_URL, body);

    if (response.status !== 200) {
      console.error(`Failed to get user data: ${response.statusText}`);
      return false;
    }

    const userData = response.data;
    return userData && (await upsertUserData(userData, userId));
  } catch (error) {
    console.error(`Request failed: ${error}`);
    return false;
  }
}
