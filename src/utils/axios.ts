/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
 import axios from 'axios';
 import { ElMessage } from 'element-plus';
//  import {} from './replaceName'
 
 axios.defaults.timeout = 10000;
 axios.defaults.validateStatus = function (status) {
   return status >= 200 && status <= 500;
 };
 axios.interceptors.request.use(config => {
   return config
 }, error => {
   return Promise.reject(error)
 });
 axios.interceptors.response.use(res => {
   //获取状态码
   const resData = res.data;
   const status = resData.code || res.status;
   console.log(resData)
   let message = resData.msg || '网络异常';
   // 如果请求为非200否者默认统一处理
   if (status != 200) {
     ElMessage.error(message);
     return Promise.reject(new Error(message))
   }
   return res.data;
 }, error => {
   // * 处理网络超时
   let message = ''
   if (error.message.includes('Network Error')) {
     message = '网络异常'
     ElMessage.error(message);
   }
   return Promise.reject(new Error(message || error));
 });
 
 export default axios;
 