<template>
  <div id="tab-content-detail">
    <tab-control :titles="['综合', '新品', '销量']" 
                 @parentClick="tabDetailClick"/>
    <goods-list :goods="categoryDetail"></goods-list>
  </div>
</template>

<script>
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  
  export default {
    name: 'TabContentDetail',
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      TabControl,
      GoodsList
    },
    methods: {
      tabDetailClick(index) {
        console.log(this.categoryDetail);
      }
    }
  }
</script>
