import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

/* liuyannan 2019/05/24 */
// 用户列表
export function users(params) {
  return request({
    url: '/users/',
    method: 'get',
    params
  })
}

// 新增用户列表
export function create(data) {
  return request({
    url: '/users/',
    method: 'post',
    data
  })
}
