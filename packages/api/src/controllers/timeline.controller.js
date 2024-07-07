import * as feedServices from "../feed-services";
import * as feedAdapters from "../feed-adapters";

export const get = async (from, to, user) => {
  const promises = user.feeds
    .filter((feed) => feed.auth)
    .map((feed) =>
      feedServices[feed.name]
        .getData(from, to, feed.auth.access_token)
        .then(feedAdapters[feed.name].adapter),
    );

  const arraysOfFeedItems = await Promise.all(promises);

  return arraysOfFeedItems
    .reduce((prev, next) => prev.concat([].concat(...next)), []) // Flatten
    .sort((a, b) => a.timeStart - b.timeStart);
};
