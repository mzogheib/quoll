import { HttpService } from "../../services";
import { ToshlEntry, ToshlTag } from "./types";

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

    return await super.request<ToshlEntry[]>({
      method: "GET",
      endpoint: "/entries",
      headers: this.makeAuthHeader(accessToken),
      params: { from, to },
    });
  }

  async tagsList(params: { accessToken: string }) {
    const { accessToken } = params;

    return await super.request<ToshlTag[]>({
      method: "GET",
      endpoint: "/tags",
      headers: this.makeAuthHeader(accessToken),
    });
  }
}
