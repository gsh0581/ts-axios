import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { AxoisPromise, AxoisResponse } from './types/index'
function axios(config: AxiosRequestConfig): AxoisPromise {
  // TODO
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig): void {
  //对url进行转化
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transfromRequestData(config)
}
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}
function transfromRequestData(config: AxiosRequestConfig): string {
  return transformRequest(config.data)
}
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformResponseData(res: AxoisResponse): AxoisResponse {
  res.data = transformResponse(res.data)
  return res
}
export default axios
