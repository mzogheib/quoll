import { HttpService } from "../../services";

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

type Params = {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
};

export class StravaAuthApi extends HttpService {
  constructor(params: Params) {
    const { baseUrl, clientId, clientSecret, redirectUri, scopes } = params;

    super(baseUrl);

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.scopes = scopes;
  }

  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private scopes: string[];

  url() {
    const queryParams = {
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      response_type: "code",
      scope: this.scopes.join(","),
    };
    const searchString = new URLSearchParams(queryParams).toString();

    return `${this.baseUrl}/authorize?${searchString}`;
  }

  async authorize(params: { code: string }) {
    const data = {
      code: params.code,
      client_id: this.clientId,
      client_secret: this.clientSecret,
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
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: "refresh_token",
    };
    return super.request<TokenResponse>({
      method: "POST",
      endpoint: "/token",
      payload: data,
    });
  }
}
