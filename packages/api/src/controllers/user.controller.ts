import { User } from "@quoll/lib";
import { UserDoc, UserModel } from "../models/user.model";

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
