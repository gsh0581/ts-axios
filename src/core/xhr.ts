import { AxiosRequestConfig, AxoisPromise, AxoisResponse } from '../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxoisPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    if (timeout) {
      request.timeout = timeout
    }

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxoisResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)

      function handleResponse(response: AxoisResponse) {
        if (response.status >= 200 && response.status < 300) {
          resolve(response)
        } else {
          reject(
            createError(
              `Request failed with status code ${response.status}`,
              config,
              null,
              request,
              response
            )
          )
        }
      }
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    request.send(data)

    request.onerror = function handleError() {
      reject(createError(`Network Error`, config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }
  })
}
