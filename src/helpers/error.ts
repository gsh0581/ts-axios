import { AxiosRequestConfig, AxoisResponse } from '../types/index';
export class AxoisError extends Error{
    config:AxiosRequestConfig
    isAxiosError:boolean
    code?:string|null
    request?:any
    response?:AxoisResponse
    constructor(
        message:string,
        config:AxiosRequestConfig,
        code?:string|null,
        request?:any,
        response?:AxoisResponse
    ){
        super(message)
        this.config = config
        this.code = code
        this.request = request
        this.response = response
        this.isAxiosError = true
        Object.setPrototypeOf(this,AxoisError.prototype)
    }
}   
export function createError (
    message:string,
    config:AxiosRequestConfig,
    code?:string|null,
    request?:any,
    response?:AxoisResponse
): AxoisError{
    const error = new AxoisError(message,config,code,request,response)

    return error
}
