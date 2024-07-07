import { FeedName } from "@quoll/lib";
import { HydratedDocument, Schema, model } from "mongoose";

export type IAuth = {
  expiry_time: string;
  access_token: string;
  refresh_token: string;
};

type IFeed = {
  name: FeedName;
  auth: IAuth | null;
};

type IUser = {
  feeds: IFeed[];
};

export type UserDoc = HydratedDocument<IUser>;

const schema = new Schema<IUser>({
  feeds: {
    type: [
      {
        name: { type: String, required: true },
        auth: { type: Object },
      },
    ],
    required: true,
  },
});

export const UserModel = model<IUser>("User", schema, "users");
