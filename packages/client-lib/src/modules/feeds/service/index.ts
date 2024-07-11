import { FeedName } from "@quoll/lib";
import { AuthenticatedApiService } from "../../../utils";

type AuthenticatePayload = {
  code: string;
};

const endpoint = "/feed-auth";

export class FeedsService extends AuthenticatedApiService {
  async connect(feed: FeedName) {
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
    });
  }
}
