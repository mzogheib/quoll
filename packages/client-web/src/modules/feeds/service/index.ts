import { FeedName } from "@quoll/lib";

import { apiService } from "services/api";

type AuthenticatePayload = {
  code: string;
};

const endpoint = "/feed-auth";

const getOauthUrl = (feed: FeedName) =>
  apiService.request<string>({
    method: "GET",
    endpoint,
    params: { feed },
  });

const authenticate = (feed: FeedName, payload: AuthenticatePayload) =>
  apiService.request<null>({
    method: "POST",
    endpoint,
    payload,
    params: { feed },
  });

const deauthorize = (feed: FeedName) =>
  apiService
    .request<null>({
      method: "DELETE",
      endpoint,
      params: { feed },
    })
    .then(() => {
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
