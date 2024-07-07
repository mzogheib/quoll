import * as feedServices from "../feed-services";
import * as feedAdapters from "../feed-adapters";

export function get(from, to, user) {
  const promises = user.feeds
    .filter((feed) => feed.auth)
    .map((feed) =>
      feedServices[feed.name]
        .getData(from, to, feed.auth.access_token)
        .then(feedAdapters[feed.name].adapter),
    );

  return Promise.all(promises).then((arraysOfFeedItems) =>
    arraysOfFeedItems
      .reduce((prev, next) => prev.concat([].concat(...next)), []) // Flatten
      .sort((a, b) => a.timeStart - b.timeStart),
  );
}
