const apiToshl = require('../vendor-apis/toshl');

module.exports = {
  authenticate,
  deauthorize,
  getEntries
};

let cache = {};

function authenticate(token) {
  return apiToshl.validateToken(token)
    .then(() => token);
}

function deauthorize() {
  return new Promise((resolve, reject) => {
    cache = {};
    resolve();
  });
}

// TODO: store tags on a user or somewhere else
function getTags (token) {
  if (cache.tags) {
    return Promise.resolve(cache.tags);
  } else {
    return apiToshl.tags.list(token)
      .then(tags => {
        // Map the array of tags to an object and cache
        cache.tags = tags.reduce((map, tag) => (map[tag.id] = tag.name, map), {});
        return cache.tags;
      });
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