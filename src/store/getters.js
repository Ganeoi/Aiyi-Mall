export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  }
}

// 通过mapGetters/mapActions 去修改store中的变量/使用其中的方法
// 1.导入 import { mapGetters } from 'vuex'
// 2.使用：
// computed: { 
//   ...mapGetters(['cartLength','cartList']) 
// }
