import { AxiosRequestConfig, AxoisPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'
export default class Axios {
  request(config: AxiosRequestConfig): AxoisPromise {
    return dispatchRequest(config)
  }
  get(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('get', url, {
      method: 'get',
      url
    })
  }
  delete(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('get', url, {
      method: 'delete',
      url
    })
  }
  head(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('get', url, {
      method: 'options',
      url
    })
  }
  post(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('get', url, {
      method: 'post',
      url
    })
  }
  put(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('get', url, {
      method: 'put',
      url
    })
  }
  patch(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('get', url, {
      method: 'patch',
      url
    })
  }
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
