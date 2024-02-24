import { FeedName } from "@quoll/lib";

export type FeedsService = {
  getOauthUrl: (feedName: FeedName) => Promise<string>;
  authenticate: (feed: FeedName, payload: { code: string }) => Promise<null>;
  deauthorize: (feed: FeedName) => Promise<string | undefined>;
};
