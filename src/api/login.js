import request from '../request/request'

export const login = query => {
  return request({
    url: '/v1.0/LoginController/login',
    method: 'post',
    params: query
  })
}