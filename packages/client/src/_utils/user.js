import api from './api';
import storage from './storage';

const userKey = 'user';

const getCurrentUser = () => storage.get(userKey);
const setCurrentUser = userId => storage.set(userKey, userId);
const login = userId => api.post('login', { userId });
const signup = () => api.post('signup');

export default {
    getCurrentUser,
    setCurrentUser,
    login,
    signup
};