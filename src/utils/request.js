import axios from 'axios'
import router from '@/router'
import {
  Message
} from 'element-ui'
// import store from '@/store'
import {
  getToken,
  removeToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is
    config.headers['Authorization'] = 'JWT ' + getToken('token')
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(res)
    return res
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(res.message || 'error')
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    let is_unknown_code = true
    const STATUS_CODE = error.response.status
    const STATUS_CODE_FUN = {
      '401': function() {
        setTimeout(() => {
          removeToken('token')
          location.href = '/login'
        }, 3000)
      },
      '403': function() {
        router.replace('dashboard')
      }
    }

    const STATUS_CODE_LIST = [
      { code: 400, message: '用户名或密码错误 !' },
      { code: 401, message: '登录过期 ! 3 秒后将为您跳转到登录页 !', callback: STATUS_CODE_FUN['401'] },
      { code: 403, message: '权限拒绝 !', callback: STATUS_CODE_FUN['403'] },
      { code: 500, message: '服务器内部错误 !' }
    ]

    for (let i = 0, II = STATUS_CODE_LIST.length; i < II; i++) {
      if (STATUS_CODE_LIST[i].code === STATUS_CODE) {
        // 错误信息提示
        Message({
          message: STATUS_CODE_LIST[i].message,
          type: 'error',
          duration: 3000
        })
        // 错误信息操作
        STATUS_CODE_LIST[i].callback && STATUS_CODE_LIST[i].callback()
        // 阻止位置错误 code 提示
        is_unknown_code = false
        break
      }
    }
    if (is_unknown_code) {
      Message({
        type: 'error',
        message: error.response.data.detail
      })
    }

    return Promise.reject(error).subr
  }
)

export default service
