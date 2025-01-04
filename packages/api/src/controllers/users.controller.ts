import { User, FeedName } from "@quoll/lib/modules";
import { IAuth, UserDoc, UserModel } from "../models/user.model";

export const get = async (userId: string): Promise<UserDoc> => {
  const user = await UserModel.findById(userId);

  if (user === null) throw new Error("User not found");

  return user;
};

export const setFeedAuth = async (
  userId: string,
  feedName: FeedName,
  data: IAuth | null,
) => {
  const user = await get(userId);

  user.feeds.forEach((feed) => {
    if (feed.name !== feedName) return;

    feed.auth = data;
  });

  await UserModel.updateOne({ _id: user._id }, user);
};

export const getFeedAuth = async (userId: string, feedName: FeedName) => {
  const user = await get(userId);
  const feed = user.feeds.find((feed) => feed.name === feedName);

  if (feed === undefined) throw new Error("Feed not found");

  return feed.auth;
};

const DefaultFeeds = [
  { name: "strava", auth: null },
  { name: "toshl", auth: null },
];

const sanitizeUser = (user: UserDoc): User => {
  const feeds = user.feeds.map((feed) => {
    return {
      name: feed.name,
      isConnected: feed.auth !== null,
    };
  });

  return {
    _id: user._id.toString(),
    feeds,
  };
};

export const getUser = async (auth0Id: string): Promise<User | null> => {
  const user = await UserModel.findOne({ auth0Id });

  if (user === null) return null;

  return sanitizeUser(user);
};

export const createUser = async (auth0Id: string): Promise<User> => {
  const user = await UserModel.create({ auth0Id, feeds: DefaultFeeds });

  return sanitizeUser(user);
};
