import axios, { AxiosRequestConfig, Method } from "axios";

type RequestParams = {
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

  private async request<ResponseData>({
    method,
    endpoint,
    params,
  }: RequestParams & { method: Method }) {
    const config = { method, headers: this.authHeader };

    const url = this.makeUrl(endpoint, params);

    const response = await axios<ResponseData>(url, config);

    return response.data;
  }

  authenticate(userId: string): void {
    this.authHeader = { Authorization: `Basic ${userId}:` };
  }

  async get<ResponseData>({ endpoint, params }: RequestParams) {
    return await this.request<ResponseData>({
      method: "GET",
      endpoint,
      params,
    });
  }

  async post<ResponseData>({ endpoint, payload, params }: RequestParams) {
    return await this.request<ResponseData>({
      method: "POST",
      endpoint,
      payload,
      params,
    });
  }

  async delete<ResponseData>({ endpoint, params }: RequestParams) {
    return await this.request<ResponseData>({
      method: "DELETE",
      endpoint,
      params,
    });
  }
}
