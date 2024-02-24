type RequestParams = {
  method: "GET" | "PUT" | "POST" | "DELETE";
  endpoint: string;
  params?: Record<string, string>;
  payload?: object;
};

export abstract class AuthenticatedApiService {
  private baseUrl: string;
  private getAccessToken: () => Promise<string>;

  constructor(getAccessToken: () => Promise<string>, baseUrl: string) {
    this.getAccessToken = getAccessToken;
    this.baseUrl = baseUrl;
  }

  private makeUrl(endpoint: string, params?: Record<string, string>) {
    const baseUrl = `${this.baseUrl}${endpoint}`;

    const search = new URLSearchParams(params);
    const searchString = search.toString();

    if (searchString) return `${baseUrl}?${searchString}`;

    return baseUrl;
  }

  private async makeHeaders() {
    const accessToken = await this.getAccessToken();

    return {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    };
  }

  /**
   * If the endpoint will not return any content then `Response` should be
   * `null`.
   *
   * @example
   *
   * ```
   * const data = apiService.request<null>({ ... })
   * ```
   */
  protected async request<Response>({
    method,
    endpoint,
    params,
    payload,
  }: RequestParams) {
    const url = this.makeUrl(endpoint, params);
    const init = {
      method,
      body: JSON.stringify(payload),
      headers: await this.makeHeaders(),
    };

    const response = await fetch(url, init);

    const contentHeader = response.headers.get("Content-Length");
    const hasContent = contentHeader && contentHeader !== "0";

    // The caller should know whether or not the response has content.
    // If it does, the `Response` type will be set as non-null.
    // If it does not, the `Response` type will be set as `null`.
    // Hence the value of responseJson will always match the caller's intention.
    const responseJson: Response = hasContent ? await response.json() : null;

    if (response.ok) return responseJson;

    const error = {
      status: response.status,
      statusText: response.statusText,
      body: responseJson,
    };

    throw new Error(JSON.stringify(error));
  }
}
