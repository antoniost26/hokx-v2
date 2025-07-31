const { ranksArray } = require("../../config.json");
const removeRole = require("./role/removeRole");
const {
  getClanMembers,
  getGuildMembers,
  getGuildRoles,
} = require("../utils/updateCache");

let clanMembers;
let guildMembers;
let roles;

/**
 *
 * @param {Array} clanMembers
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
    await processCleanup();
    returnMessage = `Action processed successfully.`;
  } catch (error) {
    returnMessage = `Action failed: ${error}`;
  } finally {
    return returnMessage;
  }
};

function IsClanMember(guildMember) {
  let boolIsClanMember = false;
  clanMembers.forEach((clanMember) => {
    if (
      guildMember?.displayName
        ?.toLowerCase()
        .includes(clanMember.account_name.toLowerCase()) ||
      guildMember?.globalName
        ?.toLowerCase()
        .includes(clanMember.account_name.toLowerCase())
    )
      boolIsClanMember = true;
  });
  return boolIsClanMember;
}

async function processCleanup() {
  guildMembers.forEach(async (guildMember) => {
    // console.log(guildMember.id + " -> " + IsClanMember(guildMember));
    if (IsClanMember(guildMember)) return;

    ranksArray.forEach((roleId) => {
      if (guildMember.roles.cache.some((role) => role.id === roleId))
        removeRole(guildMember, roles.get(roleId));
    });
  });
}
