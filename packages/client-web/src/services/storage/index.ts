const prefix = 'quoll';

const makeKey = (key: string) => `${prefix}-${key}`;

const get = (key: string) => {
  const data = localStorage.getItem(makeKey(key));

  if (data) return JSON.parse(data);
};

const set = (key: string, data: string) =>
  localStorage.setItem(makeKey(key), JSON.stringify(data));

const remove = (key: string) => localStorage.removeItem(makeKey(key));

const storageService = {
  get,
  set,
  delete: remove,
};

export default storageService;
