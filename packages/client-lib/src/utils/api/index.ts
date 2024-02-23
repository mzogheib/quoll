type RequestParams = {
  method: "GET" | "PUT" | "POST" | "DELETE";
  endpoint: string;
  params?: Record<string, string>;
  payload?: object;
};

export class ApiService {
  private baseUrl: string;
  private authHeader?: { Authorization: string };

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private makeUrl(endpoint: string, params?: Record<string, string>) {
    const baseUrl = `${this.baseUrl}${endpoint}`;

    const search = new URLSearchParams(params);
    const searchString = search.toString();

    if (searchString) return `${baseUrl}?${searchString}`;

    return baseUrl;
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
  async request<Response>({
    method,
    endpoint,
    params,
    payload,
  }: RequestParams): Promise<Response> {
    const url = this.makeUrl(endpoint, params);
    const init = {
      method,
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        ...this.authHeader,
      },
    };

    const response = await fetch(url, init);

    const contentHeader = response.headers.get("Content-Length");
    const hasContent = contentHeader && contentHeader !== "0";

    if (response.ok) {
      // The caller should know whether or not the response has content.
      // If it does, the `Response` type will be set as non-null.
      // If it does not, the `Response` type will be set as `null`.
      // Hence the type cast at the return statement will always match the
      // intention of the caller.

      const responseJson = hasContent ? await response.json() : null;

      return responseJson as Response;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  }

  authenticate(userId: string): void {
    this.authHeader = { Authorization: `Basic ${userId}:` };
  }
}
