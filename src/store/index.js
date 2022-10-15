import Vue from "vue";
import Vuex from "vuex";

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装vuex插件
Vue.use(Vuex)

// 2.创建一个store对象
const store = new Vuex.Store({
  state: {
    // 创建数组，用于存储添加到购物车中的商品
    // 公共的数据，所有的组件中都可以直接使用
    cartList: []
  },
  mutations,
  actions,
  getters
  // mutations: {
  //   // mutations 唯一的目的就是修改state中的状态
  //   // mutations 中的每一个方法完成的事情尽可能的比较单一一点，这样方便状态的变化跟踪
  //   // mutations 中的数据变化可以进行跟踪，方便后续的排错和调试

  //   // 把处理了两件事请的addProduct函数，放在action中去会更加合适
  //   // addProduct(state, payload) {
  //   //   // 这里payload是新传进来的商品
  //   //   // 这里除了使用for循环判断是否存在某个值，也可以使用indexOf等其他数组方法

  //   //   // 1.先根据商品唯一的iid 判断新添加的商品在cartList中是否已经存在
  //   //   // 使用for循环进行判断
  //   //   // let oldProduct = null; // 用于记录 新传入的payload是否存储
  //   //   // for(let item of state.cartList) {
  //   //   //   if(item.iid === payload.iid) { // 先判断：新传入的payload是否已经存在
  //   //   //     oldProduct = item; // 如果已经存在，记录该 item
  //   //   //   }
  //   //   // }

  //   //   // 使用find函数，查找元素 进行判断
  //   //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  //   //   // 2.判断oldProduct
  //   //   if(oldProduct) {
  //   //     oldProduct.count += 1;
  //   //   } else { // 如果oldproduce没有值，即新传入的payload 不存在cartList数组中，那么就把payload添加到数组中
  //   //     payload.count = 1;
  //   //     state.cartList.push(payload)
  //   //   }
  //   // }
  //   /*-----------------------------------------*/

  //   // 把mutations中的函数/方法，全部抽取到mutations.js 文件中
  //   /*addCounter(state, payload) {
  //     payload.count += 1
  //   },
  //   addToCart(state, payload) {
  //     state.cartList.push(payload)
  //   }*/
  // },
  // 

  // 把actions中的函数/方法，全部抽取到actions.js 文件中
  // actions: { //actions中修改的数据变化不能进行跟踪
  //   // addProduct(context, payload) {
  //   //   let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

  //   //   if(oldProduct) {
  //   //     // oldProduct.count += 1; // 把actions中修改数据的方法抽到mutations中处理
  //   //     context.commit('addCounter', oldProduct)
  //   //   } else {
  //   //     payload.count = 1;
  //   //     // context.state.cartList.push(payload) // 抽取到mutations
  //   //     context.commit('addToCart', payload)
  //   //   }
  //   // }
  // }
})

// 3.挂载在Vue实例上（main.js文件中）
export default store