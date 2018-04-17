// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import httpPlugin from '@/assets/js/http'

import './assets/css/style.css'

Vue.use(ElementUI)

Vue.use(httpPlugin)

Vue.config.productionTip = false

// 给Vue原型添加成员，给成员名加前缀$
// Vue.prototype.$http = axios实例
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
