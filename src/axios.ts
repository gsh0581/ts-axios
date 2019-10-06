import { AxoisInstance, AxiosRequestConfig } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults' // 添加默认参数
function createInstance(config: AxiosRequestConfig): AxoisInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxoisInstance
}
const axios = createInstance(defaults)

export default axios
