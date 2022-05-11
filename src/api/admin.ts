import instance from '../utils/http'

// 用户
export const login = (params: any) => {
  return instance({
    method: 'post',
    url: '/admin/login',
    data: params
  })
}