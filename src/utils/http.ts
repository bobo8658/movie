
import axios from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
// 创建axios实例
// 创建请求时可以用的配置选项

const NETWORK_ERROR = '网络请求异常，请稍后重试'

const instance = axios.create({
  // withCredentials: true,
  timeout: 10000,
  baseURL: '/api'
  // baseURL: 'https://mock.presstime.cn/mock/6256653783da890038860ad2'
})
// axios的全局配置
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.interceptors.request.use(
  (config) => {
    config.data = qs.stringify(config.data)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const errorHandle = (status: number, other: string) => {
  switch (status) {
    case 400:
      ElMessage.error('信息校验失败')
      break
    case 401:
      ElMessage.error('认证失败')
      break
    case 403:
      ElMessage.error('token校验失败')
      break
    case 404:
      ElMessage.error('请求的资源不存在')
      break
    default:
      ElMessage.error(other)
      break
  }
}

// 添加响应拦截器
instance.interceptors.response.use(
  // 响应包含以下信息data,status,statusText,headers,config
  (res) => {
    const { status } = res
    const { code, data, msg } = res.data
    if (status === 200) {
      if (code === 200) {
        return Promise.resolve(data)
      } else {
        ElMessage.error(msg)
        return Promise.reject(msg)
      }
    } else {
      ElMessage.error(NETWORK_ERROR)
      return Promise.reject(NETWORK_ERROR)
    }
  },
  (err) => {
    ElMessage.error(err)
    const { response } = err
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    }
    ElMessage.error('请求失败')
    return true
  }
)

export default instance
