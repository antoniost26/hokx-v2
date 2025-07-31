const { Guild } = require("discord.js");
const { announcementChannel } = require("../../config.json");

/**
 *
 * @param {Guild} guild
 * @param {JSON} data
 */
module.exports = async (guild, data) => {
  if (!data.accountId) return;
  await guild.channels
    .fetch(announcementChannel)
    .then((channel) => {
      channel.send({
        content: `<@${data.accountId}>`,
        embeds: [
          {
            color: 0x39ff14,
            title: ``,
            fields: [
              {
                name: ``,
                value:
                  "🎉 Congrats on your **{0}** **days** with Hokx clan! Your dedication is recognized, and you're being promoted to <@&{1}>! 🏅"
                    .replace("{0}", data.daysInClan)
                    .replace("{1}", data.roleId),
              },
            ],
          },
        ],
      });
    })
    .catch(console.log);
};
