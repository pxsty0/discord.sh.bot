module.exports = function (message, status, db) {
  const { exec } = require("child_process");
  const { MessageEmbed } = require("discord.js");
  if (message.author.id != "571041849326698496")
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setTitle("PxServ | Üst Seviye Yetki Gerektiren Komut"),
      ],
    });
  if (
    db
      .get("authorized")
      .map((a) => a.id)
      .includes(message.author.id) == false
  )
    return message.channel.send({
      embeds: [
        new MessageEmbed()
          .setColor("RED")
          .setTitle("PxServ | Bu Komut Yetki Gerekmektedir"),
      ],
    });

  if (status == true) {
    exec("raspi-gpio set 14 dh", (error, stdout, stderr) => {
      const embed = new MessageEmbed();
      embed.setColor("BLUE");
      embed.setTitle("PxServ | Fan Başarıyla Aktif Hale Getirildi");
      message.channel.send({ embeds: [embed] });
    });
  } else if (status == "durum") {
    exec("raspi-gpio get 14", (error, stdout, stderr) => {
      if (stdout.split(" ")[2].split("=")[1] == 0) {
        const embed = new MessageEmbed();
        embed.setColor("BLUE");
        embed.setTitle("PxServ | Fan Durumu");
        embed.setDescription("```Fan Kapalı Durumda```");
        message.channel.send({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed();
        embed.setColor("BLUE");
        embed.setTitle("PxServ | Fan Durumu");
        embed.setDescription("```Fan Açık Durumda```");
        message.channel.send({ embeds: [embed] });
      }
    });
  } else {
    exec("raspi-gpio set 14 dl", (error, stdout, stderr) => {
      const embed = new MessageEmbed();
      embed.setColor("BLUE");
      embed.setTitle("PxServ | Fan Başarıyla Kapalı Hale Getirildi");
      message.channel.send({ embeds: [embed] });
    });
  }
};
