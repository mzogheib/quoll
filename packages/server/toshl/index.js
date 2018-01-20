const axios = require('axios');
const toshlToken = require('./private/auth.json').token;

module.exports = {
    get: list
};

const baseUrl = 'https://api.toshl.com/';

function list (endpoint, parameters) {
    let urlParams = [];

    for(var param in parameters) {
        urlParams.push(param + '=' + parameters[param]);
    }

    return axios.get(
        baseUrl + endpoint + '?' + urlParams.join('&'),
        {
            auth: {
                username: toshlToken,
                password: null
            }
        }
    );
}