<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick='itemClick' ref="navBar"/>
    <scroll class="detail-content" 
            ref="scroll" 
            @scroll="detailScroll" 
            :probe-type="3">
      <detail-swiper :top-images='topImages'/>
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shop'/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <div ref="recommend">
        <h3 class="titleRec">商品推荐</h3>
        <goods-list :goods="recommends"/>
      </div>
    </scroll>
    <detail-bottom-bar @addCart='addToCart'/>
    <back-top @click.native='topClick' v-show="isShowBackTop"/>
    <!-- <toast :message="message" :isShow="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  // import Toast from 'components/common/toast/Toast'


  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  // 网络请求相关
  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'

  // 导入混入
  import { imageLoadMixin, backTopMixin } from 'common/mixin'

  // 导入vuex中方法
  import { mapActions } from 'vuex'

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        offsetTopY:[],
        navBarIndex: 0,
      }
    },
    mixins: [imageLoadMixin, backTopMixin],
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      // Toast
    },
    created() {

      // 1.获取iid (通过$route.params 获取路由中的iid数据)
      this.iid = this.$route.params.iid;

      // 2.根据iid 发送网络请求详情的数据，并进行保存
      getDetail(this.iid).then(res => {
        const data = res.data.result
        // 2.1.获取顶部的轮播图数据
        this.topImages = data.itemInfo.topImages

        // 2.2.调用Goods类，取出请求过来的商品信息，并存储到goods中
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      
        // 2.3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 2.4.获取商品详情信息
        this.detailInfo = data.detailInfo

        // 2.5 取出商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams);

        // 2.6.获取评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }

        /*// 第一次获取offsetTop，值不对
        // 值不对的原因：this.$refs.param.$el 这几个DOM 都还没有渲染出来
        this.offsetTopY.push(0)
        this.offsetTopY.push(this.$refs.param.$el.offsetTop)
        this.offsetTopY.push(this.$refs.comment.$el.offsetTop)
        this.offsetTopY.push(this.$refs.recommend.offsetTop)
        console.log(this.offsetTopY)

        // 第二次获取，值不对
        // 值不对的原因：没有全部加载完图片
        this.$nextTick(()=> { // 当DOM全部渲染完成时，会去回调nextTick里面的代码
          // 根据最新的数据，对应的DOM 是已经被渲染出来
          // 但是图片依然是没有加载完（获取到的offsetTop不包含全部的图片）
          // offsetTop值不对的时候，一般都是因为图片的问题
          this.offsetTopY.push(0)
          this.offsetTopY.push(this.$refs.param.$el.offsetTop)
          this.offsetTopY.push(this.$refs.comment.$el.offsetTop)
          this.offsetTopY.push(this.$refs.recommend.offsetTop)
          console.log(this.offsetTopY)
        }) */

      }),
      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.data.list;
        // 使用在首页中展示商品的 goods组件，对recommends数据进行展示
      })
    },
    mounted() {
      // 把不同组件间，相同的代码进行抽取，进行 mixin混入
      // 监听推荐中图片的加载，进行刷新
      /*const newRefresh = debounce(this.$refs.scroll.refresh, 100)
      this.itemImgListener = () => {
        newRefresh()
      }
      this.$bus.$on('itemImgLoad', this.itemImgListener) */
    },
    updated() { // updated生命周期函数
      // 获取 offsetTop，注意需要在相应组件中的图片全部加载完，才能获取到准确的
      // this.offsetTopY = []

      // this.offsetTopY.push(0)
      // this.offsetTopY.push(this.$refs.param.$el.offsetTop)
      // this.offsetTopY.push(this.$refs.comment.$el.offsetTop)
      // this.offsetTopY.push(this.$refs.recommend.offsetTop)
      // console.log(this.offsetTopY)
    },
    // 取消全局事件的监听
    // detail组件没有使用keep-alive，所以监听退出页面时需要使用destroyed
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions(['addProduct']),
      imageLoad() { //监听图片加载，进行刷新
        this.$refs.scroll.refresh();

        // 第三次获取offsetTop：在加载完全部图片后，获取offsetTop
        this.offsetTopY = []
        this.offsetTopY.push(0)
        this.offsetTopY.push(this.$refs.param.$el.offsetTop)
        this.offsetTopY.push(this.$refs.comment.$el.offsetTop)
        this.offsetTopY.push(this.$refs.recommend.offsetTop)
        this.offsetTopY.push(Number.MAX_VALUE)
        // console.log(this.offsetTopY)
      },
      // TabBar 的联动效果
      // 1.点击TabBar滚动到对应的位置
      itemClick(index) {
        let y = -this.offsetTopY[index] + 44; // 减去TabBar的44px
        this.$refs.scroll.scrollTo(0, y, 500)
      },
      // 2.监听scroll滚动，TabBar显示对应的index
      detailScroll(position) {
        // console.log(position)
        // 1.获取y值
        const positionY = -position.y + 44;

        // 2.positionY 与 TabBar中主题的 offsetTop值进行判断
        // 当 positionY 大于/等于offsetTop[0]，小于offsetTop[1]时，index = 0 显示商品 
        // 当 positionY 在offsetTop[1] 和 offsetTop[2] 之间时，index = 1 显示参数 
        // 当 positionY 在offsetTop[2] 和 offsetTop[3] 之间时，index = 2 显示评论 
        // 当 positionY 大于offsetTop[3] 时， index = 3 显示推荐 
        // for(let i in this.offsetTopY) { // 注意：这里拿到的 i 是一个字符串类型的
          // if(position >= this.offsetTopY[i] && position < this.offsetTopY[i+1]){
            // console.log(i)        
        //   }

        let length = this.offsetTopY.length

        // 为防止频繁调用可以 可以先对navBarIndex进行判断
        // 第一种方法，分情况判断positionY
        // for(let i = 0; i < length; i ++) { // 两种满足条件的情况 ; 
          // if(this.navBarIndex !== i && ((i < length-1 && positionY >= this.offsetTopY[i] && positionY < this.offsetTopY[i+1]) || (i === length-1 && positionY > this.offsetTopY[i]))) {
          //   this.navBarIndex = i;
          //   this.$refs.navBar.currentIndex = i
          // }
        // }

        // 第二种方法，在offsetTopY数组中添加一个Number的最大值 Number.MAX_VALUE
        for(let i = 0; i < length -1; i++) {
          if(this.navBarIndex !== i && positionY >= this.offsetTopY[i] && positionY < this.offsetTopY[i+1]) {
            this.navBarIndex = i;
            this.$refs.navBar.currentIndex = this.navBarIndex
          }
        }

        // 是否显示回到顶部按钮
        this.isShowBackTop = -position.y > 1000;
      },
      // 3.点击添加商品到购物车
      addToCart() {
        // 3.1，获取购物车需要展示添加商品的信息
        // 1.创建对象
        const product = {}
        // 2.添加对象信息
        product.iid = this.iid;
        product.images = this.topImages[0]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;

        // 3.2. 将商品信息添加到stroe中处理并管理
        // this.$store.cartList.push(product) // 注意：最好不要在其他的组件中修改store中的数据，而是在store中的mutation中进行修改
        // this.$store.commit('addProduct', product) // commit调用vuex的mutations函数，但是最好使用dispatch调用actions中的函数

        // this.$store.dispatch('addProduct', product).then(res => {
        //   console.log(res)
        // })

        // 通过vuex中的 mapActions映射关系，使用vuex中action.js中的方法，效果同上
        this.addProduct(product).then(res => {
        //   // 显示弹窗
        //   this.isShow = true,
        //   this.message = res

        //   // 使用计时器,控制弹窗显示的时间
        //   setTimeout(() => {
        //     this.isShow= false,
        //     this.message = ''
        //   }, 1500)

        // 直接调用封装的Toast组件实现弹窗的显示隐藏
          console.log(this.$toast);
          this.$toast.showToast(res, 1500)

        })

        // 3.3. 成功添加商品后，显示弹窗效果(上面的then回调函数中实现)
        // 但是需要判断是否有成功完成了添加到购物车中的操作，而$store.dispatch 会返回一个promise，所以可以在action中进行添加商品处理程序后，通过promise的then回调决定是否显示弹窗，
      }
    }
  }
</script>

<style scoped>
  #detail {
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 999;
    background-color: #fff;
  }
  .detail-content {
    height: calc(100% - 44px - 49px);
  }
  .titleRec {
    padding: 10px;
    font-size: 16px;
  }
</style>