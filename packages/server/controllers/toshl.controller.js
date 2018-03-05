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
    apiToshl.deauthorize();
    cache = {};
    resolve();
  });
}

function getTags (parameters, options) {
  if (cache.tags) {
    return Promise.resolve(cache.tags);
  } else {
    return apiToshl.tags.list(parameters, options)
      .then(tags => {
        // Map the array of tags to an object and cache
        cache.tags = tags.reduce((map, tag) => (map[tag.id] = tag.name, map), {});
        return cache.tags;
      });
  }
}

const decorateEntryWithTags = entry => {
  return getTags()
    .then(tags => {
      entry.tags = entry.tags.map(tagId => {
        return {
          id: tagId,
          name: tags[tagId]
        };
      });
      return entry;
    });
}

function getEntries (parameters, options) {
  var decoratedEntries;
  return apiToshl.entries.list(parameters, options)
    .then(entries => { decoratedEntries = entries })
    .then(() => getTags(null, options))
    .then(tags => {
      decoratedEntries.forEach(decoratedEntry => {
        decoratedEntry.tags = decoratedEntry.tags.map(tagId => {
          return { id: tagId, name: tags[tagId] || 'No tag' };
        });
      });
      return decoratedEntries;
    });
}