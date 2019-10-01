import { AxoisInstance } from './types/index';
import Axios from './core/Axios';
import { extend } from './helpers/util';
function createInstance():AxoisInstance {
    const context = new Axios()
    const instance = Axios.prototype.request.bind(context)

    extend(instance,context)
    
    return instance as AxoisInstance
    
}
const axios = createInstance()

export default axios