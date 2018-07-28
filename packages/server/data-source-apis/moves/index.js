const auth = require('./private/moves-auth');
const nodeMoves = require('node-moves');

module.exports = new nodeMoves(auth);