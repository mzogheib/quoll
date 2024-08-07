import { feedServices, feedAdapters, isSupportedFeed } from "../feeds";
import { UserDoc } from "../models/user.model";

export const get = async (from: string, to: string, user: UserDoc) => {
  const authenticatedFeeds = user.feeds.filter((feed) => feed.auth !== null);

  const promises = authenticatedFeeds.map(async (feed) => {
    if (!isSupportedFeed(feed.name)) return [];

    const feedService = feedServices[feed.name];
    const feedAdapter = feedAdapters[feed.name];

    const accessToken = feed.auth!.access_token;

    const data = await feedService.getData(from, to, accessToken);

    // TODO add the types
    return feedAdapter(data as any);
  });

  const arraysOfEntries = await Promise.all(promises);
  const entries = arraysOfEntries.reduce((prev, next) => prev.concat(next), []);

  return entries.sort((a, b) => a.timeStart - b.timeStart);
};
