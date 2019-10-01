import axios from '../../src/index'
axios({
    url: '/extend/post',
    method: 'post',
    params: {
        msg: 'hi'
    }
})
// axios.request({
//     url:'/extend/post',
//     method:'post',
//     data:{
//         msg:'hello'
//     }
// })
axios('/extend/post',{
    method:'post',
    data:{
        msg:'siri'
    }
})

axios.get('/extend/get')

axios.options('/extend/options')

axios.delete('/extend/delete')

axios.head('/extend/head')

axios.post('/extend/post',{msg:'post'})

axios.put('/extend/put',{msg:'put'})

axios.patch('/extend/patch',{msg:'patch'})

