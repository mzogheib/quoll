import { FeedName } from "@quoll/client-lib";

interface UserFeed {
  name: FeedName;
  isConnected: boolean;
}

export interface User {
  _id: string;
  feeds: UserFeed[];
}
