import {request} from './request'

// 请求左侧菜单导航栏数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

// 根据左侧菜单栏请求相应的商品数据
export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}


// 请求导航栏下的数据
export function getSubDetail(miniWallkey, type) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}
