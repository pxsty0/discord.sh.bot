module.exports = function (message, status, db) {
  const { MessageEmbed } = require("discord.js");
  if (message.author.id != "571041849326698496")
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setTitle("PxServ | Üst Seviye Yetki Gerektiren Komut"),
      ],
    });
  if (status == true) {
    if (!message.mentions.members.first())
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTitle("PxServ | Lütfen Birini Etiketle"),
        ],
      });
    db.push("authorized", { id: message.mentions.members.first().user.id });
    const embed = new MessageEmbed();
    embed.setColor("BLUE");
    embed.setTitle("PxServ | :white_check_mark: Yetki Başarıyla Atandı");
    message.channel.send({ embeds: [embed] });
  } else if (status == "list") {
    let msg = "";
    db.get("authorized").forEach((item) => {
      msg += item.id + "\n";
    });
    const embed = new MessageEmbed();
    embed.setColor("BLUE");
    embed.setTitle("PxServ | Yetkili Listesi");
    embed.setDescription(msg);
    message.channel.send({ embeds: [embed] });
  } else {
    if (message.author.id != "571041849326698496")
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTitle("PxServ | Bu Komut İçin Üst Seviye Yetki Gerekir"),
        ],
      });
    if (!message.mentions.members.first())
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor("RED")
            .setTitle("PxServ | Lütfen Birini Etiketle"),
        ],
      });
    let newarr = [];
    db.get("authorized").forEach((item) => {
      if (item.id != message.mentions.members.first().user.id) {
        newarr.push({ id: item.id });
      }
    });
    db.set("authorized", newarr);
    const embed = new MessageEmbed();
    embed.setColor("BLUE");
    embed.setTitle("PxServ | :white_check_mark: Yetki Başarıyla Alındı");
    message.channel.send({ embeds: [embed] });
  }
};
