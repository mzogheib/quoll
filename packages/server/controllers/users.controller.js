const userStorage = require('../storage/user.storage');

module.exports = {
  createUser,
  login,
  get,
  setAccessToken,
  getAccessToken
};

function createUser () {
  return new Promise ((resolve, reject) => {
    const user = userStorage.create({
      dataSources: [
        { id: 'strava', accessToken: null },
        { id: 'toshl', accessToken: null },
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
      isConnected: !!ds.accessToken
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

function setAccessToken (userId, dataSourceId, token) {
  return get(userId)
    .then(user => {
      user.dataSources.find(ds => ds.id === dataSourceId).accessToken = token;
      return user;
    })
    .then(update);
}

function getAccessToken (userId, dataSourceId) {
  return get(userId)
    .then(user => {
      return user.dataSources.find(ds => ds.id === dataSourceId).accessToken;
    });
}