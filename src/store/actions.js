export default {
  // 添加商品到购物车
  addProduct(context, payload) {
    return new Promise((resolve, reject) => { //使用promise的resolve回调，决定弹窗显示的内容
      // 判断当前添加的商品，在购物车中是否已经存在
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      if(oldProduct) { // 商品数量+1
        // oldProduct.count += 1; // 把actions中修改数据的方法抽到mutations中进行处理
        context.commit('addCounter', oldProduct)
        resolve('商品数量+1')
      } else { // 添加新商品
        payload.count = 1;
        // context.state.cartList.push(payload) // 抽取到mutations
        context.commit('addToCart', payload)
        resolve('添加了新商品')
      }
    })
  },
  // 全选按钮的实现
  selectAll(context, payload) {
    // 判断：可以直接根据上面的 isSelectAll 进行判断
    // 如果全部商品被选中，点击一次，则全部状态改变为不被选中
    // 如果全部/有一个不被选中，点击一次，则全部状态改变为被选中
    // 使用forEach，全部符合时成立
    if(payload) { // 在全部选中的情况
      // context.state.cartList.forEach(item => item.selected = false) //抽取到mutation中
      context.commit('isSelectAll')
    } else { // 有不被选中的情况
      // context.state.cartList.forEach(item => item.selected = true)
      context.commit('notSelectAll')
    }
  },
  // 增加商品数量
  addCount(context, payload) {
    context.state.cartList.count ++
    console.log('数量+1')
  }
}