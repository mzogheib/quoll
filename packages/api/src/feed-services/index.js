const serviceStrava = require("./strava");
const serviceToshl = require("./toshl");

module.exports = {
  strava: { ...serviceStrava, getData: serviceStrava.getAthleteActivities },
  toshl: { ...serviceToshl, getData: serviceToshl.getEntries },
};
