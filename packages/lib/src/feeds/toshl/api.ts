import { HttpService } from "../../services";
import { Entry, Tag } from "./types";

type Params = {
  baseUrl: string;
};

export class ToshlApi extends HttpService {
  constructor({ baseUrl }: Params) {
    super(baseUrl);
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
