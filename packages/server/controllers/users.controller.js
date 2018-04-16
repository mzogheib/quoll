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
      dataSources: [
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
  sanitizedUser.dataSources = user.dataSources.map(ds => {
    return {
      id: ds.id,
      isConnected: !!ds.vendorAuth
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

function setVendorAuth (userId, dataSourceId, data) {
  return get(userId)
    .then(user => {
      user.dataSources.find(ds => ds.id === dataSourceId).vendorAuth = data;
      return user;
    })
    .then(update);
}

function getVendorAuth (userId, dataSourceId) {
  return get(userId)
    .then(user => {
      return user.dataSources.find(ds => ds.id === dataSourceId).vendorAuth;
    });
}