import instance from '../utils/http'

export const login = (params: any) => {
  return instance({
    method: 'post',
    url: '/admin/login',
    data: params
  })
}
// 用户
export const allUser = () => {
  return instance({
    method: 'get',
    url: '/user/selectAll'
  })
}
export const delUser = (params: any) => {
  return instance({
    method: 'post',
    url: '/user/delete',
    data: params
  })
}
export const delUserVip = (params: any) => {
  return instance({
    method: 'post',
    url: '/user/deleteVip',
    data: params
  })
}
// 电影
export const addMovie = (params: any) => {
  return instance({
    method: 'post',
    url: '/movie/addMovie',
    data: params
  })
}
export const updateMovie = (params: any) => {
  return instance({
    method: 'post',
    url: '/movie/updateMovie',
    data: params
  })
}
export const deleteMovie = (params: any) => {
  return instance({
    method: 'post',
    url: '/movie/deleteMovie',
    data: params
  })
}
// 评论
export const deleteEvaluate = (params: any) => {
  return instance({
    method: 'post',
    url: '/evaluate/delete',
    data: params
  })
}
// 订单
export const allOrder = () => {
  return instance({
    method: 'get',
    url: '/order/selectAllOrder'
  })
}
// 类别
export const deleteMovieType = (params: any) => {
  return instance({
    method: 'post',
    url: '/movieType/delete',
    data: params
  })
}
export const addMovieType = (params: any) => {
  return instance({
    method: 'post',
    url: '/movieType/add',
    data: params
  })
}