const dataSourceServices = require('../data-source-services');

module.exports = {
  get
};

function get(from, to, user) {
  const promises = user.feeds
    .filter(feed => feed.vendorAuth)
    .map(connectedFeed =>
      dataSourceServices[connectedFeed.id].getData(from, to, connectedFeed.vendorAuth.access_token)
        .then(dataSourceServices[connectedFeed.id].adapter)
    );

  return Promise.all(promises)
    .then(arraysOfSourceItems =>
      arraysOfSourceItems
        .reduce((prev, next) => prev.concat([].concat(...next)), []) // Flatten
        .sort((a, b) => a.timeStart - b.timeStart)
    )
}