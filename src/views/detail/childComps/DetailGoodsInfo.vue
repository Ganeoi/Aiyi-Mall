<template>
  <div v-if="Object.keys(detailInfo).length !== 0" id="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list" v-for="(item, index) in detailInfo.detailImage[0].list" :key="index">
      <img :src="item" alt="" @load="imgLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      imgLoad() { //监听图片的加载，判断：当图片全部加载完后，去调用refresh刷新一次scroll，减少回调次数 ,也可以使用 debounce防抖函数
        // this.counter += 1
        if(++this.counter === this.imagesLength) {
          this.$emit('imageLoad')
        }
      }
    },
    watch: { //watch 用于监听属性的改变
      detailInfo() { // 当detailInfo属性发生改变时，就获取list中图片的总数进行赋值
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>
  #goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }
  .info-desc .start {
    float: left;
  }
  .info-desc .end {
    float: right;
  }
  /* 使用伪元素，创建小黑块,注意使用伪元素时一定要写content:'' */
  .info-desc .start::before, .info-desc .end::after {
    content: "";
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
  }
  .info-desc .end::after {
    right: 0;
    bottom: 0;
  }
  .info-desc .desc{
    font-size: 14px;
    padding: 15px 0;
  }
  .info-key {
    margin: 10px 0 10px 15px;
  }
  .info-list img {
    width: 100%;
  }
</style>