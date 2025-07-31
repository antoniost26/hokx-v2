const { Client, Message } = require("discord.js");
require("dotenv").config();
const { ranksArray } = require("../../../config.json");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  return;
  // if (message.author.id != "535898109184573451") return;
  // if (!message.content.startsWith("h-deroll")) return;
  // let guild = await client.guilds.fetch(process.env.GUILD_ID);
  // guildMembers = await guild.members.fetch();
  // guildMembers.forEach(async (member) => {
  //   let roles = member.roles.cache.filter(
  //     (role) => !ranksArray.includes(role.id)
  //   );
  //   if (member.id != "1172621034004959433") member.roles.set(roles);
  // });
};
