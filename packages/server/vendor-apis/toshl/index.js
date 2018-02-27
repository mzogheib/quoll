const axios = require('axios');
const utils = require('../../utils');
const _ = require('lodash');

module.exports = {
  validateToken,
  authenticate,
  deauthorize,
  entries: {
    list: listEntries
  },
  tags: {
    list: listTags
  }
};

const baseApiUrl = 'https://api.toshl.com';
let auth = {};

// Validate the token by pinging the /me endpoint and resolve it if ok.
function validateToken(token) {
  const options = {
    auth: {
      username: token,
      password: null
    }
  };
  const url = `${baseApiUrl}/me`;
  return get(url, options).then(() => token);
}

// Sets the auth to be used in each request
function authenticate(token) {
  auth = {
    username: token,
    password: null
  };
}

function deauthorize() {
  auth = {};
}

function get(url, opts) {
  return new Promise((resolve, reject) => {
    const options = _.defaultsDeep(opts, { auth: auth });
    axios.get(url, options)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data.description }));
  });
}

function listEntries(params) {
  const url = `${baseApiUrl}/entries${utils.makeUrlParams(params)}`;
  return get(url);
}

function listTags() {
  const url = `${baseApiUrl}/tags`;
  return get(url);
}