import request from '@/utils/request'

// 用户名登录
export function login(data) {
  return request({
    url: '/api-token-auth/',
    method: 'post',
    data
  })
}

// 获取用户名信息
export function getInfo() {
  return request({
    url: '/userInfo/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
