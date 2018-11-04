const auth = require('./private/toshl-auth')
const nodeToshl = require('node-toshl')

module.exports = new nodeToshl(auth)
