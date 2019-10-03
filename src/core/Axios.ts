import { AxiosRequestConfig, AxoisPromise,AxoisResponse, Method, ResovledFn, RejectedFn } from '../types'
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './InterceptorManager'
interface Interceptors {
  request:InterceptorManager<AxiosRequestConfig>,
  response:InterceptorManager<AxoisResponse>,
}
interface PromiseChain<T>{
  resolved:ResovledFn<T>|((config:AxiosRequestConfig)=>AxoisPromise),
  rejected?:RejectedFn
}
export default class Axios {
  interceptors:Interceptors
  constructor() {
    this.interceptors  = {
      request:new InterceptorManager<AxiosRequestConfig>(),
      response:new InterceptorManager<AxoisResponse>()
    }
  }
  request(url:any,config?: any): AxoisPromise {
    if(typeof url === 'string'){
      if(!config){
        config = {}
      }
      config.url = url
    }else{
      config = url
    }

    const chain:PromiseChain<any>[] = [{
      resolved:dispatchRequest,
      rejected:undefined
    }]
    this.interceptors.request.forEach(interceptor=>{
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor=>{
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while(chain.length){
      const {resolved,rejected} = chain.shift()!
      promise = promise.then(resolved,rejected)
    }

    return promise
  }
  get(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('get', url, {
      method: 'get',
      url
    })
  }
  delete(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('delete', url, {
      method: 'delete',
      url
    })
  }
  head(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('options', url, {
      method: 'options',
      url
    })
  }
  post(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('post', url, {
      method: 'post',
      url
    })
  }
  put(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('put', url, {
      method: 'put',
      url
    })
  }
  patch(url: string, config?: AxiosRequestConfig): AxoisPromise {
    return this._requestMethodWithoutData('patch', url, {
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
