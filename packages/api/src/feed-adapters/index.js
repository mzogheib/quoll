const {
  stravaSummaryActivitiesAdapter,
  toshlEntriesAdapter,
} = require("@quoll/lib");

module.exports = {
  moves: require("./moves"),
  strava: { adapter: stravaSummaryActivitiesAdapter },
  toshl: { adapter: toshlEntriesAdapter },
  uber: require("./uber"),
};
