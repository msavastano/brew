import axios from 'axios'

const apiInstance = axios.create({
  baseURL: process.env.API_BASEURL
})

apiInstance.interceptors.request.use(async (config) => {
  config.headers = {
    'Access-Control-Allow-Headers': 'x-rapidapi-key, x-rapidapi-host',
    'x-rapidapi-key': process.env.API_XRAPIDKEY,
    'x-rapidapi-host': process.env.API_XRAPIDHOST
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export default apiInstance