const { Client, Message } = require("discord.js");
const veteranRanks = require("../../process/veteranRanks");
require("dotenv").config();

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!["346361502196039681", "1083784114559258644"].includes(message.author.id))
    return;
  if (!message.content.startsWith("h-veteran")) return;
  let replyMessage = await veteranRanks(client, message);
  message.reply(replyMessage);
};
