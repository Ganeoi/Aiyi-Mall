<template>
  <div class="goods">
    <!-- 根据请求的goods 的数据个数，来决定展示多少个GoodsListItem -->
    <!-- 把遍历出来的内部 item 动态传入到 组件GoodsListItem中的 goods-item上 -->
    <goods-list-item v-for="(item, index) in goods" :goods-item="item" :key="index"/>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem';

  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /* 通过flex布局，设置flex-wrap：wrap 并且给子元素设置宽度，可以决定一行展示的子元素个数 */
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>