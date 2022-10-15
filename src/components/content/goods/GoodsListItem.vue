<template>
  <div class="goods-item" @click="goodItemClick">
    <!-- <img :src="showImage" alt="" @load="imageLoad"> -->
    <!-- Vue中使用 @load监听图片的加载 -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        // 分情况，对首页(goodsItem.show.img)和推荐页(goodsItem.image) 和分类页(goodsItem.img)中的商品图片进行展示
        return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() { 
        // 监听scroll中图片的加载，进行刷新
        // 方法一：当离开首页/详情页时，取消全局监听$bus.$off()，当进入首页/详情页时开启监听
        this.$bus.$emit('itemImgLoad')

        //方法二：通过路由判断：对首页或者详情页进行 refresh刷新
        // if(this.$route.path === '/home') {
        //   this.$bus.$emit('homeImageLoad')          
        // } else if(this.$route.path === '/detail') {
        //   this.$bus.$emit('detailImageLoad')
        // }
      },
      goodItemClick() {
        // 监听点击，进行路由跳转
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    position: relative;
    width: 48%;
    padding-bottom: 40px;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1xp;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>