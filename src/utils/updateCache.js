require("dotenv").config();

/**
 *
 * @param {Client} client
 */
async function getGuildMembers(client) {
  let guild = await client.guilds.fetch(process.env.GUILD_ID);
  let guildMembers = await guild.members.fetch();
  return guildMembers;
}

async function getClanMembers() {
  let apiUrl = process.env.API_URL;
  const idClan = process.env.CLAN_ID;
  let clanMembers = [];

  await fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("API request failed");
      }
    })
    .then(async (data) => {
      clanMembers = data.data[idClan].members;
    });
  return clanMembers;
}

/**
 *
 * @param {Client} client
 */
async function getGuildRoles(client) {
  let guild = await client.guilds.fetch(process.env.GUILD_ID);
  let roles = await guild.roles.fetch();
  return roles;
}

module.exports = {
  getClanMembers: getClanMembers,
  getGuildMembers: getGuildMembers,
  getGuildRoles: getGuildRoles,
};
