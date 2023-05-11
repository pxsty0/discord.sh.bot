module.exports = function (message, uptime) {
  const { MessageEmbed } = require("discord.js");
  const si = require("systeminformation");
  const checkDiskSpace = require("check-disk-space").default;
  function fbyte(bytes) {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + " GB";
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes > 1) {
      bytes = bytes + " bytes";
    } else if (bytes == 1) {
      bytes = bytes + " byte";
    } else {
      bytes = "0 bytes";
    }
    return bytes;
  }
  function dhm(t) {
    var cd = 24 * 60 * 60 * 1000,
      ch = 60 * 60 * 1000,
      d = Math.floor(t / cd),
      h = Math.floor((t - d * cd) / ch),
      m = Math.round((t - d * cd - h * ch) / 60000),
      pad = function (n) {
        return n < 10 ? "0" + n : n;
      };
    if (m === 60) {
      h++;
      m = 0;
    }
    if (h === 24) {
      d++;
      h = 0;
    }
    return `${d} Gün ${pad(h)} Saat ${pad(m)} Dakika`;
  }
  si.mem().then((mem) => {
    si.cpuTemperature().then((cpu) => {
      checkDiskSpace("/").then((diskSpace) => {
        const embed = new MessageEmbed();
        embed.setColor("RANDOM");
        embed.setTitle("PxServ | 🛠️ Sunucu Durumu");
        embed.setDescription(
          ":cd: RAM : `" +
            fbyte(mem.used) +
            " / " +
            fbyte(mem.total) +
            "`\n:heart_on_fire: Sıcaklık : `" +
            cpu.main +
            "`\n:floppy_disk: Hafıza : `" +
            fbyte(diskSpace.size - diskSpace.free) +
            " / " +
            fbyte(diskSpace.size) +
            "`\n:timer: Uptime : `" +
            dhm(uptime) +
            "`"
        );
        // embed.setDescription(` \`\`RAM : ${fbyte(mem.used)} / ${fbyte(mem.total)} | Sıcaklık : ${cpu.main}
        // Hafıza : ${fbyte((diskSpace.size)-(diskSpace.free))} / ${fbyte(diskSpace.size)}\`\` `)
        embed.setFooter({ text: "pxserv.net" });

        message.channel.send({ embeds: [embed] });
      });
    });
  });
};
