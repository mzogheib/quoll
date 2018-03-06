const axios = require('axios');
const utils = require('../../utils');
const _ = require('lodash');

module.exports = {
  validateToken,
  entries: {
    list: listEntries
  },
  tags: {
    list: listTags
  }
};

const baseApiUrl = 'https://api.toshl.com';
const makeAuthHeader = (username, password) => { return { auth: { username, password: null }}; }

function get(url, options) {
  return new Promise((resolve, reject) => {
    axios.get(url, options)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data.description }));
  });
}

// Validate the token by pinging the /me endpoint and resolve it if ok.
function validateToken(token) {
  const url = `${baseApiUrl}/me`;
  const options = makeAuthHeader(token);
  return get(url, options).then(() => token);
}

function listEntries(params, token) {
  const url = `${baseApiUrl}/entries${utils.makeUrlParams(params)}`;
  const options = makeAuthHeader(token);
  return get(url, options);
}

function listTags(token) {
  const url = `${baseApiUrl}/tags`;
  const options = makeAuthHeader(token);
  return get(url, options);
}