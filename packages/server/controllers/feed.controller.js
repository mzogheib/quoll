const dataSourceServices = require('../data-source-services');
const dataSourceAdapters = require('../data-source-adapters');

module.exports = {
  get
};

function get(from, to, user) {
  const promises = user.dataSources
    .filter(dataSource => dataSource.auth)
    .map(dataSource =>
      dataSourceServices[dataSource.name].getData(from, to, dataSource.auth.access_token)
        .then(dataSourceAdapters[dataSource.name].adapter)
    );

  return Promise.all(promises)
    .then(arraysOfSourceItems =>
      arraysOfSourceItems
        .reduce((prev, next) => prev.concat([].concat(...next)), []) // Flatten
        .sort((a, b) => a.timeStart - b.timeStart)
    )
}