const axios = require('axios');
const querystring = require('querystring');
const auth = require('./private/moves-auth');

module.exports = {
  oauth: {
    url: oauthUrl,
    token,
    refresh: refreshAuth
  },
  storyline
};

const baseUrl = 'https://api.moves-app.com';
const baseOauthUrl = `${baseUrl}/oauth/v1`;
const baseApiUrl = `${baseUrl}/api/1.1`;

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
    redirect_uri: auth.redirect_uri,
    scope: 'activity location'
  };
  return `${baseOauthUrl}/authorize?${querystring.stringify(params)}`;
}

function token(code) {
  const params = {
    code: code,
    grant_type: 'authorization_code',
    client_id: auth.client_id,
    client_secret: auth.client_secret,
    redirect_uri: auth.redirect_uri
  };
  return post({ url: `/access_token?${querystring.stringify(params)}` });
}

function refreshAuth(expiredAuth) {
  const params = {
    grant_type: 'refresh_token',
    refresh_token: expiredAuth.refresh_token,
    client_id: auth.client_id,
    client_secret: auth.client_secret
  };
  return post({ url: `/access_token?${querystring.stringify(params)}` });
}

function storyline(from, to, trackPoints, token) {
  return get({ url: '/user/storyline/daily', headers: { Authorization: `Bearer ${token}` }, params: { from, to, trackPoints } });
}