import api from './api'
import storage from './storage'

const userKey = 'user'

const getCurrentUser = () => storage.get(userKey)
const setCurrentUser = (userId) => {
  storage.set(userKey, userId)
  api.authenticate(userId)
}
const login = (userId) =>
  api.post({ endpoint: 'login', payload: { userId } }).then((user) => {
    setCurrentUser(user._id)
    return user
  })
const signup = () =>
  api.post({ endpoint: 'signup' }).then((user) => {
    setCurrentUser(user._id)
    return user
  })

const userService = {
  getCurrentUser,
  login,
  signup,
}

export default userService
