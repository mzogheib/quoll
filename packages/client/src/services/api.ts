import axios, { AxiosRequestConfig } from 'axios'

const baseURL = process.env.REACT_APP_API_URL

let authHeader: AxiosRequestConfig['headers']

const authenticate = (userId: string) => {
  authHeader = { Authorization: `Basic ${userId}:` }
}

type RequestParams = {
  endpoint: string
  params: AxiosRequestConfig['params']
  payload: AxiosRequestConfig['data']
}

const get = ({ endpoint, params }: RequestParams) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      baseURL,
      url: endpoint,
      params,
      headers: authHeader,
    })
      .then((response) => resolve(response.data))
      .catch(reject)
  })

const post = ({ endpoint, params, payload }: RequestParams) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      baseURL,
      url: endpoint,
      params,
      data: payload,
      headers: authHeader,
    })
      .then((response) => resolve(response.data))
      .catch(reject)
  })

const deleteReq = ({ endpoint, params }: RequestParams) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      baseURL,
      url: endpoint,
      params,
      headers: authHeader,
    })
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
