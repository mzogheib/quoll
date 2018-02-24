const axios = require('axios');
const utils = require('../../utils');
const toshlToken = require('./private/toshl-auth.json').token;

module.exports = {
  entries: {
    list: listEntries
  },
  tags: {
    list: listTags
  }
};

const baseApiUrl = 'https://api.toshl.com';
let auth = {
  username: toshlToken,
  password: null
};

const get = url => {
  const options = {
    auth: auth
  };
  return new Promise((resolve, reject) => {
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