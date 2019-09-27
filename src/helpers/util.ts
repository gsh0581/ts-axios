const toString = Object.prototype.toString

// 使用类型保护 以便于能获取到相应的方法
export function isDate(val:any):val is Date{
    return toString.call(val) === '[Object Date]'
}
// export function isObject(val:any):val is Object{
//     return val !== null && typeof val === 'object'
// }
// 检测普通对象
export function isPlainObject(val:any):val is Object{
    return toString.call(val) === '[object Object]'
}