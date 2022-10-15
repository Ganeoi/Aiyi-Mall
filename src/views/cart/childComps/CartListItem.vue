<template>
  <div class="list-item">
    <div class="item-selector">
      <!-- 选择商品按钮组件 -->
      <select-button :is-select='product.selected' @click.native='clickSelect'/>
    </div>
    <div class="item-img">
      <img :src="product.images" alt="">  
    </div>
    <div class="item-info">
      <div class="title">
        {{product.title}}
      </div>
      <div class="desc">商品描述：{{product.desc}}</div>
      <div class="info-bottom">
        <div class="price">￥{{product.price}}</div>
        <div class="number">
          <button class="addBtn" @click="addClick">+</button>
          <div class="count">x{{product.count}}</div>
          <button class="redBtn" @click="redClick">-</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SelectButton from './SelectButton'

  import { mapActions } from 'vuex'
 
  export default {
    name: 'CartListItem',
    props: {
      product: { //传入状态管理 store中的cartList
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      SelectButton
    },
    methods: {
      ...mapActions(['addCount']),
      clickSelect() { // 改变 store/state 中selected是否选中的状态
        this.product.selected = !this.product.selected;
      },
      addClick() { // 增加商品数量
        this.addCount(this.product.count)
      },
      redClick() { // 减少商品

      }
    }
  }
</script>

<style scoped>
  .list-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }
  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img {
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    overflow: hidden;
  }
  .title, .desc {
    overflow: hidden;
    /* 设置文字是否换行 */
    white-space: nowrap;
    /* 设置超出文本显示为省略号 */
    text-overflow: ellipsis;
    font-size: 17px;
    color: #666;
    margin-top: 12px;
  }
  .desc {
    color: #999;
    font-size: 14px;
  }
  .info-bottom {
    display: flex;
    padding-top: 15px;
    position: relative;
    top: 0;
  }
  .price {
    color: red;
  }
  .number {
    display: flex;
    align-items: center;
    position: absolute;
    right: 0px;
  }
  .count{
    padding: 5px;
  }
  .number button {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>