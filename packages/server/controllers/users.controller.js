const userStorage = require('../storage/user.storage');
const _ = require('lodash');

module.exports = {
  createUser,
  login,
  get,
  setVendorAuth,
  getVendorAuth
};

const DefaultFeeds = [
  { id: 'strava', vendorAuth: null },
  { id: 'toshl', vendorAuth: null },
  { id: 'moves', vendorAuth: null },
];

function createUser () {
  return new Promise ((resolve, reject) => {
    const user = userStorage.create({ feeds: DefaultFeeds });
    resolve(sanitizeUser(user));
  });
}

function login (userId) {
  return get(userId).then(sanitizeUser);
}

function sanitizeUser (user) {
  if (!user) return;

  const sanitizedUser = user;
  sanitizedUser.feeds = user.feeds.map(feed => {
    return {
      id: feed.id,
      isConnected: !!feed.vendorAuth
    };
  });
  return sanitizedUser;
}

function get (userId) {
  // Apply defaults so that newly added feeds will be appended to existing user feeds
  const user = userStorage.get(userId);
  user.feeds = _.defaultsDeep(user.feeds, DefaultFeeds);
  return new Promise ((resolve, reject) => resolve(user));
}

function update (user) {
  return new Promise ((resolve, reject) => {
    userStorage.update(user);
    resolve();
  });
}

function setVendorAuth (userId, feedId, data) {
  return get(userId)
    .then(user => {
      user.feeds.find(feed => feed.id === feedId).vendorAuth = data;
      return user;
    })
    .then(update);
}

function getVendorAuth (userId, feedId) {
  return get(userId)
    .then(user => {
      return user.feeds.find(feed => feed.id === feedId).vendorAuth;
    });
}