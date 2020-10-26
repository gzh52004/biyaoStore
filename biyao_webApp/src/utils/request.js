//封装axios
import axios from 'axios';//npm i axios下载模块

const request = axios.create({
    // 根据不同环境设置 baseURL, 最终发送请求时的URL为: baseURL + 发送请求时写URL ,
    // 比如 get('/test'), 最终发送请求是: /dev-api/test
    baseURL: process.env.NODE_ENV === "development" ? "/dev-api" : "http://47.112.170.225:60001",
    // process.env.NODE_ENV === "development";// 目前是开发环境：development，打包之后就会是production 
    timeout: 5000, // 请求超时
});

export default request;