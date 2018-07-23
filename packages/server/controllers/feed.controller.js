const serviceMoves = require('../services/moves');
const serviceStrava = require('../services/strava');
const serviceToshl = require('../services/toshl');

const getMethods = {
  moves: serviceMoves.getSegments,
  strava: serviceStrava.getAthleteActivities,
  toshl: serviceToshl.getEntries
};

const adapterMethods = {
  moves: serviceMoves.adapter,
  strava: serviceStrava.adapter,
  toshl: serviceToshl.adapter,
}

module.exports = {
  get
};

function get(from, to, user) {
  const promises = user.feeds
    .filter(feed => feed.vendorAuth)
    .map(connectedFeed =>
      getMethods[connectedFeed.id](from, to, connectedFeed.vendorAuth.access_token)
        .then(adapterMethods[connectedFeed.id])
    );

  return Promise.all(promises)
    .then(arraysOfSourceItems =>
      arraysOfSourceItems
        .reduce((prev, next) => prev.concat([].concat(...next)), []) // Flatten
        .sort((a, b) => a.timeStart - b.timeStart)
    )
}