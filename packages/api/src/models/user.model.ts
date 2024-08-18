import { FeedName } from "@quoll/lib/modules";
import { HydratedDocument, Schema, model } from "mongoose";

export type IAuth = {
  expiry_time: number;
  access_token: string;
  refresh_token: string;
};

type IFeed = {
  name: FeedName;
  auth: IAuth | null;
};

type IUser = {
  feeds: IFeed[];
  auth0Id: string;
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
  auth0Id: {
    type: String,
    required: true,
  },
});

export const UserModel = model<IUser>("User", schema, "users");
