import axios from 'axios'

const baseUrl = process.env.API_URL

let authHeader

const authenticate = (userId) => {
  authHeader = { Authorization: `Basic ${userId}:` }
}

const request = (method, endpoint, params, payload) => {
  const options = {
    method,
    url: `${baseUrl}/${endpoint}`,
    params,
    data: payload,
    headers: authHeader,
  }
  return axios(options)
}

const get = ({ endpoint, params }) =>
  new Promise((resolve, reject) => {
    request('GET', endpoint, params)
      .then((response) => resolve(response.data))
      .catch(reject)
  })

const post = ({ endpoint, params, payload }) =>
  new Promise((resolve, reject) => {
    request('POST', endpoint, params, payload)
      .then((response) => resolve(response.data))
      .catch(reject)
  })

const deleteReq = ({ endpoint, params }) =>
  new Promise((resolve, reject) => {
    request('DELETE', endpoint, params)
      .then((response) => resolve(response.data))
      .catch(reject)
  })

export default {
  authenticate,
  get,
  post,
  delete: deleteReq,
}
