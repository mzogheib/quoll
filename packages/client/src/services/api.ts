import axios, { AxiosRequestConfig } from 'axios'

const makeUrl = (endpoint: string) =>
  `${process.env.REACT_APP_API_URL}/${endpoint}`

// TODO: come up with a better way than this. Redux or a cookie.
let authHeader: AxiosRequestConfig['headers']

const authenticate = (userId: string) => {
  authHeader = { Authorization: `Basic ${userId}:` }
}

interface RequestParams {
  endpoint: string
  params?: AxiosRequestConfig['params']
  payload?: AxiosRequestConfig['data']
}

const get = async <ResponseData>({ endpoint, params }: RequestParams) => {
  const config = { headers: authHeader }

  const search = new URLSearchParams(params)
  const searchString = search.toString()

  const url = `${makeUrl(endpoint)}${searchString}`

  const response = await axios.get<ResponseData>(url, config)

  return response.data
}

const post = async <ResponseData>({ endpoint, payload }: RequestParams) => {
  const config = { headers: authHeader }

  const response = await axios.post<ResponseData>(
    makeUrl(endpoint),
    payload,
    config
  )

  return response.data
}

const deleteReq = async <ResponseData>({ endpoint, params }: RequestParams) => {
  const config = { headers: authHeader }

  const search = new URLSearchParams(params)
  const searchString = search.toString()

  const url = `${makeUrl(endpoint)}${searchString}`

  const response = await axios.delete<ResponseData>(url, config)

  return response.data
}

const apiService = {
  authenticate,
  get,
  post,
  delete: deleteReq,
}

export default apiService
