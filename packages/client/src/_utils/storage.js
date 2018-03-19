const prefix = 'quoll';
const makeKey = key => `${prefix}-${key}`;
const get = key => JSON.parse(localStorage.getItem(makeKey(key)));
const set = (key, data) => localStorage.setItem(makeKey(key), JSON.stringify(data));
const remove = (key) => localStorage.removeItem(makeKey(key))

export default {
    get,
    set,
    delete: remove
};