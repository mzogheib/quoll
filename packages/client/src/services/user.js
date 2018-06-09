import api from './api';
import storage from './storage';

const userKey = 'user';

const getCurrentUser = () => storage.get(userKey);
const setCurrentUser = userId => {
  storage.set(userKey, userId);
  api.authenticate(userId);
};
const login = userId => api.post('login', { userId })
  .then(user => {
    setCurrentUser(user.id);
    return user;
  });
const signup = () => api.post('signup')
  .then(user => {
    setCurrentUser(user.id);
    return user;
  });

export default {
  getCurrentUser,
  login,
  signup
};