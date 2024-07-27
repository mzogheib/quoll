import { HttpService } from "@quoll/lib";

if (!process.env.CLIENT_OAUTH_URL) {
  throw new Error("Client OAuth URL not found");
}

if (!process.env.STRAVA_CLIENT_ID || !process.env.STRAVA_CLIENT_SECRET) {
  throw new Error("Strava credentials not found");
}

type TokenResponse = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
};

type DeauthorizeResponse = {
  access_token: string;
};

type RefreshResponse = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

class StravaAuthApi extends HttpService {
  constructor(params: {
    base_url: string;
    client_id: string;
    client_secret: string;
    redirect_uri: string;
  }) {
    const { base_url, client_id, client_secret, redirect_uri } = params;

    super(base_url);

    this.baseOauthUrl = base_url;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.redirect_uri = redirect_uri;
  }

  private client_id: string;
  private client_secret: string;
  private redirect_uri: string;
  private baseOauthUrl: string;

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

  async authorize(params: { code: string }) {
    const data = {
      code: params.code,
      client_id: this.client_id,
      client_secret: this.client_secret,
      grant_type: "authorization_code",
    };

    return super.request<TokenResponse>({
      method: "POST",
      endpoint: "/token",
      payload: data,
    });
  }

  async deauthorize(params: { access_token: string }) {
    return super.request<DeauthorizeResponse>({
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
    return super.request<RefreshResponse>({
      method: "POST",
      endpoint: "/token",
      payload: data,
    });
  }
}

export const stravaAuthApi = new StravaAuthApi({
  base_url: "https://www.strava.com/oauth",
  redirect_uri: process.env.CLIENT_OAUTH_URL,
  client_id: process.env.STRAVA_CLIENT_ID,
  client_secret: process.env.STRAVA_CLIENT_SECRET,
});
