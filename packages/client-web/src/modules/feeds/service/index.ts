import { AuthenticatedApiService, FeedsService } from "@quoll/client-lib";
import { FeedName } from "@quoll/lib";

import { getAccessToken } from "services/session";

type AuthenticatePayload = {
  code: string;
};

const endpoint = "/feed-auth";

class _FeedsService extends AuthenticatedApiService implements FeedsService {
  async getOauthUrl(feed: FeedName) {
    return this.request<string>({
      method: "GET",
      endpoint,
      params: { feed },
    });
  }

  async authenticate(feed: FeedName, payload: AuthenticatePayload) {
    return this.request<null>({
      method: "POST",
      endpoint,
      payload,
      params: { feed },
    });
  }

  async deauthorize(feed: FeedName) {
    return this.request<null>({
      method: "DELETE",
      endpoint,
      params: { feed },
    }).then(() => {
      // TODO: this should come from the BE
      if (feed === "moves") {
        return "Remember to revoke access in the Moves app.";
      }
    });
  }
}

const feedsService = new _FeedsService(
  getAccessToken,
  `${process.env.REACT_APP_API_URL}`,
);

export default feedsService;
