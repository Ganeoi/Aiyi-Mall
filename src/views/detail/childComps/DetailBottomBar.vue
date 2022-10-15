<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addClick">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    methods: {
      addClick() {
        this.$emit('addCart')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 49px;
    background-color: #fff;

    display: flex;
    text-align: center;
    z-index: 99;
  }
  .bar-left {
    flex: 1;
    display: flex;
  }
  /* 子选择器 */
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 1px;
    /* 使用精灵图做背景图标 */
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service {
    /* 设置精灵图的坐标 */
    background-position: 0 -53px;
  }
  .bar-left .shop {
    background-position: 0 -98px;
  }
  .bar-right {
    flex: 1.2;
    font-size: 15px;
    color: #fff;
    line-height: 40px;
    display: flex;
    align-items: center;
  }
  .bar-right .cart {
    background-color: #eb989e;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
  .bar-right .buy {
    background-color: #ff5777;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
</style>