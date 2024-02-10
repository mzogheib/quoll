import { FeedName } from "@quoll/lib";

interface UserFeed {
  name: FeedName;
  isConnected: boolean;
}

export interface User {
  _id: string;
  feeds: UserFeed[];
}
