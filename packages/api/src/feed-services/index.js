const serviceMoves = require("./moves");
const serviceStrava = require("./strava");
const serviceToshl = require("./toshl");
const serviceUber = require("./uber");

module.exports = {
  moves: { ...serviceMoves, getData: serviceMoves.getSegments },
  strava: { ...serviceStrava, getData: serviceStrava.getAthleteActivities },
  toshl: { ...serviceToshl, getData: serviceToshl.getEntries },
  uber: { ...serviceUber, getData: serviceUber.getHistory },
};
