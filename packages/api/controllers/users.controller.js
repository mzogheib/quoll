const User = require('../models/user.model')

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
    User.create({ feeds: DefaultFeeds }, (error, user) => {
      if (error) reject(error)
      else resolve(sanitizeUser(user))
    })
  })
}

function login(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, user) => {
      if (error) reject(error)
      else resolve(sanitizeUser(user))
    })
  })
}

function sanitizeUser(user) {
  if (!user) return

  const sanitizedUser = user
  sanitizedUser.feeds = user.feeds.map((feed) => {
    return {
      name: feed.name,
      isConnected: !!feed.auth,
    }
  })
  return sanitizedUser
}

function get(userId) {
  return new Promise((resolve, reject) => {
    User.findById(userId, (error, user) => {
      if (error) reject(error)
      else resolve(user)
    })
  })
}

function update(user) {
  return new Promise((resolve, reject) => {
    User.updateOne({ _id: user._id }, user, (error) => {
      if (error) reject(error)
      else resolve()
    })
  })
}

function setFeedAuth(userId, feedName, data) {
  return get(userId)
    .then((user) => {
      user.feeds.find((feed) => feed.name === feedName).auth = data
      return user
    })
    .then(update)
}

function getFeedAuth(userId, feedName) {
  return get(userId).then((user) => {
    return user.feeds.find((feed) => feed.name === feedName).auth
  })
}
