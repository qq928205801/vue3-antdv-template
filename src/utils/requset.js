import axios from 'axios'

// axios对象
const service = axios.create({
    timeout: 5000
})
// 请求拦截器，目前用于保证 auth 信息为最新,修改密码后auth需要更新
service.interceptors.request.use(
    config => {
        // 从localstorage或者store中读取token，添加到请求的header指定字段
        // 除登录请求之外，所有的请求都需要携带token信息
        config.headers['Authorization'] = localStorage.token || '';
        return config
    }, error => {
        console.log(error);
        return Promise.reject(error);
    }
);
// 响应拦截器，根据状态码判断token是否失效，若失效，则进行相应处理
service.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    return Promise.reject(error)
});

export default service
