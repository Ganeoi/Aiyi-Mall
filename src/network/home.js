import {request} from './request';

// 对首页中所有的网络请求再进行一层封装

// 请求轮播图和推荐的数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 请求商品数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    // 传入发送网络请求时 baseURL后面携带的数据
    params: {
      type,
      page
    }
  })
}
