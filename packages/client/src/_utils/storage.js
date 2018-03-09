const prefix = 'quoll';
const get = key => JSON.parse(localStorage.getItem(`${prefix}-${key}`));
const set = (key, data) => localStorage.setItem(`${prefix}-${key}`, JSON.stringify(data));

export default {
    get,
    set
};