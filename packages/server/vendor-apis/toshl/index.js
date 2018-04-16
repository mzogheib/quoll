const axios = require('axios');
const utils = require('../../utils');
const auth = require('./private/toshl-auth');
const querystring = require('querystring');

module.exports = {
  oauth: {
    url: oauthUrl,
    token,
    deauthorize
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
const makeAuthHeader = token => { return { headers: { 'Authorization': `Bearer ${token}` } }; };

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
  return post(url, querystring.stringify(payload), options);
}

function deauthorize(auth) {
  const url = `${baseOauthUrl}/revoke`;
  const payload = {
    refresh_token: auth.refresh_token
  };
  const options = makeAuthHeader(auth.access_token);
  return post(url, querystring.stringify(payload), options);
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