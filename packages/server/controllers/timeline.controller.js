const feedServices = require('../feed-services')
const feedAdapters = require('../feed-adapters')

module.exports = {
  get,
}

function get(from, to, user) {
  const promises = user.feeds
    .filter(feed => feed.auth)
    .map(feed =>
      feedServices[feed.name]
        .getData(from, to, feed.auth.access_token)
        .then(feedAdapters[feed.name].adapter)
    )

  return Promise.all(promises).then(arraysOfFeedItems =>
    arraysOfFeedItems
      .reduce((prev, next) => prev.concat([].concat(...next)), []) // Flatten
      .sort((a, b) => a.timeStart - b.timeStart)
  )
}
