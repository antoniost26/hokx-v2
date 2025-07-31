const { Client, Message } = require("discord.js");
const { ranksArray, allyRanks, veteranRanks, veteranRanksMap } = require("../../config.json");
const assignRole = require("./role/addRole");
const removeRole = require("./role/removeRole");
const {
  getGuildMembers,
  getGuildRoles,
} = require("../utils/updateCache");
const addRole = require("./role/addRole");
require("dotenv").config();
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

async function processGuildMembers() {
  guildMembers.forEach( (guildMember) => {
    try{
      if (guildMember?.roles.cache.some(                 // checks if any private rank -> processing \ no private rank -> skip
        (role) => ranksArray.includes(role.id)
      )) {
      
      let roleToAssign = null;
      roleToAssign = getRoleName(guildMember);

      cleanVeteranRoles(guildMember, roleToAssign.id);

      assignRole(guildMember, roleToAssign);
      checkAndAddVeteran(guildMember);
      } else {
        throw new Error("No Veteran");
      }
    } catch(err) {
      console.log(err.message)
      if (err.message != "No Veteran" || !err.message) return; // if req met or have role -> no action

      if (guildMember.roles.cache.some((role) => Object.keys(veteranRanks).map(function (key) { // checks if veteran rank already exists -> remove all veteran roles
        return veteranRanks[key];
      }).includes(role.id))) {
        cleanAllVeteranRoles(guildMember)
      }
    }
    
  })
}

function getRoleName(guildMember) {
  let existingVeteranRole = null;
  if (!guildMember.roles.cache.some((role) => Object.keys(allyRanks).map((key) => allyRanks[key]).includes(role.id))) throw new Error("No Veteran"); // checks if any ally 40+ rank -> continues to find role \ otherwise throws error
  if (guildMember.roles.cache.some((role) => Object.keys(veteranRanks).map(function (key) { // checks if veteran rank already exists -> saves the role in a variable \ variable is null otherwise
    return veteranRanks[key];
  }).includes(role.id))
  ) guildMember.roles.cache.forEach((role) => {
    if (Object.keys(veteranRanks).map(function (key) {
      return veteranRanks[key];
    }).includes(role.id))
      existingVeteranRole = role;
  })

  let roleToAssign = calculateRank(guildMember);

  if (!roleToAssign) throw new Error("No Veteran"); // fail-safe if no rank can be attributed

  if (existingVeteranRole == roleToAssign) throw new Error("Already Veteran");

  return roleToAssign;
}


function calculateRank(guildMember) {
  let roleToAssign = null;
  guildMember.roles.cache.reverse().forEach((role) => {
    if (Object.keys(allyRanks).map(function (key) {
      return allyRanks[key];
    }).includes(role.id)){
      if (!roleToAssign) roleToAssign = roles.get(veteranRanksMap[role.id]); // fail-safe if double ally ranks
    }
  }
  )
  return roleToAssign
}

function cleanVeteranRoles(guildMember, veteranRankId) {
  Object.keys(veteranRanks).map((key) => veteranRanks[key]).filter((roleId) => roleId != veteranRanks.Veteran).forEach((rankId) => {
    let role = roles.get(rankId)
    if (role.id == veteranRankId) return; // if already having the role, don't remove

    if (guildMember?.roles.cache.some((_role) => _role.id == role.id))
      removeRole(guildMember, role)
  })
}

function cleanAllVeteranRoles(guildMember) {
  Object.keys(veteranRanks).map((key) => veteranRanks[key]).forEach((rankId) => {
    let role = roles.get(rankId)
    if (guildMember?.roles.cache.some((_role) => _role.id == role.id))
      removeRole(guildMember, role)
  })
}

function checkAndAddVeteran(guildMember) {
  if (guildMember?.roles.cache.some((role) => role.id == veteranRanks.Veteran)) return; // checks if already veteran rank -> skip \ add otherwise

  addRole(guildMember, roles.get(veteranRanks.Veteran));
}
/* 
guildMember.roles.forEach(async (role) => {
            if (Object.keys(allyRanks).map(function(key){
                return allyRanks[key];
            }).some((roleId) => roleId == role.id) && !guildMember.roles.cache.some((_role) => Object.keys(veteranRanks).map(function(key){
                return veteranRanks[key];
            }).includes(_role.id))) {
                allyRanks.forEach((allyRankId) => {
                    if(guildMember?.roles.cache.some(
                        (role) => role.id == allyRankId)
                      )
                      assignRole(guildMember, roles.get(veteranRanksMap[allyRankId]))
                }) 
        }})
*/