import axios, { AxiosRequestConfig } from 'axios'

const baseURL = process.env.REACT_APP_API_URL

let authHeader: AxiosRequestConfig['headers']

const authenticate = (userId: string) => {
  authHeader = { Authorization: `Basic ${userId}:` }
}

const request = (
  method: AxiosRequestConfig['method'],
  url: AxiosRequestConfig['url'],
  params: AxiosRequestConfig['params'],
  data?: AxiosRequestConfig['data']
) => {
  const options: AxiosRequestConfig = {
    method,
    baseURL,
    url,
    params,
    data,
    headers: authHeader,
  }
  return axios(options)
}

type GetParams = { endpoint: string; params: AxiosRequestConfig['params'] }
const get = ({ endpoint, params }: GetParams) =>
  new Promise((resolve, reject) => {
    request('GET', endpoint, params)
      .then((response) => resolve(response.data))
      .catch(reject)
  })

type PostParams = {
  endpoint: string
  params: AxiosRequestConfig['params']
  payload: AxiosRequestConfig['data']
}
const post = ({ endpoint, params, payload }: PostParams) =>
  new Promise((resolve, reject) => {
    request('POST', endpoint, params, payload)
      .then((response) => resolve(response.data))
      .catch(reject)
  })

type DeleteParams = { endpoint: string; params: AxiosRequestConfig['params'] }
const deleteReq = ({ endpoint, params }: DeleteParams) =>
  new Promise((resolve, reject) => {
    request('DELETE', endpoint, params)
      .then((response) => resolve(response.data))
      .catch(reject)
  })

const apiService = {
  authenticate,
  get,
  post,
  delete: deleteReq,
}

export default apiService
