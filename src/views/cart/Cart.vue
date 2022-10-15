<template>
  <div class="cart">
    <!-- 顶部导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <scroll class="cart-scroll" ref="scroll">
      <cart-list></cart-list>
    </scroll>

    <!-- 底部导航栏 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import Scroll from 'components/common/scroll/Scroll'

  // 使用vuex中的mapGetters方法
  import { mapGetters } from 'vuex'
 
  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar,
      Scroll
    },
    computed: {
      // 使用vuex中的mapGetters方法
      ...mapGetters(['cartLength'])
    },
    activated() {
      // 在进入购物车页面时，刷新一次scroll.heigth 重新计算可滚动的区域
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .cart .cart-scroll {
    height: calc(100% - 44px - 49px - 36px);
    /* overflow: hidden; */
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
