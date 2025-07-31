require("dotenv").config();
const { rankIds, ranksArray, recruitRankId } = require("../../../config.json");
const { Client, GuildMember } = require("discord.js");
const removeRole = require("./removeRole.js");
const assignRole = require("./addRole.js");
const announcement = require("../../utils/announcement.js");

let roles;

/**
 *
 * @param {Client} client
 * @param {GuildMember} guildMembers
 * @param {JSON} processingData
 */
module.exports = async (client, guildMembers, _roles, processingData) => {
  if (!roles || roles != _roles) roles = _roles;

  let mapId = getMapId(guildMembers, processingData["accountName"]);
  if (!mapId) return;
  let guildMember = guildMembers.get(mapId);
  if (!guildMember) return;

  if (processingData["roleName"] === "Recruit") {
    removeRoles(ranksArray, guildMember);
    return;
  }

  // remove old ranks if any
  let rolesToBeRemovedArray = await getRolesFromRanksArray(processingData);
  if (guildMember.roles.cache.some((role) => role.id == recruitRankId)) rolesToBeRemovedArray.push(recruitRankId); // if member has recruit role -> add to be removed
  if (rolesToBeRemovedArray)
    await removeRoles(rolesToBeRemovedArray, guildMember);

  // asign roles
  await assignRoles(guildMember, processingData);
};

async function assignRoles(guildMember, processingData) {
  if (
    !guildMember?.roles.cache.some(
      (role) => role.id == rankIds[processingData["roleName"]]
    )
  ) {
    await assignRole(
      guildMember,
      roles.get(rankIds[processingData["roleName"]])
    );
    await announcement(guildMember.guild, {
      daysInClan: processingData["daysInClan"],
      roleId: rankIds[processingData["roleName"]],
      accountId: guildMember?.id,
    });
  }

  if (!guildMember?.roles.cache.some((role) => role.id == rankIds["Private"])) {
    await assignRole(guildMember, roles.get(rankIds["Private"]));
  }
}

/**
 *
 * @param {Map} guildMembers
 * @param {string} nameToSearch
 * @returns
 */
function getMapId(guildMembers, nameToSearch) {
  let mapId = "";
  guildMembers.forEach((guildMember) => {
    if (
      guildMember.displayName
        ?.toLowerCase()
        .includes(nameToSearch.toLowerCase()) ||
      guildMember.globalName?.toLowerCase().includes(nameToSearch.toLowerCase())
    )
      mapId = guildMember.user.id;
  });
  return mapId;
}

/**
 *
 * @param {Array} rolesArray
 * @param {GuildMember} guildMember
 */
async function removeRoles(rolesArray, guildMember) {
  rolesArray.forEach(async (role) => {
    if (guildMember?.roles.cache.some((_role) => _role.id == role)) {
      removeRole(guildMember, roles.get(role));
    }
  });
}

/**
 *
 * @param {JSON} processingData
 */
async function getRolesFromRanksArray(processingData) {
  return ranksArray.filter(
    (id) =>
      id != rankIds[processingData["roleName"]] && id != rankIds["Private"]
  );
}
/** 
  await guild.members
    .fetch({ query: processingData["accountName"], limit: 1 })
    .then(async (member) => {
      // check and remove old role
      ranksArray
        .filter(
          (id) =>
            id != rankIds[processingData["roleName"]] &&
            id != rankIds["Private"]
        )
        .forEach(async (roleId) => {
          if (member.first()?.roles.cache.some((role) => role.id == roleId)) {
            await removeRole(guild, member.first(), roleId);
          }
        });
      // check and assign correct role
      if (
        !member
          .first()
          ?.roles.cache.some(
            (role) => role.id == rankIds[processingData["roleName"]]
          )
      ) {
        await assignRole(
          guild,
          member.first(),
          rankIds[processingData["roleName"]],
          processingData["accountName"]
        );
        await announcement(guild, {
          daysInClan: processingData["daysInClan"],
          roleId: rankIds[processingData["roleName"]],
          accountId: member.first()?.id,
        });
      }
      // check and assign private role
      if (
        !member
          .first()
          ?.roles.cache.some((role) => role.id == rankIds["Private"])
      ) {
        await assignRole(guild, member.first(), rankIds["Private"]);
      }
    })
    .catch((error) => log(guild, "error", null, null, error));*/
