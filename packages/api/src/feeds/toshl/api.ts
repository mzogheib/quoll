import { HttpService } from "@quoll/lib/services";

type Entry = {
  id: string;
  tags: string[];
};

type Tag = {
  id: string;
  name: string;
};

class ToshlApi extends HttpService {
  constructor() {
    super("https://api.toshl.com/");
  }

  private makeAuthHeader(accessToken: string) {
    return {
      Authorization: `Basic ${Buffer.from(`${accessToken}:`, "utf8").toString(
        "base64",
      )}`,
    };
  }

  async entriesList(params: { from: string; to: string; accessToken: string }) {
    const { from, to, accessToken } = params;

    return await super.request<Entry[]>({
      method: "GET",
      endpoint: "/entries",
      headers: this.makeAuthHeader(accessToken),
      params: { from, to },
    });
  }

  async tagsList(params: { accessToken: string }) {
    const { accessToken } = params;

    return await super.request<Tag[]>({
      method: "GET",
      endpoint: "/tags",
      headers: this.makeAuthHeader(accessToken),
    });
  }
}

export const toshlApi = new ToshlApi();
