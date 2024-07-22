import { HttpService } from "@quoll/lib";

if (!process.env.CLIENT_OAUTH_URL) {
  throw new Error("Client OAuth URL not found");
}

if (!process.env.TOSHL_CLIENT_ID || !process.env.TOSHL_CLIENT_SECRET) {
  throw new Error("Toshl credentials not found");
}

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

  async entriesList(params: { from: string; to: string; accessToken: string }) {
    const { from, to, accessToken } = params;

    return await super.request<Entry[]>({
      method: "GET",
      endpoint: "/entries",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accessToken}:`, "utf8").toString(
          "base64",
        )}`,
      },
      params: { from, to },
    });
  }

  async tagsList(params: { accessToken: string }) {
    const { accessToken } = params;

    return await super.request<Tag[]>({
      method: "GET",
      endpoint: "/tags",
      headers: {
        Authorization: `Basic ${Buffer.from(`${accessToken}:`, "utf8").toString(
          "base64",
        )}`,
      },
    });
  }
}

export const toshlApi = new ToshlApi();
