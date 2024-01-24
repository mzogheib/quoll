import { FeedName } from "../../modules/feeds/types";

interface UserFeed {
  name: FeedName;
  isConnected: boolean;
}

export interface User {
  _id: string;
  feeds: UserFeed[];
}
