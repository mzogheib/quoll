const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./private/storage');

module.exports = {
    get,
    set,
    length
};

function get (key) {
    return JSON.parse(localStorage.getItem(key));
}

function set (key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
}

function length () {
    return localStorage.length;
}