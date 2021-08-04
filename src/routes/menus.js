const TelegrafInlineMenu = require("telegraf-inline-menu");
const cryptos = require("../config/cryptoObject");
const getCryptoApi = require("./utils");
const Markup = require("telegraf/markup");

const showMenu = new TelegrafInlineMenu(
  `boring protocol bot price`
);
const listCrypto = new TelegrafInlineMenu("Your coin will show up here");

showMenu.submenu("Listar criptomoedas", "show_menu", listCrypto);

for (let crypto in cryptos) {
  listCrypto.simpleButton(
    `${crypto} - ${cryptos[crypto]}`,
    `crypto_menu_${crypto}`,
    {
      doFunc: async (msg) => {
        try {
          console.log(crypto);
          await msg.editMessageText(await getCryptoApi(crypto), {
            reply_markup: new Markup().inlineKeyboard(
              msg.callbackQuery.message.reply_markup.inline_keyboard
            ),
            parse_mode: "html",
          });
          //stop the eternal loading with callbackQuery
          await msg.answerCbQuery(`Price for ${crypto}`);
        } catch (e) {
          console.log(e);
        }
      },
    }
  );
}

listCrypto.simpleButton("Commands cryptocurrency", "link_criptocurrency", {
  doFunc: (msg) => {
    msg.reply("If its not in button, try the commands:", {
      reply_markup: new Markup().inlineKeyboard([
        [
          new Markup().urlButton(
            "Discord boringprotocol",
            "discord.gg/boringprotocol"
          ),
        ],
      ]),
    });
  },
});
showMenu.setCommand("discord");

module.exports = showMenu;
