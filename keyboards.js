const finishEditCallback = "finish_edit";
const finishSupportCallback = "finish_support";

class StartKeyboard {
  static get keyboard() {
    return {
      inline_keyboard: [
        [
          { text: "Магазин", url: "https://coolgameservice.com/shop/" },
          { text: "Личный кабинет", callback_data: "personal_profile" },
        ],
        [
          { text: "FAQ", callback_data: "faq" },
          { text: "Поддержка", callback_data: "support" },
        ],
      ],
    };
  }
}

class StartKeyboardForBannedUser {
  static get keyboard() {
    return {
      inline_keyboard: [
        [
          { text: "Магазин", url: "https://coolgameservice.com/shop/" },
          { text: "Личный кабинет", callback_data: "personal_profile" },
          { text: "FAQ", callback_data: "faq" },
        ],
      ],
    };
  }
}

class InnerKeyboard {
  static get keyboard() {
    return {
      inline_keyboard: [[{ text: "назад", callback_data: "start" }]],
    };
  }
}

class AdminKeyboard {
  static get keyboard() {
    let keyboard = JSON.parse(JSON.stringify(StartKeyboard.keyboard));
    keyboard.inline_keyboard.push([
      { text: "Админка бота", callback_data: "bot_admin" },
    ]);
    return keyboard;
  }
}

class FinishEditingKeyboard {
  static get keyboard() {
    return {
      inline_keyboard: [
        [
          {
            text: "Закончить редактирование",
            callback_data: finishEditCallback,
          },
        ],
      ],
    };
  }
}

class FinishSupportKeyboard {
  static get keyboard() {
    return {
      inline_keyboard: [
        [{ text: "назад", callback_data: finishSupportCallback }],
      ],
    };
  }
}

class AdminEditKeyboard {
  static get keyboard() {
    return {
      inline_keyboard: [
        [
          { text: "FAQ", callback_data: "edit_faq" },
          {
            text: "Картинка в личном кабинете",
            callback_data: "edit_personal_profile",
          },
        ],
        [{ text: "Поддержка", callback_data: "edit_support" }],
        [{ text: "Главная Страница", callback_data: "edit_start" }],
        [{ text: "назад", callback_data: "start" }],
      ],
    };
  }
}

module.exports = {
  StartKeyboard,
  StartKeyboardForBannedUser,
  InnerKeyboard,
  AdminKeyboard,
  FinishEditingKeyboard,
  FinishSupportKeyboard,
  AdminEditKeyboard,
};
