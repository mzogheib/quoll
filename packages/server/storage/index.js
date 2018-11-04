const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./private/storage')

module.exports = {
  get,
  set,
  delete: remove,
  length,
}

function get(key) {
  return JSON.parse(localStorage.getItem(key))
}

function set(key, data) {
  return localStorage.setItem(key, JSON.stringify(data))
}

function remove(key) {
  return localStorage.removeItem(key)
}

function length() {
  return localStorage.length
}
