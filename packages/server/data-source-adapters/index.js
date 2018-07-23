const adapterMoves = require('./moves');
const adapterStrava = require('./strava');
const adapterToshl = require('./toshl');

module.exports = {
  moves: { ...adapterMoves },
  strava: { ...adapterStrava },
  toshl: { ...adapterToshl },
};
