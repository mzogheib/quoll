const storage = require('../utils/storage');
const uuidv4 = require('uuid/v4');

module.exports = {
  createUser,
  login
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
      user.dataSources.forEach(uds => {
        if (uds.accessToken) {
          getApi(uds.id).authenticate(uds.accessToken);
        }
      });
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

function getApi (dataSourceId) {
  switch (dataSourceId) {
    case 'strava':
      return require('../vendor-apis/strava');
    case 'toshl':
      return require('../vendor-apis/toshl');
    default:
      // TODO handle this case
      return null;
  }
}
