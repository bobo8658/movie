import instance from '../utils/http'

// 前台

// 用户
export const login = (params: any) => {
  return instance({
    method: 'post',
    url: '/user/login',
    data: params
  })
}
export const register = (params: any) => {
  return instance({
    method: 'post',
    url: '/user/register',
    data: params
  })
}
export const sendEmail = (params: any) => {
  return instance({
    method: 'post',
    url: '/user/sendEmail',
    data: params
  })
}
export const toVip = (params: any) => {
  return instance({
    method: 'post',
    url: '/user/toVip',
    data: params
  })
}
export const getVip = (params: any) => {
  return instance({
    method: 'post',
    url: '/user/getVip',
    data: params
  })
}
// 电影
export const inquireMovie = (params: any) => {
  return instance({
    method: 'post',
    url: 'movie/inquire',
    data: params
  })
}