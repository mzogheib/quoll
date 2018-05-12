const apiToshl = require('../vendor-apis/toshl');
const toshlStorage = require('../storage/toshl.storage');

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  refreshAuth,
  getEntries
};

function getOAuthUrl() {
  return apiToshl.oauth.url();
}

function authenticate(code) {
  return apiToshl.oauth.token(code);
}

function deauthorize(auth) {
  return apiToshl.oauth.deauthorize(auth)
    .then(() => { toshlStorage.delete(auth.access_token); });
}

function refreshAuth(auth) {
  return apiToshl.oauth.refresh(auth)
    .then(newAuth => {
      toshlStorage.delete(auth.access_token);
      return newAuth;
    });
}

function getTags (token) {
  let storedData = toshlStorage.get(token);
  const storedTags = storedData && storedData.tags;
  if (storedTags) {
    return Promise.resolve(storedTags);
  } else {
    return apiToshl.tags.list(token)
      .then(tags => {
        // Map the array of tags to an object and store
        storedData = toshlStorage.create(token);
        storedData.tags = tags.reduce((map, tag) => (map[tag.id] = tag.name, map), {});
        return storedData;
      })
      .then(toshlStorage.update)
      .then(() => storedData.tags);
  }
}

function getEntries (from, to, token) {
  var decoratedEntries;
  return apiToshl.entries.list(from, to, token)
    .then(entries => { decoratedEntries = entries })
    .then(() => getTags(token))
    .then(tags => {
      decoratedEntries.forEach(decoratedEntry => {
        decoratedEntry.tags = decoratedEntry.tags.map(tagId => {
          return { id: tagId, name: tags[tagId] || 'No tag' };
        });
      });
      return decoratedEntries;
    });
}