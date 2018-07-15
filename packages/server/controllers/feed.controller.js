const ctrlMoves = require('../controllers/moves.controller');
const ctrlStrava = require('../controllers/strava.controller');
const ctrlToshl = require('../controllers/toshl.controller');

const getMethods = {
  moves: ctrlMoves.getSegments,
  strava: ctrlStrava.getAthleteActivities,
  toshl: ctrlToshl.getEntries
};

const adapterMethods = {
  moves: ctrlMoves.adapter,
  strava: ctrlStrava.adapter,
  toshl: ctrlToshl.adapter,
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
        .sort((a, b) => a.timestampStart - b.timestampStart)
    )
}