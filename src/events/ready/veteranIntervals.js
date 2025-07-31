const processVeteran = require("../../process/veteranRanks");
require("dotenv").config();
var interval = 1000 * 60 * 60 * 24;

module.exports = (client) => {
  setInterval(async () => {
    await processVeteran(client);
  }, interval);
};
