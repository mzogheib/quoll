const apiToshl = require('../vendor-apis/toshl');
const toshlStorage = require('../storage/toshl.storage');

module.exports = {
  getOAuthUrl,
  authenticate,
  deauthorize,
  getEntries
};

function getOAuthUrl() {
  return apiToshl.oauth.url();
}

function authenticate(token) {
  return apiToshl.validateToken(token)
    .then(() => token);
}

function deauthorize(token) {
  return new Promise((resolve, reject) => {
    toshlStorage.delete(token);
    resolve();
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

function getEntries (parameters, token) {
  var decoratedEntries;
  return apiToshl.entries.list(parameters, token)
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