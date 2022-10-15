import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

// 发送网络请求，获取商品推荐数据
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// ES6的语法定义一个类：Goods，用于整合请求过来的商品数据
export class Goods{
  // 使用构造器constructor，三个形参，用于接收网络请求传递过来的形参
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.desc = itemInfo.desc;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

// 整合店铺数据
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
    this.score = shopInfo.score;
    this.fans = shopInfo.Cfans;
  }
}

// 商品参数
export class GoodsParam {
  constructor(itemParams) {
    // 注意：images可能没有值（有些商品有，有些没有）
    this.images = itemParams.info.images ? itemParams.info.images[0]: '';
    this.infos = itemParams.info.set; // 参数
    this.sizes = itemParams.rule.tables; // 尺码
  }
}