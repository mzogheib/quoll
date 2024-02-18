import axios, { AxiosRequestConfig } from "axios";

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

  private makeUrl({ endpoint, params }: RequestParams) {
    const baseUrl = `${this.baseUrl}/${endpoint}`;

    const search = new URLSearchParams(params);
    const searchString = search.toString();

    if (searchString) return `${baseUrl}?${searchString}`;

    return baseUrl;
  }

  authenticate(userId: string): void {
    this.authHeader = { Authorization: `Basic ${userId}:` };
  }

  async get<ResponseData>({ endpoint, params }: RequestParams) {
    const config = { headers: this.authHeader };

    const url = this.makeUrl({ endpoint, params });

    const response = await axios.get<ResponseData>(url, config);

    return response.data;
  }

  async post<ResponseData>({ endpoint, payload, params }: RequestParams) {
    const config = { headers: this.authHeader };

    const url = this.makeUrl({ endpoint, params });

    const response = await axios.post<ResponseData>(url, payload, config);

    return response.data;
  }

  async delete<ResponseData>({ endpoint, params }: RequestParams) {
    const config = { headers: this.authHeader };

    const url = this.makeUrl({ endpoint, params });

    const response = await axios.delete<ResponseData>(url, config);

    return response.data;
  }
}
