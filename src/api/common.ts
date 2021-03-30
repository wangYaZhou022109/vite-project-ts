import { POST, GET } from '@/lib/axios'
import { RequestJson } from '@/interface'

export const getMenus = (params?: RequestJson) => POST('/permission/menu', params) // 获菜单列表
export const getQcloudTmpkeys = () => GET('/oss/credential')
