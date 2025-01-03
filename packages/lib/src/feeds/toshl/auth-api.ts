import { HttpService } from "../../services";

const baseHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
};

// Toshl Oauth is not currently working so this implementation may be broken.

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

type Params = {
  baseUrl: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
};

export class ToshlAuthApi extends HttpService {
  constructor(params: Params) {
    const { baseUrl, client_id, client_secret, redirect_uri } = params;

    super(baseUrl);

    this.client_id = client_id;
    this.client_secret = client_secret;
    this.redirect_uri = redirect_uri;
  }

  private client_id: string;
  private client_secret: string;
  private redirect_uri: string;

  private makeBasicAuthHeader = (username: string, password: string) => ({
    Authorization:
      "Basic " + Buffer.from(username + ":" + password).toString("base64"),
  });

  url() {
    const queryParams = {
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      response_type: "code",
    };
    const searchString = new URLSearchParams(queryParams).toString();

    return `${this.baseUrl}/authorize?${searchString}`;
  }

  async authorize(params: { code: string }) {
    const payload = {
      code: params.code,
      grant_type: "authorization_code",
      redirect_uri: this.redirect_uri,
    };

    const authHeaders = this.makeBasicAuthHeader(
      this.client_id,
      this.client_secret,
    );
    const headers = {
      ...baseHeaders,
      ...authHeaders,
    };

    return this.request<TokenResponse>({
      method: "POST",
      endpoint: "/token",
      headers,
      payload,
    });
  }

  async deauthorize(params: { refresh_token: string; access_token: string }) {
    const payload = {
      refresh_token: params.refresh_token,
    };

    const authHeaders = {
      Authorization: `Bearer ${params.access_token}`,
    };
    const headers = {
      ...baseHeaders,
      ...authHeaders,
    };

    return this.request({
      method: "POST",
      endpoint: "/revoke",
      headers,
      payload,
    });
  }

  async refresh(params: { refresh_token: string }) {
    const payload = {
      refresh_token: params.refresh_token,
      grant_type: "refresh_token",
    };

    const authHeaders = this.makeBasicAuthHeader(
      this.client_id,
      this.client_secret,
    );
    const headers = {
      ...baseHeaders,
      ...authHeaders,
    };

    return this.request<TokenResponse>({
      method: "POST",
      endpoint: "/token",
      headers,
      payload,
    });
  }
}
