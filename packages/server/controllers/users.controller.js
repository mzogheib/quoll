const userStorage = require('../storage/user.storage')
const _ = require('lodash')

module.exports = {
  createUser,
  login,
  get,
  setFeedAuth,
  getFeedAuth,
}

const DefaultFeeds = [
  { name: 'strava', auth: null },
  { name: 'toshl', auth: null },
  { name: 'moves', auth: null },
  { name: 'uber', auth: null },
]

function createUser() {
  return new Promise((resolve, reject) => {
    const user = userStorage.create({ feeds: DefaultFeeds })
    resolve(sanitizeUser(user))
  })
}

function login(userId) {
  return get(userId).then(sanitizeUser)
}

function sanitizeUser(user) {
  if (!user) return

  const sanitizedUser = user
  sanitizedUser.feeds = user.feeds.map(feed => {
    return {
      name: feed.name,
      isConnected: !!feed.auth,
    }
  })
  return sanitizedUser
}

function get(userId) {
  // Apply defaults so that newly added feed will be appended to existing user feeds
  const user = userStorage.get(userId)
  user.feeds = _.defaultsDeep(user.feeds, DefaultFeeds)
  return new Promise((resolve, reject) => resolve(user))
}

function update(user) {
  return new Promise((resolve, reject) => {
    userStorage.update(user)
    resolve()
  })
}

function setFeedAuth(userId, feedName, data) {
  return get(userId)
    .then(user => {
      user.feeds.find(feed => feed.name === feedName).auth = data
      return user
    })
    .then(update)
}

function getFeedAuth(userId, feedName) {
  return get(userId).then(user => {
    return user.feeds.find(feed => feed.name === feedName).auth
  })
}
