const axios = require('axios');
const utils = require('../utils');
const toshlToken = require('./private/toshl-auth.json').token;

module.exports = {
  entries: { 
    list: parameters => list('/entries', parameters)
  }
};

const baseUrl = 'https://api.toshl.com';

const list = (endpoint, parameters) => {
  const options = { auth: { username: toshlToken, password: null }};
  // TODO: validate from and to exist in the params
  const urlParams = utils.makeUrlParams(parameters);
  const url = baseUrl + endpoint + urlParams;
  return axios.get(url, options);
}