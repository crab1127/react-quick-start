/** @format */
import axios from 'axios'
import config from '../config'

export const request = axios.create({
  baseURL: config.API_ROOT,
  timeout: 20000,
})

// 该平台的
request.interceptors.request.use(
  req => {
    if (!req.params) {
      req.params = {}
    }
    req.params.access_token = sessionStorage.getItem('TOKEN')
    for (const key in req.params) {
      if (req.params[key] === '') {
        delete req.params[key]
      }
    }
    return req
  },
  error => {
    Promise.reject(error)
  },
)
request.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    if (!error.response) {
      return Promise.reject(error)
    } else if (error.response.status === 401) {
      console.error('请重新登录')
    } else if (error.response.status === 403) {
      console.error('没权限操作')
    } else {
      console.error(error.response.data.msg || error.response.data.message)
    }
    return Promise.reject(error.response)
  },
)
