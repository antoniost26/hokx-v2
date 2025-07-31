const cleanUpRoles = require("../../process/cleanUpRoles");
require("dotenv").config();
// var interval = 30000; - testing
var interval = 1000 * 60 * 60 * 24 * 7;

module.exports = (client) => {
  setInterval(async () => {
    await cleanUpRoles(client);
  }, interval);
};
