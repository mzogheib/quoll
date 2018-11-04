const auth = require('./private/uber-auth')
const nodeUber = require('node-uber')

module.exports = new nodeUber(auth)
