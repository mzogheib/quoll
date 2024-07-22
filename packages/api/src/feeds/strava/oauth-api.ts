if (!process.env.CLIENT_OAUTH_URL) {
  throw new Error("Client OAuth URL not found");
}

if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
  throw new Error("Strava credentials not found");
}

class StravaAuthApi {
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

  private baseOauthUrl = "https://www.strava.com/oauth";

  private async request(params: {
    method: string;
    endpoint: string;
    payload: any;
  }) {
    const { method, endpoint, payload } = params;

    const url = `${this.baseOauthUrl}${endpoint}`;

    const init: RequestInit = {
      method,
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, init);

    const responseJson = await response.json();

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
      scope: "read,read_all,activity:read_all",
    };
    const searchString = new URLSearchParams(queryParams).toString();

    return `${this.baseOauthUrl}/authorize?${searchString}`;
  }

  async token(params: { code: string }) {
    const data = {
      code: params.code,
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: "authorization_code",
    };

    return this.request({ method: "POST", endpoint: "/token", payload: data });
  }

  async deauthorize(params: { access_token: string }) {
    return this.request({
      method: "POST",
      endpoint: "/deauthorize",
      payload: params,
    });
  }

  async refresh(params: { refresh_token: string }) {
    const data = {
      refresh_token: params.refresh_token,
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: "refresh_token",
    };
    return this.request({ method: "POST", endpoint: "/token", payload: data });
  }
}

export const stravaAuthApi = new StravaAuthApi({
  redirect_uri: process.env.CLIENT_OAUTH_URL,
  client_id: process.env.STRAVA_CLIENT_ID,
  client_secret: process.env.STRAVA_CLIENT_SECRET,
});
