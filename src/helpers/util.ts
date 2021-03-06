const toString = Object.prototype.toString

// 使用类型保护 以便于能获取到相应的方法
export function isDate(val: any): val is Date {
  return toString.call(val) === '[Object Date]'
}
// export function isObject(val:any):val is Object{
//     return val !== null && typeof val === 'object'
// }
// 检测普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}
// 混合对象的实现
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
// 深合并
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
