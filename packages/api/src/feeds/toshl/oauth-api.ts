if (!process.env.CLIENT_OAUTH_URL) {
  throw new Error("Client OAuth URL not found");
}

if (!process.env.TOSHL_CLIENT_ID || !process.env.TOSHL_CLIENT_SECRET) {
  throw new Error("Toshl credentials not found");
}

// Toshl Oauth is not currently working so this implementation may be broken.

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

class ToshlAuthApi {
  constructor(params: {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
  }) {
    const { client_id, client_secret, redirect_uri } = params;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.redirect_uri = redirect_uri;
  }

  private client_id: string;
  private client_secret: string;
  private redirect_uri: string;

  private baseOauthUrl = "https://toshl.com/oauth2";

  private makeBasicAuthHeader = (username: string, password: string) => ({
    Authorization:
      "Basic " + Buffer.from(username + ":" + password).toString("base64"),
  });

  private async request<Response>(params: {
    method: string;
    endpoint: string;
    headers?: Record<string, string>;
    payload: any;
  }) {
    const { method, endpoint, headers, payload } = params;

    const url = `${this.baseOauthUrl}${endpoint}`;

    const init: RequestInit = {
      method,
      body: JSON.stringify(payload),
      headers: {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const response = await fetch(url, init);

    const responseJson = (await response.json()) as Response;

    if (response.ok) return responseJson;

    const error = {
      status: response.status,
      statusText: response.statusText,
      body: responseJson,
    };

    throw new Error(JSON.stringify(error));
  }

  url() {
    const queryParams = {
      client_id: this.client_id,
      redirect_uri: this.redirect_uri,
      response_type: "code",
    };
    const searchString = new URLSearchParams(queryParams).toString();

    return `${this.baseOauthUrl}/authorize?${searchString}`;
  }

  async authorize(params: { code: string }) {
    const payload = {
      code: params.code,
      grant_type: "authorization_code",
      redirect_uri: this.redirect_uri,
    };

    const headers = this.makeBasicAuthHeader(
      this.client_id,
      this.client_secret,
    );

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

    const headers = {
      Authorization: `Bearer ${params.access_token}`,
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

    const headers = this.makeBasicAuthHeader(
      this.client_id,
      this.client_secret,
    );

    return this.request<TokenResponse>({
      method: "POST",
      endpoint: "/token",
      headers,
      payload,
    });
  }
}

export const toshlAuthApi = new ToshlAuthApi({
  redirect_uri: process.env.CLIENT_OAUTH_URL,
  client_id: process.env.TOSHL_CLIENT_ID,
  client_secret: process.env.TOSHL_CLIENT_SECRET,
});
