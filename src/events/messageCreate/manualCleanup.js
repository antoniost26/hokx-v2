const { Client, Message } = require("discord.js");
const cleanUpRoles = require("../../process/cleanUpRoles");
require("dotenv").config();

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!["346361502196039681", "535898109184573451"].includes(message.author.id))
    return;
  if (!message.content.startsWith("h-cleanup")) return;
  let replyMessage = await cleanUpRoles(client, message);
  message.reply(replyMessage);
};
