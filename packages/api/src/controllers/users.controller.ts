import { FeedName } from "@quoll/lib/modules";
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
