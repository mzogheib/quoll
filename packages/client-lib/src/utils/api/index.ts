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

  async request<Response>({
    method,
    endpoint,
    params,
    payload,
  }: RequestParams) {
    const init = {
      method,
      url: this.makeUrl(endpoint, params),
      payload,
      headers: {
        ...this.authHeader,
      },
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, init);
    const jsonData = await response.json();

    if (response.ok) return jsonData as Response;

    throw new Error(JSON.stringify(jsonData));
  }

  authenticate(userId: string): void {
    this.authHeader = { Authorization: `Basic ${userId}:` };
  }
}
