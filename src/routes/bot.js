const showMenu = require("./menus");
const getCryptoApi = require("./utils");

const Markup = require("telegraf/markup");
module.exports = (bot) => {
  const texto = (
    msg
  ) => `Welcome ${msg.from.username} to CYCLOS 💰
      
      note:just call /woof `;

  const keyboard = [
    [
      new Markup().urlButton(
        "Market id",
        "CwK9brJ43MR4BJz2dwnDM7EXCNyHhGqCJDrAdsEts8n5"
     ),
     new Markup().urlButton(
        "Mint token",
        "9nEqaUcb16sQ3Tn1psbkWqyhPdLmfHWjKGymREjsAgTE"
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
