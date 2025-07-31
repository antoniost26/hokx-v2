const { Client, Message } = require("discord.js");
require("dotenv").config();
const processPrivate = require("../../process/processPrivate");

/**
 *
 * @param {Client} client
 * @param {Message} message
 */
module.exports = async (client, message) => {
  if (!["346361502196039681", "1083784114559258644"].includes(message.author.id))
    return;
  if (!message.content.startsWith("h-private")) return;
  let replyMessage = await processPrivate(client, message);
  message.reply(replyMessage);
};
