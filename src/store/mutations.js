export default {
  addCounter(state, payload) {
    payload.count += 1;
  },
  addToCart(state, payload) {
    // 当添加新商品到购物车中，默认选中该商品
    payload.selected = true
    state.cartList.push(payload)
  },
  isSelectAll(state) {
    state.cartList.forEach(item => item.selected = false)
  },
  notSelectAll(state) {
    state.cartList.forEach(item => item.selected = true)
  }
}