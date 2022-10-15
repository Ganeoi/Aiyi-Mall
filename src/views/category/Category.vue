<template>
  <div id="category" class="wrapper">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="category-content">
      <!-- 左侧菜单栏 -->
      <!-- 注意：监听组件传过来的事件如果是驼峰的也不需要改成横杆，否则不生效；如果是数据则需要该横杆 -->
      <tab-menu class="tab-menu" :category="menu" @tabMenuClick="menuClick"/>
      <scroll class="category-scroll" 
              ref="scroll" 
              :probe-type="3"
              @scroll="contentScroll">
        <!-- 右上部分：商品展示 -->
        <content-category :subcategories="showSubcategory"></content-category>
        <!-- 右下部分：分类导航栏和商品展示 -->
        <tab-content-detail :category-detail="showSubDetail" ref="tab-content"></tab-content-detail>
      </scroll>
      <back-top @click.native="topClick" v-show="isShowBackTop"/>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabMenu from './childComps/TabMenu'
  import ContentCategory from './childComps/ContentCategory'
  import TabContentDetail from './childComps/TabContentDetail'

  import Scroll from 'components/common/scroll/Scroll'

  // 导入混入
  import { imageLoadMixin, backTopMixin } from 'common/mixin'

  import { getCategory, getSubCategory, getSubDetail} from 'network/category'
  export default {
    name: "Category",
    data() {
      return {
        menu: [],
        categoryData: {},
        currentIndex: -1,
        currentType: 'pop'
      }
    },
    mixins: [ imageLoadMixin, backTopMixin ],
    components: {
      NavBar,
      TabMenu,
      Scroll,
      ContentCategory,
      TabContentDetail
    },
    computed: {
      // 对右上展示商品信息进行判断
      showSubcategory() {
        if(this.currentIndex === -1) return {}
        return this.categoryData[this.currentIndex].subcategories.data
      },
      // 对右下部门展示信息进行判断
      showSubDetail() {
        if(this.currentIndex === -1) return []
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType].data
      }
    },
    created() {
      /**
       * 发送网络请求
      */
      this._getCategory()
    },
    methods: {
      _getCategory() {
        getCategory().then(res => {
          // console.log(res);
          // 1.获取菜单导航栏分类信息
          this.menu = res.data.data.category.list;

          // 2，初始化导航栏每一个类别的子数据（在数组中添加两个对象）—— 分类页面右侧展示的内容
          for(let i = 0; i < this.menu.length; i ++) {
            this.categoryData[i] = { // 一个categoryData对应一个menu中的元素
              subcategories: {}, // 上部分小图片的商品信息
              categoryDetail: {  // 下部分导航条的信息
                'pop': [],
                'new': [],
                'sell': []
              }
            }
          }

          // 3.请求第一个分类的数据
          this._getSubCategory(0)
        })
      },
      _getSubCategory(index) {
        // 3.获取tabBar组件的tabmenu-click 事件传进来的index，取出maitKey
        this.currentIndex = index;
        const maitKey = this.menu[index].maitKey;

        // 4.根据maitKey获取subCategory 的数据
        getSubCategory(maitKey).then(res => {
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}

          this._getSubDetail('pop')
          this._getSubDetail('new')
          this._getSubDetail('sell')
        })
        this.$refs.scroll.refresh()
      },
      _getSubDetail(type) {
        // 1.获取请求的miniWallKey
        const miniWallkey = this.menu[this.currentIndex].miniWallkey;

        // 2.传入miniWallKey和type 发送网络请求
        getSubDetail(miniWallkey, type).then(res => {
          

          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res
          this.categoryData = {...this.categoryData}
          this.currentType = type
        })
      },
      // 点击左侧菜单栏事件
      menuClick(index) {
        this._getSubCategory(index)
      },
      // 点击右下tabControl栏事件

      // 显示一键回到顶部按钮
      contentScroll(position) {
        this.isShowBackTop = -position.y > 1000
      }
    }
  }

</script>

<style scoped>
  #category {
    height: 100vh;
    position: relative;
    top: 0;
  }
  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .category-content {
    display: flex;
  }
  .tab-menu {
    width: 100px;
  }
  .category-scroll {
    flex: 1;
    position: absolute;
    top: 44px;
    left: 100px;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
</style>