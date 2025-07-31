const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  client.user.setPresence({
    activities: [
      { name: "HoKx.com", ActivityType: ActivityType.Watching },
    ],
    status: "online",
  });
};
