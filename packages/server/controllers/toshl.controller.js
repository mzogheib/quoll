const axios = require('axios');
const _ = require('lodash');
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
  const urlParams = getUrlParams(parameters);
  const url = baseUrl + endpoint + urlParams;
  return axios.get(url, options);
}

const getUrlParams = params => {
  if (!params || _.isEmpty(params)) return '';

  let urlParams = [];
  for (let key in params) urlParams.push(`${key}=${params[key]}`);

  return `?${urlParams.join('&')}`;
}