import { AxiosRequestConfig } from './types';
import xhr from './xhr';
import { buildURL } from './helpers/url';
import { transformRequest } from './helpers/data';
import { processHeaders } from './helpers/headers';
function axios(config: AxiosRequestConfig): void {
    // TODO
    processConfig(config)
    xhr(config)
}
function processConfig(config: AxiosRequestConfig): void {
    //对url进行转化
    config.url = transformURL(config)
    config.headers = transformHeaders(config)
    config.data = transfromRequestData(config)
}
function transformURL(config: AxiosRequestConfig): string {
    const { url, params } = config
    return buildURL(url, params)
}
function transfromRequestData(config:AxiosRequestConfig):string{
    return transformRequest(config.data)
}
function transformHeaders(config:AxiosRequestConfig):any{
    const {headers={},data}  = config
    return processHeaders(headers,data)
}
export default axios