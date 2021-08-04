const showMenu = require("./menus");
const getCryptoApi = require("./utils");

const Markup = require("telegraf/markup");
module.exports = (bot) => {
  const texto = (
    msg
  ) => `Welcome ${msg.from.username} to BORING PROTOCOL❤️ this bot! created by AXELLAB
      
      note:just call /bop `;

  const keyboard = [
    [
      new Markup().urlButton(
        "discord boring protocol",
        "discord.gg/boringprotocol"
      ),
    ],
  ];

  bot.start((msg) =>
    msg.replyWithHTML(texto(msg), { disable_web_page_preview: true })
  );
  bot.catch((err, msg) => {
    msg.reply("");
    console.log(err);
  });
  bot.use(showMenu.init());
  bot.on("text", async (msg) => {
    if (msg.message.entities[0].type === "bot_command") {
      msg.reply(await getCryptoApi(msg.message.text.replace("/p ", "")), {
        reply_markup: new Markup().inlineKeyboard(keyboard),
        parse_mode: "Html",
      });
    }
  });
};
