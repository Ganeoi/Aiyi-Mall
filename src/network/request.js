import axios from 'axios'

// 对axios请求进行封装
export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878', //需要后台数据接口可以联系我或者coderwhy老师
    timeout: 5000 //  请求超时时间
  })

  // 2.axios的拦截器
  // 2.1.请求拦截
  // instance.interceptors.request.use(config => {
  //   return config
  // }, err => {
  //   // 拦截失败的回调
  // })

  // // 2.2.响应拦截
  // instance.interceptors.response.use(res => {
  //   return res.data
  // }, err => {
  //   console.log(err);
  // })

  // 3.发送真正的网络请求
  return instance(config)
}
