const userStorage = require('../storage/user.storage');
const _ = require('lodash');

module.exports = {
  createUser,
  login,
  get,
  setDataSourceAuth,
  getDataSourceAuth
};

const DefaultDataSources = [
  { name: 'strava', auth: null },
  { name: 'toshl', auth: null },
  { name: 'moves', auth: null },
];

function createUser () {
  return new Promise ((resolve, reject) => {
    const user = userStorage.create({ dataSources: DefaultDataSources });
    resolve(sanitizeUser(user));
  });
}

function login (userId) {
  return get(userId).then(sanitizeUser);
}

function sanitizeUser (user) {
  if (!user) return;

  const sanitizedUser = user;
  sanitizedUser.dataSources = user.dataSources.map(dataSource => {
    return {
      name: dataSource.name,
      isConnected: !!dataSource.auth
    };
  });
  return sanitizedUser;
}

function get (userId) {
  // Apply defaults so that newly added dataSource will be appended to existing user dataSources
  const user = userStorage.get(userId);
  user.dataSources = _.defaultsDeep(user.dataSources, DefaultDataSources);
  return new Promise ((resolve, reject) => resolve(user));
}

function update (user) {
  return new Promise ((resolve, reject) => {
    userStorage.update(user);
    resolve();
  });
}

function setDataSourceAuth (userId, dataSourcName, data) {
  return get(userId)
    .then(user => {
      user.dataSources.find(dataSource => dataSource.name === dataSourcName).auth = data;
      return user;
    })
    .then(update);
}

function getDataSourceAuth (userId, dataSourcName) {
  return get(userId)
    .then(user => {
      return user.dataSources.find(dataSource => dataSource.name === dataSourcName).auth;
    });
}