import { AxiosRequestConfig, AxoisPromise, AxoisResponse, Method } from '../types/index'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transfrom'
export default function dispatchRequest(config: AxiosRequestConfig): AxoisPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    return transfromResponseData(res)
  })
}
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method as Method) // 添加到前置方法中
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 断言URL不为空
  return buildURL(url!, params)
}

function transfromResponseData(res: AxoisResponse): AxoisResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
