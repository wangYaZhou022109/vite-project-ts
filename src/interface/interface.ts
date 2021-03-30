export interface RequestJson {
  [key: string]: any
}

export type ResponseData = null | Array<any> | {}

export interface ResponseJson {
  code: number | string
  message: string
  data: ResponseData
}

export interface Pagination {
  size: string
  current: number
  defaultCurrent: number
  pageSize: number
  total: number
  showTotal(total: number | string): string
  showLessItems: boolean
  showQuickJumper: boolean
  showSizeChanger: boolean
  pageSizeOptions: string[]
}
