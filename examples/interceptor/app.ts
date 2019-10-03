import axios from '../../src/index'
// 请求拦截器 添加顺序与执行顺序相反，后添加先执行
axios.interceptors.request.use(config=>{
    config.headers.test +='1'
    return config
})
axios.interceptors.request.use(config=>{
    config.headers.test +='2'
    return config
})
axios.interceptors.request.use(config=>{
    config.headers.test +='3'
    return config
})
// 响应拦截器 添加顺序与执行顺序一致
axios.interceptors.response.use(res=>{
    res.data +='2'
    return res
})
axios.interceptors.response.use(res=>{
    res.data +='3'
    return res
})
let interceptor = axios.interceptors.response.use(res=>{
    res.data +='4'
    return res
})

axios.interceptors.response.eject(interceptor)

axios({
    url:'/interceptor/get',
    method:'get',
    headers:{
        test:''
    }
}).then((res) => {
   console.log(res.data) 
}).catch((err) => {
    console.error(err)
});
