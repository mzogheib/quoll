const dataSourceServices = require('../data-source-services');
const dataSourceAdapters = require('../data-source-adapters');

module.exports = {
  get
};

function get(from, to, user) {
  const promises = user.feeds
    .filter(feed => feed.vendorAuth)
    .map(connectedFeed =>
      dataSourceServices[connectedFeed.id].getData(from, to, connectedFeed.vendorAuth.access_token)
        .then(dataSourceAdapters[connectedFeed.id].adapter)
    );

  return Promise.all(promises)
    .then(arraysOfSourceItems =>
      arraysOfSourceItems
        .reduce((prev, next) => prev.concat([].concat(...next)), []) // Flatten
        .sort((a, b) => a.timeStart - b.timeStart)
    )
}