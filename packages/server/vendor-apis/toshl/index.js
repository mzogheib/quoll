const axios = require('axios');
const utils = require('../../utils');
const auth = require('./private/toshl-auth');

module.exports = {
  validateToken,
  oauth: {
    url: oauthUrl,
    token
  },
  entries: {
    list: listEntries
  },
  tags: {
    list: listTags
  }
};

const baseApiUrl = 'https://api.toshl.com';
const baseOauthUrl = 'https://toshl.com/oauth2';
const makeAuthHeader = (username, password) => { return { auth: { username, password: null }}; }

function get(url, options) {
  return new Promise((resolve, reject) => {
    axios.get(url, options)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data.description }));
  });
}

function post(url, payload, options) {
  return new Promise((resolve, reject) => {
    return axios.post(url, payload, options)
      .then(response => resolve(response.data))
      .catch(error => reject({ status: error.response.status, message: error.response.data }));
  });
}

function oauthUrl () {
  return `${baseOauthUrl}/authorize?client_id=${auth.client_id}&response_type=code&redirect_uri=http://localhost:3000`;
}

function token(code) {
  const url = `${baseOauthUrl}/token`;
  const querystring = require('querystring');
  const payload = {
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000'
  };
  options = {
    auth: {
      username: auth.client_id,
      password: auth.client_secret
    },
    headers: {
      "Content-Type": 'application/x-www-form-urlencoded'
    }
  };
  return post(url, querystring.stringify(payload), options)
    .then(data => data.access_token);
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