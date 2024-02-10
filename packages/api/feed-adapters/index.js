const { stravaSummaryActivitiesAdapter } = require("@quoll/client-lib");

module.exports = {
  moves: require("./moves"),
  strava: { adapter: stravaSummaryActivitiesAdapter },
  toshl: require("./toshl"),
  uber: require("./uber"),
};
