const storage = require('./index.js')

module.exports = {
  create,
  get,
  update,
  delete: remove,
}

const prefix = 'quoll-toshl-'
const makeKey = key => `${prefix}${key}`

function create(id) {
  const newEntry = { id }
  storage.set(makeKey(id), newEntry)
  return newEntry
}

function get(id) {
  return storage.get(makeKey(id))
}

function update(entry) {
  storage.set(makeKey(entry.id), entry)
}

function remove(id) {
  storage.delete(makeKey(id))
}
