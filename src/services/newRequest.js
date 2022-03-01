import axios from 'axios'
import Qs from 'qs'
import { message } from 'antd'
import {checkStatus} from '@/utils'
import {
    BASE_URL,
    TIMEOUT
} from './config'

let inError=false
const instance = axios.create({
    timeout : TIMEOUT,
    //允许在发送数据前修改数据
    transformRequest: [
        function (data) {
            //处理data
            return data;
        },
    ],
    async:false,
    crossDomain:true,
    transformResponse: [
        function (data) {

            return JSON.parse(data);
        },
    ],
    headers: {
        //因为后台服务器需要设定请求头中允许的字段,导致其它的请求头不通过预校验preflight,所以直接跨域报错
        //Request header field x-custom-header is not allowed by Access-Control-Allow-Headers in preflight response.
        //'X-Custom-Header': 'foobar'
        // 'Cache-Control': 'max-age=0'//设置了chache-control之后就无法实现跨域请求
        // 'content-type': 'application/x-www-form-urlencoded'
    }
});

//添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        config.headers = Object.assign(
            config.method === 'get' ? {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            } : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            config.headers,
        );
        if (config.method === 'post') {
            const contentType = config.headers['Content-Type'];
            // 根据Content-Type转换data格式
            if (contentType) {
                if (contentType.includes('multipart')) { //文件上传
                    // 类型 'multipart/form-data;'
                    // config.data = data;
                } else if (contentType.includes('json')) {
                    // 类型 'application/json;'
                    // 服务器收到的raw body(原始数据) "{name:"nowThen",age:"18"}"（普通字符串）
                    config.data = JSON.stringify(config.data);
                } else {
                    // 类型 'application/x-www-form-urlencoded;'
                    // 服务器收到的raw body(原始数据) 转成这种类型：name=nowThen&age=18
                    config.data = Qs.stringify(config.data);
                }
            }
        }
        return Promise.resolve(config);
    },
    (error) => {
        Promise.reject(error)
    },
);

//响应拦截
instance.interceptors.response.use(
    (response) => {
        // 对响应数据做处理，以下根据实际数据结构改动！！...
        const { code } = response.data || {};
        if (code === 109 || code === 108) {
            // 请求超时，跳转登录页
            if (!inError) {
                message.warning('登录超时，即将跳转到登录页面...');
                inError = true;
                setTimeout(() => {
                    message.destroy();
                    window.location.href = '/login';
                    inError = false;
                }, 2000);
            }

            return Promise.resolve({});
        } else if (response) {
            return Promise.resolve(checkStatus(response));
        }
    },
    (error) => {
    // 对响应错误做处理...
        if (error.response) {
            return Promise.reject(checkStatus(error.response));
          } else if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            return Promise.reject({ msg: '请求超时' });
          } else {
            return Promise.reject({});
          }
    },
);

const request = async (opt) => {
    const options = {
      method: 'get',//默认get
      ifHandleError: true, // 是否统一处理接口失败(提示)
      ...opt,
    };
    // 匹配接口前缀 开发环境则通过proxy配置转发请求； 生产环境根据实际配置
    options.baseURL = BASE_URL;
    try {
      const res = await instance(options);//返回一个promise对象
      //请求成功时，res是完整的数据，可包括success，和data属性
      if (!res.success && options.ifHandleError) {
        // 自定义参数，是否允许全局提示错误信息
        //message.error(res.message || '请求处理失败！');
      }
      return res;
    } catch (err) {
      console.log("err:",err);
      if (options.ifHandleError) {
        // 自定义参数，是否允许全局提示错误信息
        message.error(err.message || err.msg || '请求处理失败！');
      }
      return err;
    }
  };
  
  export default request;