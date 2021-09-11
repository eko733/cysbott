const showMenu = require("./menus");
const getCryptoApi = require("./utils");

const Markup = require("telegraf/markup");
module.exports = (bot) => {
  const texto = (
    msg
  ) => `Welcome ${msg.from.username} to CYCLOS 💰
      
      note:just call /CYS `;

  const keyboard = [
    [
      new Markup().urlButton(
        "discord",
        "https://discord.gg/Fz6SC4CB"
     ),
     new Markup().urlButton(
        "Twitter",
        "https://twitter.com/cyclosfi"
      ),
new Markup().urlButton(
        "Website",
        "https://cyclos.io"
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
      msg.reply(await getCryptoApi(msg.message.text.replace("/ ", "")), {
        reply_markup: new Markup().inlineKeyboard(keyboard),
        parse_mode: "Html",
      });
    }
  });
};
