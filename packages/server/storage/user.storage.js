const storage = require('./index.js')
const uuidv4 = require('uuid/v4')

module.exports = {
  create,
  get,
  update,
}

const prefix = 'quoll-user-'

function create(user) {
  const id = uuidv4()
  const newUser = { id, ...user }
  storage.set(`${prefix}${id}`, newUser)
  return newUser
}

function get(id) {
  return storage.get(`${prefix}${id}`)
}

function update(user) {
  storage.set(`${prefix}${user.id}`, user)
}
