import { POST, GET } from '@/lib/axios'
import { RequestJson } from '@/interface'

export const getData = (params?: RequestJson) => GET('/lesson/course/list', params)
