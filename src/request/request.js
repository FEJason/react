import axios from 'axios'
// import { message as Message } from '@/function/resetMessage'
import { message as Message } from 'antd';
// import Cookies from 'js-cookie'
// import router from '@/router'

// 创建一个错误
function errorCreate(msg) {
  const error = new Error(msg)
  errorLog(error)
  throw error
}

// 记录和显示错误
function errorLog(error) {
  // 显示提示
  Message.error({
    content: error.message,
    duration: 5
  })
}

// 创建一个 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  // headers:{"Content-Type": "multipart/form-data"},
  timeout: 60000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    // const token = Cookies.get('token')
    const token = localStorage.token
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.tokenId = token
    }
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    // const code = dataAxios.status.error
    const code = dataAxios.code
    // 根据 code 进行判断
    if (code === undefined) {
      return dataAxios
    } else {
      switch (code) {
        case 0:
          return dataAxios.data
        case 8888:
          // token失效
          // router.push('/login')
          errorCreate('登陆失效，请重新登陆')
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.message}`)
          return Promise.reject(dataAxios) // 抛出错误，在 axios.().catch(err) 中可以获取回调数据
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
