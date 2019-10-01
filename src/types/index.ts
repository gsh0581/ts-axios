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
export interface Axios {
  request(config: AxiosRequestConfig): AxoisPromise
  get(url: string, config?: AxiosRequestConfig): AxoisPromise
  delete(url: string, config?: AxiosRequestConfig): AxoisPromise
  head(url: string, config?: AxiosRequestConfig): AxoisPromise
  options(url: string, config?: AxiosRequestConfig): AxoisPromise
  post(url: string, data?: any, config?: AxiosRequestConfig): AxoisPromise
  put(url: string, data?: any, config?: AxiosRequestConfig): AxoisPromise
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxoisPromise
}
export interface AxiosRequestConfig {
  url?: string
  method?: string
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}
export interface AxoisResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
export interface AxoisPromise extends Promise<AxoisResponse> {}

export interface AxoisError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxoisResponse
  isAxoisError: boolean
}

export interface AxoisInstance extends Axios {
  (config: AxiosRequestConfig): AxoisPromise
  (url:string,config?:AxiosRequestConfig):AxoisPromise
}
