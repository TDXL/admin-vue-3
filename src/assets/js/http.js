import axios from 'axios'

// export default axios.create({
//   baseURL: 'http://localhost:8888/api/private/v1/'
// })

const httpPlugin = {}

httpPlugin.install = function (Vue, options) {
  // 4. 添加实例方法
  Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:8888/api/private/v1/'
  })
}

export default httpPlugin
