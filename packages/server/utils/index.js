const _ = require('lodash');

module.exports = {
    makeUrlParams
};

function makeUrlParams (params) {
    if (!params || _.isEmpty(params)) return '';

    let urlParams = [];
    for (let key in params) urlParams.push(`${key}=${params[key]}`);

    return `?${urlParams.join('&')}`;
}