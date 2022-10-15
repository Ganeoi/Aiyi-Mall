<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                  @parentClick='handleTabClick'
                  ref='tabControl2'
                  v-show="isTabFixed"
                  class="tab-control"/>
    
    <!-- 使用滑动组件scroll -->
    <!-- 给组件设置ref，在其他地方获取到该组件和组件内的data数据 -->
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">

      <!-- 轮播图 -->
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"/>
      <!-- 推荐 -->
      <recommend-view :recommends='recommends'/>
      <!-- 本周流行-->
      <feature-view/>
      <!-- 控制栏 -->
      <tab-control :titles="['流行', '新款', '精选']"
                  @parentClick='handleTabClick'
                  ref='tabControl1'/>
      <!-- 商品列表 -->
      <!-- <goods-list :goods='goods[this.currentType].list'/> -->
      <goods-list :goods='showGoods'/>
    </scroll>

    <!-- 一键返回顶部 -->
    <!--使用 .native 才能监听组件事件 -->
    <back-top @click.native='topClick' v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 导入子组件
import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

// 导入公共组件
import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from  'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll'

// 网络请求
import { getHomeMultidata, getHomeGoods } from 'network/home';

// 防抖函数
import {debounce} from 'common/utils'

// 使用混入Mixin
import {imageLoadMixin, backTopMixin} from 'common/mixin'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    debounce
  },
  data() {
    return {
      banners: [],
      recommends: [],
      // 存储请求的商品数据
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      offsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  mixins: [imageLoadMixin, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this._getHomeMultidata()

    // 2.请求商品数据
    this._getHomeGoods('pop')
    this._getHomeGoods('new')
    this._getHomeGoods('sell')
    
    // 注意：在create中去拿dom或其他数据，可能会拿不到，可能会是null或undefined，因为使用回到函数，数据可能还没有请求/请求回来
  },
  mounted() {
    // 这个地方img标签确实被挂载，但是其中的图片还没有占据高度

    // 1.监听轮播图的加载，调用refresh 刷新scroll 重新计算可滚动高度，防止出现滚动浏览图片时的卡顿问题
    // 调用 debounce防抖动函数
    // const newRefresh = debounce(this.$refs.scroll.refresh, 100)

    // // 对监听事件进行保存
    // this.itemImgListener = () => {
    //   newRefresh()
    // }
    // this.$bus.$on('itemImgLoad', this.itemImgListener)
  },
    // 当从当前页面切换到其他页面时，记录当前页面的位置
  deactivated() {
    // 1.保存 Y 值
    this.saveY = this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听 (注意第二个参数 是需要取消的函数)
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  // 当回到原来浏览过的页面时，把页面设置到原来记录的位置
  // 注意：最好先做刷新，再设置回到原来的高度位置，并且时间不要为零，否则可能会失效
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 2)
  },
  methods: {
    /**
     * 事件监听相关函数
     */
    handleTabClick(index) {
      // 使用 switch语句 切换显示内容
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell'
          break
      }
      // 保持 tabControl1 和tabControl2 的显示的内容永远一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 已经抽取到混入中
    // topClick() {
    //   // 可以传入第三个参数，设置回到顶部的时间
    //   this.$refs.scroll.scrollTo(0, 0)
    // },
    contentScroll(position) {
      // 1.判断backTop 是否显示(一键返回按钮)
      // 这里不太懂，是使用三目运算符吗？
      // 通过老师总结那节课懂了：判断 (-position.y) > 1000，如果成立，侧是true 并把true赋值给isShowBackTop；如果不成立则反之
      this.isShowBackTop = (-position.y) > 1000

      // 判断tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.offsetTop
    },
    loadMore() { // 上拉加载更多，再次发送网络请求
      this._getHomeGoods(this.currentType)
    },
    // 获取tabControl2的offsetTop 
    // 所有的组件都有一个属性 $el：用于获取组件中的元素
    swiperImageLoad() {
      this.offsetTop = this.$refs.tabControl1.$el.offsetTop
    },

    /**
     * 网络请求相关函数
     */
    _getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    },
    _getHomeGoods(type) {
      // 1.获取页码
      const page = this.goods[type].page + 1;

      // 2.请求相关的分类商品(注意  Promise.then是异步请求)
      getHomeGoods(type, page).then(res => {
        // 把请求过来的数据(局部数据)存储到goods中
        // 使用解构赋值的方法，添加到list数组中
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1

        // 在一次上拉加载，网络请求完成后 结束这一次上拉加载，才能继续下一次上拉加载更多
        this.$refs.scroll.finishPullUp()

        // this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    position: relative;
    /* padding-top: 44px; */
    /* vh:设置视口的宽高单位 */
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    color:#99ecfd

    /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;  */
  }

    /* 使用滚动组件时需要设置高度，
    方案一：使用定位设置高度 */
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  /* 方案二：使用calc计算 */
  /* .content {
    height: calc(100% - 93px); /*100%是相对于父盒子
    overflow: hidden;
  } */

  /* 控制栏设置吸顶效果 */
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>