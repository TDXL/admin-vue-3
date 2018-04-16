/**
 * 自定义业务函数模块
 * 专门处理用户登陆信息以及token问题
 */

const userInfoKey = 'user-info'

export function saveUserInfo (userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}

export function getToken () {
  return JSON.parse(getUserInfo()).token
}

export function removeUserInfo () {
  window.localStorage.removeItem(userInfoKey)
}
