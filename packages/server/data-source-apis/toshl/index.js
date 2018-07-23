const axios = require('axios');
const auth = require('./private/toshl-auth');
const querystring = require('querystring');

module.exports = {
  oauth: {
    url: oauthUrl,
    token,
    deauthorize,
    refresh: refreshAuth
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

const get = ({ baseURL = baseApiUrl, url, headers, params }) => new Promise((resolve, reject) => {
  const config = {
    method: 'GET',
    baseURL,
    url,
    headers,
    params
  };
  axios.request(config)
    .then(response => resolve(response.data))
    .catch(error => reject({ status: error.response.status, message: error.response.data.description }));
});

const post = ({ baseURL = baseOauthUrl, url, auth, headers, data }) => new Promise((resolve, reject) => {
  const config = {
    method: 'POST',
    baseURL,
    url,
    auth,
    headers: { ...headers, 'Content-Type': 'application/x-www-form-urlencoded' },
    data: querystring.stringify(data)
  };
  axios.request(config)
    .then(response => resolve(response.data))
    .catch(error => reject({ status: error.response.status, message: error.response.data }));
});

function oauthUrl () {
  const params = {
    client_id: auth.client_id,
    response_type: 'code',
    redirect_uri: auth.redirect_uri
  };
  return `${baseOauthUrl}/authorize?${querystring.stringify(params)}`;
}

function token(code) {
  const data = {
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: auth.redirect_uri
  };
  return post({ url: '/token', auth: { username: auth.client_id, password: auth.client_secret }, data });
}

function deauthorize(auth) {
  const data = {
    refresh_token: auth.refresh_token
  };
  return post({ url: '/revoke', headers: { Authorization: `Bearer ${auth.access_token}` }, data });
}

function refreshAuth(expiredAuth) {
  const data = {
    grant_type: 'refresh_token',
    refresh_token: expiredAuth.refresh_token
  };
  return post({ url: '/token', auth: { username: auth.client_id, password: auth.client_secret }, data });
}

function listEntries(from, to, token) {
  return get({ url: '/entries', headers: { Authorization: `Bearer ${token}` }, params: { from, to } });
}

function listTags(token) {
  return get({ url: '/tags', headers: { Authorization: `Bearer ${token}` }});
}