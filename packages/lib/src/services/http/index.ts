type Headers = Record<string, string>;

type Params = Record<string, string>;

export type RequestParams = {
  method: "GET" | "PUT" | "POST" | "DELETE";
  endpoint: string;
  headers?: Headers;
  params?: Params;
  payload?: object;
};

const baseHeaders = {
  "Content-Type": "application/json",
};

export abstract class HttpService {
  protected baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private makeUrl(endpoint: string, params?: Params) {
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
   * const data = httpService.request<null>({ ... })
   * ```
   */
  protected async request<Response>({
    method,
    endpoint,
    headers,
    params,
    payload,
  }: RequestParams): Promise<Response> {
    const url = this.makeUrl(endpoint, params);

    const allHeaders = {
      ...baseHeaders,
      ...headers,
    };

    const init = {
      method,
      body: JSON.stringify(payload),
      headers: allHeaders,
    };

    const response = await fetch(url, init);

    // The caller should know whether or not the response has content.
    // If it does, the `Response` type will be set as non-null.
    // If it does not, the `Response` type will be set as `null`.
    // Hence the value of responseJson will always match the caller's intention.
    const responseJson: Response =
      response.status === 204 ? null : await response.json();

    if (response.ok) return responseJson;

    const error = {
      status: response.status,
      statusText: response.statusText,
      body: responseJson,
    };

    throw new Error(JSON.stringify(error));
  }
}
