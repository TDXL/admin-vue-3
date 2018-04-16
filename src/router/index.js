import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Login from '@/components/login/login'
import UserList from '@/components/user-list/user-list'
import RoleList from '@/components/role-list/role-list'
import {getUserInfo} from '@/assets/js/auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'user-list',
          path: '/users',
          component: UserList
        },
        {
          name: 'role-list',
          path: '/roles',
          component: RoleList
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})
// 加路由拦截器（导航钩子、守卫）
//    接下来所有的视图导航都必须经过这道关卡
router.beforeEach((to, from, next) => {
  // 1. 添加全局路由导航守卫
  // 2. 拿到当前请求的视图路径标识
  if (to.name === 'login') { // 2.1 如果是访问登陆组件，则让其通过
    next()
  } else {
    // 检查登陆状态令牌
    // const token = window.localStorage.getItem('admin-token')
    if (!getUserInfo()) { // 2.2.1 无令牌，则让其登陆去
      next({
        name: 'login'
      })
    } else { // 2.2.2 有令牌就允许通过
      next()
    }
  }
  next()
})
export default router
