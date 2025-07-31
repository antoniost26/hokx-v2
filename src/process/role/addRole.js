const { Guild, GuildMember, Role } = require("discord.js");
const log = require("../../utils/log");

/**
 *
 * @param {GuildMember} member
 * @param {Role} role
 */
module.exports = async (member, role) => {
  await member.roles.add(role);
  log(member.guild, "add", member.id, role.name);
};
