import { FeedName, User } from "@quoll/lib/modules";
import { IAuth, UserDoc, UserModel } from "../models/user.model";

const DefaultFeeds = [
  { name: "strava", auth: null },
  { name: "toshl", auth: null },
];

function sanitizeUser(user: UserDoc): User {
  const feeds = user.feeds.map((feed) => {
    return {
      name: feed.name,
      isConnected: !!feed.auth,
    };
  });

  return {
    _id: user._id.toString(),
    feeds,
  };
}

export const createUser = async () => {
  //  Not relevant here so we can make it up
  const auth0Id = Math.random().toString(36).substring(2, 18);

  const user = await UserModel.create({
    auth0Id,
    feeds: DefaultFeeds,
  });
  return sanitizeUser(user);
};

export const login = async (userId: string) => {
  const user = await get(userId);
  return sanitizeUser(user);
};

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
