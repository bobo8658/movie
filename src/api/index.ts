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
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: params
  })
}
export const sendEmail = (params: any) => {
  return instance({
    method: 'post',
    url: '/user/sendEmail',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
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
export const inquireMovieDetail = (params: any) => {
  return instance({
    method: 'post',
    url: 'movie/inquireAll',
    data: params
  })
}
export const addUserEvaluate = (params: any) => {
  return instance({
    method: 'post',
    url: 'evaluate/add',
    data: params
  })
}
// 订单
export const addOrder = (params: any) => {
  return instance({
    method: 'post',
    url: 'order/addOrder',
    data: params
  })
}
// 预定
export const addBook = (params: any) => {
  return instance({
    method: 'post',
    url: 'book/add',
    data: params
  })
}
