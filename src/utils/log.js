require("dotenv").config();
const { Guild, inlineCode } = require("discord.js");

/**
 *
 * @param {Guild} guild
 * @param {string} action
 * @param {string} memberId
 * @param {string} roleName
 * @param {string} trace
 */
module.exports = async (
  guild,
  action,
  memberId = null,
  roleName = null,
  trace = null
) => {
  guild.channels
    .fetch(process.env.LOGGING_CHANNEL_ID)
    .then((channel) => {
      channel.send({
        embeds: [
          action == "error"
            ? {
                color: 0xff0000,
                title: ``,
                fields: [
                  {
                    name: `**Error**`,
                    value: `` + trace,
                  },
                ],
              }
            : {
                color: action == "add" ? 0x008000 : 0xff0000,
                title: ``,
                fields: [
                  {
                    name: ``,
                    value:
                      action == "not found"
                        ? "Couldn't find **{0}** to assign role **{1}** to."
                            .replace("{0}", memberId)
                            .replace("{1}", roleName)
                        : "Updated roles for <@" + memberId + ">",
                  },
                  {
                    name: ``,
                    value:
                      action == "not found"
                        ? ``
                        : `${action.charAt(0).toUpperCase() + action.slice(1)}${
                            action == "remove" ? "d role" : "ed role"
                          } ${inlineCode(roleName)}`,
                  },
                ],
              },
        ],
      });
    })
    .catch(console.log);
};
