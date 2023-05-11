const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const ms = require("ms");
const { JsonDatabase } = require("wio.db");

const db = new JsonDatabase({
  databasePath: "database.json",
});

let uptime = 0;
if (db.has("uptime") == true) {
  uptime += db.get("uptime");
}
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`✨ PxServ | p!help`);
  setInterval(function () {
    uptime += 2500;
    db.add("uptime", 2500);
  }, 2500);
  if (db.has("authorized") == false) {
    db.set("authorized", []);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "pxsty") {
    await interaction.reply("Pxstye taşak yetmez valla");
  }
});

client.on("messageCreate", async (message) => {
  if (message.content == "p!fan aç")
    return require("./src/fan")(message, true, db);
  if (message.content == "p!fan kapat")
    return require("./src/fan")(message, false, db);
  if (message.content.startsWith("p!run"))
    return require("./src/exec")(message, db);
  if (message.content == "p!yardım") return require("./src/help")(message, db);
  if (message.content == "p!help") return require("./src/help")(message, db);
  if (message.content == "p!fan durum")
    return require("./src/fan")(message, "durum", db);
  if (message.content == "p!durum")
    return require("./src/status")(message, uptime, db);

  if (message.content.startsWith("p!yetki ver"))
    return require("./src/authorized")(message, true, db);
  if (message.content.startsWith("p!yetki al"))
    return require("./src/authorized")(message, false, db);
  if (message.content == "p!yetki liste")
    return require("./src/authorized")(message, "list", db);
});
client.login(""); // bot token
