module.exports = function (message, db) {
  const { exec } = require("child_process");
  const { MessageEmbed, MessageAttachment } = require("discord.js");
  const fs = require("fs");

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

  let args = "";
  message.content.split(" ").forEach((item, index) => {
    if (index == 0) return;
    args += item + " ";
  });
  fs.lstat(
    "/home/pxservnode0/" + message.author.id + "/",
    function (err, stats) {
      if (!err && stats.isDirectory()) {
        if (!args)
          return message.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor("RED")
                .setTitle("PxServ | Geçersiz Komut"),
            ],
          });

        exec(
          args,
          { cwd: "/home/pxservnode0/" + message.author.id },
          (error, stdout, stderr) => {
            const embed = new MessageEmbed();
            if (error) {
              embed.setColor("RED");
              embed.setTitle(
                "PxServ | Komut Çalıştırılırken Bir Hata Meydana Geldi"
              );
              embed.setDescription("```" + error + "```");
              message.channel.send({ embeds: [embed] });
              return;
            }
            if (stderr) {
              embed.setColor("RED");
              embed.setTitle(
                "PxServ | Komut Çalıştırılırken Bir Hata Meydana Geldi"
              );
              embed.setDescription("```" + stderr + "```");
              message.channel.send({ embeds: [embed] });
              return;
            }
            if (stdout.length > 6000) {
              embed.setColor("GREEN");
              embed.setTitle("PxServ | Komut Başarıyla Çalıştırıldı");
              embed.setDescription(
                "Karakter Sınırı Sebebiyle Sonuç Dosya Olarak Gönderildi"
              );
              let content = stdout;
              let atc = new MessageAttachment(
                Buffer.from(content),
                "sonuc.txt"
              );
              message.channel.send({ embeds: [embed] });
              message.channel.send({ files: [atc] });
            } else {
              embed.setColor("GREEN");
              embed.setTitle("PxServ | Komut Başarıyla Çalıştırıldı");
              embed.setDescription("```" + stdout + "```");
              message.channel.send({ embeds: [embed] });
            }
          }
        );
      } else {
        fs.mkdir("/home/pxservnode0/" + message.author.id + "/", function () {
          message.channel.send({
            embeds: [
              new MessageEmbed()
                .setColor("GREEN")
                .setTitle(
                  "PxServ | Terminale Hoşgeldiniz Tüm Ayarlamalar Otomatik Olarak Yapılmıştır Lütfen Komutu Tekrar Deneyiniz"
                ),
            ],
          });
        });
      }
    }
  );
};
