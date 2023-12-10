import axios, { AxiosRequestConfig } from "axios";

// TODO: come up with a better way than this. Redux or a cookie.
let authHeader: AxiosRequestConfig["headers"];

const authenticate = (userId: string) => {
  authHeader = { Authorization: `Basic ${userId}:` };
};

interface RequestParams {
  endpoint: string;
  params?: AxiosRequestConfig["params"];
  payload?: AxiosRequestConfig["data"];
}

const makeUrl = ({ endpoint, params }: RequestParams) => {
  const baseUrl = `${process.env.REACT_APP_API_URL}/${endpoint}`;

  const search = new URLSearchParams(params);
  const searchString = search.toString();

  if (searchString) return `${baseUrl}?${searchString}`;

  return baseUrl;
};

const get = async <ResponseData>({ endpoint, params }: RequestParams) => {
  const config = { headers: authHeader };

  const url = makeUrl({ endpoint, params });

  const response = await axios.get<ResponseData>(url, config);

  return response.data;
};

const post = async <ResponseData>({
  endpoint,
  payload,
  params,
}: RequestParams) => {
  const config = { headers: authHeader };

  const url = makeUrl({ endpoint, params });

  const response = await axios.post<ResponseData>(url, payload, config);

  return response.data;
};

const deleteReq = async <ResponseData>({ endpoint, params }: RequestParams) => {
  const config = { headers: authHeader };

  const url = makeUrl({ endpoint, params });

  const response = await axios.delete<ResponseData>(url, config);

  return response.data;
};

const apiService = {
  authenticate,
  get,
  post,
  delete: deleteReq,
};

export default apiService;
