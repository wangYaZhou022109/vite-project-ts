import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { store } from '@/store'
import { ResponseJson } from '@/interface'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 100000, // 请求超时时间
  withCredentials: true, // 允许携带cookie
  headers: {
    SsoToken: ''
  }
})

// request 拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.data = qs.stringify(config.data)
    config.headers.SsoToken = store.getters['SSO/TOKEN']()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// response 拦截器
service.interceptors.response.use(
  (response: any) => {
    const router = useRouter()
    const code = response.data.code
    if (code === -1) {
      // token失效
      store.commit('SSO/removeToken')
      store.dispatch('SSO/getToken')
    }
    if (code === -403 && !response.config.ignore403) {
      // 没有权限
      router.replace({ name: '403' })
    }
    if (code && code !== 0) {
      // 统一错误提示
      message.error(response.data.message)
    }
    return response
  },
  error => {
    const msg = error.message
    message.error(msg)
    return Promise.reject(error)
  }
)

export const GET = (url: string, ...params: any) =>
  service
    .get(url, ...params)
    .then((res: ResponseJson) => res.data)
    .catch(err => console.log(err))
export const POST = (url: string, ...params: any) =>
  service
    .post(url, ...params)
    .then((res: ResponseJson) => res.data)
    .catch(err => console.log(err))
