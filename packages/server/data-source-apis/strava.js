const auth = require('./private/strava-auth');
const nodeStrava = require('node-strava');

module.exports = new nodeStrava(auth);