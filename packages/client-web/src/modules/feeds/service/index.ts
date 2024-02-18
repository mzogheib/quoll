import { FeedName } from "@quoll/lib";

import { apiService } from "services/api";
import { AuthenticatePayload } from "../types";

const endpoint = "feed-auth";

const getOauthUrl = (feed: FeedName) =>
  apiService.get<string>({ endpoint, params: { feed } });

const authenticate = (feed: FeedName, payload: AuthenticatePayload) =>
  apiService.post<void>({ endpoint, payload, params: { feed } });

const deauthorize = (feed: FeedName) =>
  apiService.delete<void>({ endpoint, params: { feed } }).then(() => {
    // TODO: this should come from the BE
    if (feed === "moves") {
      return "Remember to revoke access in the Moves app.";
    }
  });

const feedsService = {
  getOauthUrl,
  authenticate,
  deauthorize,
};

export default feedsService;
