const { stravaSummaryActivitiesAdapter } = require("@quoll/lib");

module.exports = {
  moves: require("./moves"),
  strava: { adapter: stravaSummaryActivitiesAdapter },
  toshl: require("./toshl"),
  uber: require("./uber"),
};
