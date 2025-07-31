const { bold } = require("discord.js");
module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("test..")) return;
  await message.channel.send({
    content: "<@346361502196039681>",
    embeds: [
      {
        color: 0xff0000,
        title: ``,
        fields: [
          {
            name: ``,
            value:
              "🎉 Congrats on your **{0}** **days** with Hokx clan! Your dedication is recognized, and you're being promoted to <@&{1}}>! 🏅"
                .replace("{0}", "351")
                .replace("{1}", "1172644269811585115"),
            //   "<:test:1172890557186592830> You have been " +
            //   bold("promoted") +
            //   " to <@&1172644269811585115>",🎖️ this one in the beggining, and thumbs up at the end <a:arrowr:951974708671299605> 🎖️ this one in the beginning, and thumbs up at the end 👍
          },
        ],
      },
    ],
  });
};
