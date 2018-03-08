const userStorage = require('../storage/user.storage');

module.exports = {
  createUser,
  login,
  get,
  update
};

function createUser () {
  return new Promise ((resolve, reject) => {
    const user = userStorage.create({
      dataSources: [
        { id: 'strava', accessToken: null },
        { id: 'toshl', accessToken: null },
      ]
    });
    resolve({ status: 200, message: sanitizeUser(user) });
  });
}

function login (userId) {
  return new Promise ((resolve, reject) => {
    const user = userStorage.get(userId);
    if (!user) {
      reject({ status: 404, message: `Could not find user with id: ${userId}` });
    } else {
      resolve({ status: 200, message: sanitizeUser(user) });
    }
  });
}

function sanitizeUser (user) {
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
