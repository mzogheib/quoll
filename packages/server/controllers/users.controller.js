const userStorage = require('../storage/user.storage');

module.exports = {
  createUser,
  login,
  get,
  setVendorAuth,
  getVendorAuth
};

function createUser () {
  return new Promise ((resolve, reject) => {
    const user = userStorage.create({
      feeds: [
        { id: 'strava', vendorAuth: null },
        { id: 'toshl', vendorAuth: null },
      ]
    });
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
  return new Promise ((resolve, reject) => resolve(userStorage.get(userId)));
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