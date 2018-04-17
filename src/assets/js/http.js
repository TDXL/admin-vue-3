import axios from 'axios'
import {getToken} from '@/assets/js/auth'

const httpPlugin = {}
// const token = getToken()
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加请求拦截器
// 就是一个方法
// 当使用axios发起请求时，就会先经过拦截器
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (config.url !== '/login') {
    config.headers['Authorization'] = getToken()
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

httpPlugin.install = function (Vue, options) {
  // 4. 添加实例方法
  // Vue.prototype.$http = axios.create({
  //   baseURL: 'http://localhost:8888/api/private/v1/',
  //   // headers: { // 初始就会调用，且只调用一次 而未登录时没有token
  //   //   Authorization: token
  //   // }
  // })
  Vue.prototype.$http = http
}

export default httpPlugin
