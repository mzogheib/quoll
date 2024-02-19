import axios, { AxiosRequestConfig, Method } from "axios";

type RequestParams = {
  method: Method;
  endpoint: string;
  params?: AxiosRequestConfig["params"];
  payload?: AxiosRequestConfig["data"];
};

export class ApiService {
  private baseUrl: string;
  private authHeader: AxiosRequestConfig["headers"];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private makeUrl(endpoint: string, params: AxiosRequestConfig["params"]) {
    const baseUrl = `${this.baseUrl}/${endpoint}`;

    const search = new URLSearchParams(params);
    const searchString = search.toString();

    if (searchString) return `${baseUrl}?${searchString}`;

    return baseUrl;
  }

  async request<ResponseData>({
    method,
    endpoint,
    params,
    payload,
  }: RequestParams) {
    const config = { method, payload, headers: this.authHeader };

    const url = this.makeUrl(endpoint, params);

    const response = await axios<ResponseData>(url, config);

    return response.data;
  }

  authenticate(userId: string): void {
    this.authHeader = { Authorization: `Basic ${userId}:` };
  }
}
