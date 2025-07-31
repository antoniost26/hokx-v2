const { Client, Message } = require("discord.js");
const { ranks } = require("../../config.json");
const assignRole = require("./role/CheckAndAssign");
const {
  getClanMembers,
  getGuildMembers,
  getGuildRoles,
} = require("../utils/updateCache");

require("dotenv").config();
let clanMembers = [];
let guildMembers = [];
let roles = [];

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @returns
 */
module.exports = async (client, message = null) => {
  if (message != null) {
    message.reply("Processing request...").catch((error) => console.log(error));
    message.channel
      .send(
        `Logs for these actions can be found in <#${process.env.LOGGING_CHANNEL_ID}>`
      )
      .catch((error) => console.log(error));
  }

  let returnMessage = "";

  try {
    clanMembers = await getClanMembers();
    guildMembers = await getGuildMembers(client);
    roles = await getGuildRoles(client);
    await processGuildMembers();
    returnMessage = `Action processed successfully.`;
  } catch (error) {
    returnMessage = `Action failed: ${error}`;
  } finally {
    return returnMessage;
  }
};

/**
 *
 * @param {JSON} clanMember
 * @returns
 */
async function getRoleName(clanMember) {
  let roleName = "Recruit";
  Object.keys(ranks).forEach((day) => {
    if (
      parseInt(
        Math.floor(
          (Math.floor(Date.now() / 1000) - clanMember.joined_at) / 86400
        )
      ) -
        parseInt(day) >
      0
    )
      roleName = ranks[day];
  });
  return roleName;
}

/**
 *
 * @param {Client} client
 */
async function processGuildMembers(client) {
  clanMembers.forEach(async (clanMember) => {
    let roleName = await getRoleName(clanMember);
    await assignRole(client, guildMembers, roles, {
      accountName: clanMember.account_name,
      roleName: roleName,
      daysInClan: Math.floor(
        (Math.floor(Date.now() / 1000) - clanMember.joined_at) / 86400
      ).toString(),
    });
  });
}
