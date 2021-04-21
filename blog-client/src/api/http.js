import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router';



//请求拦截器
axios.interceptors.request.use(function (config) {
    // console.log(config)
    //判断 token 是否储存在 localstorage 当中，并放入请求头中
    if(localStorage.okokToken) config.headers.Authorization = localStorage.okokToken
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

//响应拦截器
axios.interceptors.response.use(function (response) {
    // console.log(response)
    return response;
  }, function (error) {
    Message.error(error.response.data)
    const { status} = error.response
    if(status === 401) {
      Message.error('token值无效，请重新登录')
      localStorage.removeItem('okokToken')
      router.push('/login')
    }
    return Promise.reject(error);
});

export default axios