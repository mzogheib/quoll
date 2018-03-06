const storage = require('../storage');
const uuidv4 = require('uuid/v4');

module.exports = {
  createUser,
  login,
  get,
  update
};

function createUser () {
  return new Promise ((resolve, reject) => {
    const user = {
      id: uuidv4(),
      dataSources: [
        { id: 'strava', accessToken: null },
        { id: 'toshl', accessToken: null },
      ]
    };
    storage.set(user.id, user);
    resolve({ status: 200, message: sanitizeUser(user) });
  });
}

function login (userId) {
  return new Promise ((resolve, reject) => {
    const user = storage.get(userId);
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
  return new Promise ((resolve, reject) => resolve(storage.get(userId)));
}

function update (user) {
  return new Promise ((resolve, reject) => {
    storage.set(user.id, user);
    resolve();
  });
}
