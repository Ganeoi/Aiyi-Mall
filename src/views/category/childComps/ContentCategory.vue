<template>
  <div id="content-category">
    <div class="category-item" v-for="(item, index) in subcategories.list" :key="index">
      <a class="info" href="#">
        <div class="images"><img :src="item.image" alt=""/></div>
        <div class="title">{{item.title}}</div>
      </a>
    </div>   
  </div>
</template>

<script>
  export default {
    name: 'ContentCategory',
    props: {
      subcategories: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  #content-category {
    display: flex;
    flex-wrap: wrap;
  }
  .category-item {
    /* 设置子项目根据盒子空间缩放，和一行只放3个子项目 */
    flex: 0 0 33.33%;
    text-align: center;
    margin: 10px 0;
    display: inline-block;
  }
  .info {
    display: inline-block;
  }
  .info .images {
    width: 50px;
    height: 50px;
    display: inline-block;
  }
  .images img {
    display: inline-block;
    width: 100%;
    height: 100%;
    /* margin: auto; */
  }
  .info .title {
    font-size: 12px;
    padding: 5px;
  }
</style>
