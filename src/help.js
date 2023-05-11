module.exports = function (message, status) {
  const { MessageEmbed } = require("discord.js");

  const embed = new MessageEmbed();
  embed.setColor("RANDOM");
  embed.setTitle("PxServ | 📖 Yardım Menüsü");
  embed.setDescription(
    "```p!fan aç/kapat : Sunucunun Fanını Açıp Kapatır\np!fan durum : Fan Durumu Hakkında Bilgi Verir\np!run <komut> : Girilen Komutu Terminalde Çalıştırır\np!durum : Sunucunun Durumu Hakkında Bilgi Verir\np!yetki ver/al <etiket> : Yetki İşlemlerini Gerçekleştirir\np!yetki liste : Yetkili Kullanıcıların Listesini Yollar```"
  );
  embed.setFooter({ text: "pxserv.net" });

  message.channel.send({ embeds: [embed] });
};
