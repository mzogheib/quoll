import {
  AuthenticatedHttpService,
  FeedConnectionConfig,
  FeedName,
} from "@quoll/lib";

type AuthenticatePayload = {
  code: string;
};

const endpoint = "/feed-auth";

export class FeedsService extends AuthenticatedHttpService {
  async connect(feed: FeedName) {
    return this.request<FeedConnectionConfig>({
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
    });
  }
}
