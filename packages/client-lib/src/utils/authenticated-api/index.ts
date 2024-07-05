import { ApiService, RequestParams } from "../api";

export abstract class AuthenticatedApiService extends ApiService {
  private getAccessToken: () => Promise<string>;

  constructor(getAccessToken: () => Promise<string>, baseUrl: string) {
    super(baseUrl);
    this.getAccessToken = getAccessToken;
  }

  protected async request<Response>(params: RequestParams) {
    const { headers, ...rest } = params;

    const accessToken = await this.getAccessToken();

    const allHeaders = {
      ...headers,
      authorization: `Bearer ${accessToken}`,
    };

    return await super.request<Response>({ ...rest, headers: allHeaders });
  }
}
