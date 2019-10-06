export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: string
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  [propName: string]: any
}
export interface AxiosStatic extends AxoisInstance {
  create(config?: AxiosRequestConfig): AxoisInstance
  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}
export interface AxoisResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
export interface AxoisPromise<T = any> extends Promise<AxoisResponse<T>> {}

export interface AxoisError extends Error {
  isAxoisError: boolean
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxoisResponse
}

export interface AxoisInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxoisPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxoisPromise<T>
}
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxoisResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxoisPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxoisPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxoisPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxoisPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxoisPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxoisPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxoisPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxoisPromise<T>
}
export interface AxiosInterceptorManager<T> {
  // 添加拦截器
  use(resolved: ResovledFn<T>, rejected?: RejectedFn): number
  // 根据id删除拦截器
  eject(id: number): void
}
export interface ResovledFn<T> {
  (val: T): T | Promise<T>
}
export interface RejectedFn {
  (error: any): any
}
export interface AxiosTransformer {
  (data: any, headers?: any): any
}
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}
export interface Canceler {
  (message?: string): void
}
export interface CancelExecutor {
  (cancle: Canceler): void
}
export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}
export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}
export interface Cancel {
  message?: string
}
export interface CancelStatic {
  new (message?: string): Cancel
}
