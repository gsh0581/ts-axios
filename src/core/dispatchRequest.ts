import { AxiosRequestConfig, AxoisPromise, AxoisResponse } from '../types/index'
import xhr from '../xhr'
import { buildURL } from '../helpers/url'
import { processHeaders } from '../helpers/headers'
import { transformRequest, transformResponse } from '../helpers/data'
export default function dispatchRequest(config: AxiosRequestConfig): AxoisPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 断言URL不为空
  return buildURL(url!, params)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transfromResponseData(res: AxoisResponse): AxoisResponse {
  res.data = transformResponse(res.data)
  return res
}
