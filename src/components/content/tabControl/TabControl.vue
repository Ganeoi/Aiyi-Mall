<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         :key="index"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      titles: {
        tyle: Array,
        // 当自定义变量的类型为数组或者对象时，默认值必须写成函数形式
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index;
        // 把点击事件的index数据，传到外面（父组件中）去使用
        this.$emit('parentClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 6px;
  }

  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>